import $api from './apiFetch'
import { useForm, FormData } from '~/utils/form'

export interface Moderator {
    id: string;
    provider: Provider;
    access_level: number;
}

export interface User {
    id: string;
    name: string;
    email?: string;
    moderators?: Moderator[];
}

export interface LoginCredentials extends FormData {
    email: string;
    password: string;
}

export interface RegisterCredentials extends FormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface ResetPasswordCredentials extends FormData {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
}

export const useUser = () => useState<User | undefined | null>('user', () => undefined)

export const useAuth = () => {
  const router = useRouter()
  const user = useUser()
  const isLoggedIn = computed(() => !!user.value)

  async function refresh () {
    try {
      user.value = await fetchCurrentUser()
    } catch {
      user.value = null
    }
  }

  function register (credentials: RegisterCredentials) {
    return useForm<RegisterCredentials>(credentials, '/auth/register', refresh)
  }

  function login (credentials: LoginCredentials) {
    return useForm<LoginCredentials>(credentials, '/auth/login', refresh)
  }

  async function logout () {
    await $api('/auth/logout').post()
    user.value = null
    await router.push('/providers/sign-in')
  }

  function forgotPassword (email: string) {
    return useForm<{ email: string }>({ email }, '/auth/forgot-password')
  }

  function resetPassword (credentials: ResetPasswordCredentials) {
    return useForm<ResetPasswordCredentials>(credentials, '/auth/reset-password')
  }

  function resendVerificationEmail () {
    return $api('/auth/email/verification-notification').post()
  }

  return {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    resendVerificationEmail,
    user,
    isLoggedIn,
    refresh
  }
}

export async function fetchCurrentUser () {
  try {
    const response = await $api('user').get<User>({}, {
      redirectIfNotAuthenticated: false
    })
    return response.data
  } catch {
  }
}
