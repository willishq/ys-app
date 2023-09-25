import { $fetch, FetchError, FetchOptions } from 'ofetch'
import { useRequestHeaders } from '#app/composables/ssr'

const CSRF_COOKIE = 'XSRF-TOKEN'
const CSRF_HEADER = 'X-XSRF-TOKEN'

interface ResponseMap {
    blob: Blob,
    text: string,
    arrayBuffer: ArrayBuffer,
}

type ResponseType = keyof ResponseMap | 'json';

export type ApiFetchOptions<R extends ResponseType> = FetchOptions<R> & {
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete',
    headers?: Record<string, string>,
    redirectIfNotAuthenticated?: boolean;
    redirectIfNotVerified?: boolean;
}

export async function $apiFetch<T, R extends ResponseType = 'json'> (
  path: RequestInfo, {
    redirectIfNotAuthenticated = true,
    redirectIfNotVerified = true,
    ...options
  }: ApiFetchOptions<R> = {}) {
  const { backendUrl, frontendUrl } = useRuntimeConfig().public
  const router = useRouter()
  let token = useCookie(CSRF_COOKIE).value

  if (process.client && ['post', 'delete', 'put', 'patch'].includes(options?.method?.toLowerCase() ?? '')) {
    await initCSRF(backendUrl)
    token = getCookie(CSRF_COOKIE)
  }

  try {
    return (await $fetch<T, R>(path, {
      baseURL: backendUrl,
      ...options,
      ...getHeaders(options, token, frontendUrl),
      credentials: 'include'
    }))
  } catch (error) {
    if (!(error instanceof FetchError)) {
      throw error
    }

    const status = error.response?.status ?? -1

    if (redirectIfNotAuthenticated && [401, 419].includes(status)) {
      await router.push('/login')
    }

    if (redirectIfNotVerified && [409].includes(status)) {
      await router.push('/verify-email')
    }

    if (status >= 500) {
      // eslint-disable-next-line no-console
      console.error('[API Server Error]', error.data?.message, error.data)
    }

    if (status >= 400) {
      // eslint-disable-next-line no-console
      console.error('[API User Error]', error.data?.message, error.data)
    }

    throw error
  }
}

const initCSRF = (baseURL:string, credentials: RequestCredentials = 'include') => $fetch('/sanctum/csrf-cookie', {
  baseURL, credentials
})

const cookieRegex = (n: string): RegExp => new RegExp(`(^|;\\s*)(${n})=([^;]*)`)
const getCookie = (name: string): string | null => {
  const match: RegExpMatchArray|null = document.cookie.match(cookieRegex(name))
  return match ? decodeURIComponent(match[3]) : null
}

const getHeaders = (options: ApiFetchOptions<'json'>, token: string, referer: string): Record<string, any> => {
  const headers = {
    accept: 'application/json',
    ...options?.headers,
    ...(token && { [CSRF_HEADER]: token })
  }

  return process.server
    ? {
        ...headers,
        ...useRequestHeaders(['cookie']),
        referer
      }
    : headers
}

export const $apiGet = <T>(path: RequestInfo, query?: Record<string, any>, options?: ApiFetchOptions<'json'>) => $apiFetch<T>(
  path,
  {
    method: 'get',
    query,
    ...options
  }
)

export const $apiPost = <R, T>(path: RequestInfo, body?: R, options?: ApiFetchOptions<'json'>) => $apiFetch<T>(
  path,
  {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' },
    ...options
  }
)

export const $apiPut = <R, T>(path: RequestInfo, body?: R, options?: ApiFetchOptions<'json'>) => $apiFetch<T>(
  path,
  {
    method: 'put',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' },
    ...options
  }
)

export const $apiDelete = <T>(path: RequestInfo, options?: ApiFetchOptions<'json'>) => $apiFetch<T>(
  path,
  {
    method: 'delete',
    ...options
  }
)

const $api = (path: RequestInfo) => ({
  get: <T>(query?: Record<string, any>, options?: ApiFetchOptions<'json'>) => $apiGet<T>(path, query, options),
  post: <R, T>(body?: R, options?: ApiFetchOptions<'json'>) => $apiPost<R, T>(path, body, options),
  put: <R, T>(body?: R, options?: ApiFetchOptions<'json'>) => $apiPut<R, T>(path, body, options),
  delete: <T>(options?: ApiFetchOptions<'json'>) => $apiDelete<T>(path, options)
})

export default $api
