import { useUser } from '~/utils/auth'
export const useCurrentProvider = () => new Promise((resolve) => {
  const currentProviderCookie = useCookie<string | null>('currentProvider')
  const user = useUser()
  const userProviders = computed(() => user.value?.moderators?.map(moderator => moderator.provider) ?? [])

  const currentProvider = computed(() => userProviders.value.find(provider => provider.id === currentProviderCookie.value) ?? null)

  const setCurrent = (id: string) => {
    const p = userProviders.value.find(provider => provider.id === id)
    if (p) {
      currentProviderCookie.value = p.id
    }
  }

  let resolved = false
  const handleResolve = () => {
    if (user.value && currentProvider.value && !resolved) {
      resolved = true
      resolve({ currentProvider, setCurrent, userProviders })
    }
  }

  handleResolve()
  watch(user, handleResolve)
})
