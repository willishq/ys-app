const implode = (params: Array<string>) => params.filter(v => v?.length).join('.')

const getKey = (prefix: string, params: Array<string>) => `${prefix}.${implode(params)}`

export const getDirectoryPanel = async (page: string, category: string, { filter = '', locality = '' }) => (
  await useAsyncData<DirectoryItem[]>(
    getKey('directory', [category, page, filter, locality]),
    async () => (
      await $apiGet<{data: DirectoryItem[]}>(`directory/${category}/${page}`, { filter, locality })
    ).data
  )
).data

export const getOrganisation = async (slug: string) => (
  await useAsyncData<Provider>(
    getKey('provider', [slug]),
    async () => (
      await $apiGet<{data: Provider}>(`providers/${slug}`)
    ).data
  )
).data

export const getProviderPost = async (provider: string, slug: string) => (
  await useAsyncData<Post>(getKey('provider.post', [provider, slug]), async () => (
    await $apiGet<{data: Post}>(`providers/${provider}/posts/${slug}`)
  ).data)
).data

export const getProviderRelatedPosts = async (provider: string, post: string) => (
  await useAsyncData<Post>(getKey('provider.posts.related', [provider, post]), async () => (
    await $apiGet<{data: Post}>(`providers/${provider}/posts/${post}/related`)
  ).data)
).data
export const getPostCategoriesRelatedPosts = async (post: string) => (
  await useAsyncData<Post>(getKey('post.posts.related', [post]), async () => (
    await $apiGet<{data: Post}>(`posts/${post}/related`)
  ).data)
).data
