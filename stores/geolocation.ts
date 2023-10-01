import { defineStore, StoreDefinition } from 'pinia'
import { shallowRef } from 'vue'
import $api from '~/utils/apiFetch'

interface StoreState {
    localities: Locality[];
}

export const useGeolocationStore: StoreDefinition<
    string,
    StoreState
> = defineStore('geolocation', () => {
  const localities = shallowRef<Locality[]>([])
  const currentLocalityCookie = useCookie('locality')

  const find = (slug: string): Locality | null => {
    return localities.value.find(locality => locality.slug === slug) ?? null
  }

  const current = shallowRef<Locality | null>(null)
  const sorter = (a: Locality, b: Locality): number => {
    if (a.name === b.name) { return 0 }
    return a.name < b.name ? -1 : 1
  }

  const primary = computed(() => localities.value.filter(locality => locality.population > 100000).sort(sorter) ?? null)
  const fetch = async (): Promise<Locality[]> => {
    const { data } = await $api('localities').get<Locality[]>()
    fill(data)
    return data
  }

  const fill = (data: Locality[]) => {
    localities.value = data.sort()
    current.value = currentLocalityCookie.value ? find(currentLocalityCookie.value as string) : null
  }

  const setCurrent = (slug: string) => {
    current.value = find(slug)
    currentLocalityCookie.value = slug
  }

  return { localities, primary, current, setCurrent, fetch, fill, find }
})
