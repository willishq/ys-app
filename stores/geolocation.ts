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
  }

  return { localities, primary, fetch, fill }
})
