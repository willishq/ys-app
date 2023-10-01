<script setup lang="ts">

import { useGeolocationStore, useRoute, useRouter } from '#imports'
import CategoryFilter from '~/Components/CategoryFilter.vue'
import PrimaryCategorySelector from '~/Components/PrimaryCategorySelector.vue'
import LocalitySelector from '~/Components/LocalitySelector.vue'

const {
  pageType = 'index'
} = defineProps<{
    pageType?: string;
}>()

interface DirectoryRouteParams {
    name: string,
    params: {
        category: string,
        locality?: string,
    },
    query: {
        f?: string,
    },
}

const route = useRoute()
const router = useRouter()
const categoryStore = useCategories()
const localityStore = useGeolocationStore()
const category = ref<PrimaryCategory>(categoryStore.primaryCategories.find(item => item.slug === route.params.category))

const filter = ref<string>(route.query.f as string | '')

const refresh = ({ c = null, f = null } = {}) => {
  const routeTo: DirectoryRouteParams = {
    name: 'directory-category',
    params: {
      category: (c || category.value!.slug)
    },
    query: {}
  }

  if (!c && (f || filter.value)) {
    routeTo.query.f = f || filter.value!
  }
  if (localityStore.current) {
    routeTo.name = 'directory-category-in-locality'
    routeTo.params.locality = localityStore.current.slug
  }

  if (pageType === 'listing') {
    routeTo.name += '-type'
  }

  if (
    routeTo.name !== route.name ||
        routeTo.params.category !== route.params.category ||
        routeTo.params.locality !== route.params.locality ||
        routeTo.query.f !== route.query.f
  ) {
    router.push(routeTo)
  }
}

watch(() => categoryStore.primaryCategories, () => {
  category.value = categoryStore.primaryCategories.find(item => item.slug === route.params.category)
})

</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <header
      :class="`md:col-span-12 py-6 bg-white shadow-md flex content-center justify-between ${category.colour.border} border-2 rounded`"
    >
      <PrimaryCategorySelector
        :category="category"
        @update:category="refresh({c: ($event || category!).slug})"
      />
      <LocalitySelector
        label="Pick location"
        prefix="in"
        @update:locality="refresh()"
      />
    </header>
    <div class="col-span-9 gap-4 flex flex-col">
      <slot />
    </div>
    <div class="col-span-3">
      <CategoryFilter
        v-model:filter="filter"
        :primary-category="category"
        @apply="refresh({f: filter})"
      />
    </div>
  </div>
</template>
