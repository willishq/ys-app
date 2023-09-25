<script setup lang="ts">

import { getDirectoryPanel } from '~/utils/asyncApi'

interface Props {
    page: string,
    category: string,
    locality?: string,
    filter?: string,
}

const {
  page,
  category,
  filter,
  locality
} = defineProps<Props>()

const loaded = ref(false)

const items = await getDirectoryPanel(page, category, { filter, locality })

loaded.value = true
const namedRoute = ({ slug, provider }) => {
  if (provider && ['online-services', 'nearby-services'].includes(page)) {
    return {
      name: 'category-providers-slug',
      params: {
        slug: provider.slug
      },
      hash: `#${slug}`
    }
  }

  if (page === 'nearby-providers') {
    return {
      name: 'category-providers-slug',
      params: {
        slug
      }
    }
  }
  return {
    name: 'directory-category-type',
    params: {
      type: page

    }
  }
}

</script>

<template>
  <div
    v-if="loaded"
    class="grid grid-cols-2 gap-3 my-3"
  >
    <template
      v-for="item in items"
      :key="item.id"
    >
      <NuxtLink :to="namedRoute(item)">
        <article class="flex h-28 w-full shadow-lg">
          <div class="aspect-video bg-black" />
          <footer
            class="grow p-3 bg-white text-neutral-700 text-lg"
            v-text="item.title"
          />
        </article>
      </NuxtLink>
    </template>
    <template v-if="items?.length === 0">
      No results
    </template>
  </div>
  <div v-else>
    Loading...
  </div>
</template>
