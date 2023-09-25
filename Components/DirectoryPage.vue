<script setup lang="ts">

import { computed, ref } from 'vue'
import { ArrowPathIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
import PagePanel from '~/Components/PagePanel.vue'
import DirectoryPanel from '~/Components/DirectoryPanel.vue'

const route = useRoute()

const geolocationStore = useGeolocationStore()
const categoryStore = useCategories()

const category = computed<PrimaryCategory>(() => categoryStore.primaryCategories.find(item => item.slug === route.params.category))
const locality = computed<Locality | undefined>(() => geolocationStore.localities.find(l => l.slug === route.params.locality))

const panels = ref([
  {
    title: 'Guides',
    route: 'guides'
  },
  {
    title: 'Articles',
    route: 'articles'
  },
  {
    title: 'Online / Remote Services',
    route: 'online-services'
  }
])

if (locality.value) {
  panels.value = [
    {
      title: 'Nearby Providers',
      route: 'nearby-providers'
    },
    {
      title: 'Local Services',
      route: 'nearby-services'
    },
    ...panels.value
  ]
}

const filter = ref(route.query.f as string | '')

watch(() => route.query, () => {
  filter.value = route.query.f as string | ''
})

</script>

<template>
  <Suspense :key="filter">
    <template #fallback>
      <div class="flex justify-center">
        <ArrowPathIcon
          :class="[
            'animate-spin h-24 w-24',
            category.colour.text
          ]"
        />
      </div>
    </template>
    <template #default>
      <PagePanel
        v-for="panel in panels"
        :key="panel.route + filter + locality?.slug"
        :theme="category.colour"
        :title="panel.title"
      >
        <template #header>
          <NuxtLink
            :to="{
              name: `${route.name}-type`,
              params: {
                category: category.slug,
                type: panel.route,
                locality: locality?.slug,
              },
              query: {
                f: filter,
              },
            }"
            :class="[
              `text-white hover:bg-white flex items-center content-center px-1 rounded-md -mr-1`,
              category.colour.hoverText
            ]"
          >
            <span>All</span>
            <ChevronRightIcon class="inline-block h-6 w-6 -mr-1" />
          </NuxtLink>
        </template>
        <DirectoryPanel
          :category="category.slug"
          :locality="locality?.slug"
          :filter="filter"
          :page="panel.route"
        />
      </PagePanel>
    </template>
  </Suspense>
</template>
