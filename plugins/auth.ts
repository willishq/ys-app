import { useCurrentProvider } from '~/composables/provider'

export default defineNuxtPlugin(async () => {
  const user = useUser()
  if (user.value === undefined) {
    user.value = await fetchCurrentUser()
    await useCurrentProvider()
  }
})
