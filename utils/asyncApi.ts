const implode = (params: Array<string>) => params.filter(v => v.length).join('.')

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
