import { defineStore } from 'pinia'
import { ComputedRef, Ref } from 'vue'
import { categories as theme } from '../colours/categories'
import $api from '~/utils/apiFetch'

export const useCategories = defineStore('categories', () => {
  const categories: Ref<Category[]> = shallowRef([])

  const primaryCategories: ComputedRef<PrimaryCategory[]> = computed(
    () => categories.value
      .filter((c: Category) => !c.parent)
      .map((c: Category) => ({
        ...c,
        children: categories.value.filter((cc: Category): boolean => cc.parent === c.id),
        colour: theme(c.slug)
      }))
  )
  const fetch = async (): Promise<Category[]> => {
    const { data } = await $api('categories').get<{data:Category[]}>()
    fill(data)
    return data
  }

  const fill = (data: Category[]) => {
    categories.value = data
  }
  const find = (id: string): Category | undefined => {
    return categories.value.find((c: Category) => c.id === id)
  }

  const categoryTree = (ids: Array<string>): PrimaryCategory[] => primaryCategories.value.filter((c: PrimaryCategory) => ids.find((id: string) => id === c.id))
    .map((c: PrimaryCategory) => ({
      ...c,
      children: c.children.filter((cc: Category) => ids.find((id: string) => id === cc.id))
    }))

  return {
    categories,
    primaryCategories,
    fetch,
    fill,
    find,
    categoryTree
  }
})
