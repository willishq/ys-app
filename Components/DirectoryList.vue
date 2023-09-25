<script setup lang="ts">

import { computed, ref } from 'vue'
import { ArrowPathIcon } from '@heroicons/vue/24/solid'
import PagePanel from '~/Components/PagePanel.vue'
import { $apiGet } from '~/utils/apiFetch'

const route = useRoute()

const geolocationStore = useGeolocationStore()
const categoryStore = useCategories()

const category = computed<PrimaryCategory>(() => categoryStore.primaryCategories.find(item => item.slug === route.params.category))
const locality = computed<Locality | undefined>(() => geolocationStore.localities.find(l => l.slug === route.params.locality))

const panels = {
  guides: 'Guides',
  articles: 'Articles',
  'online-services': 'Online / Remote Services',
  'nearby-providers': 'Nearby Providers',
  'nearby-services': 'Local Services'
}

const panelText = computed(() => panels[route.params.type as keyof typeof panels])

const filter = ref(route.query.f as string | '')

watch(() => route.query, () => {
  filter.value = route.query.f as string | ''
})

const routeString = computed(() => `directory/${category.value!.slug}/${route.params.type}/index`)

const { data: items } = await useAsyncData(`directory.${routeString.value}.${filter.value}.${locality.value?.slug}`, async () => (await $apiGet(routeString.value, {
  locality: locality.value?.slug,
  filter: filter.value
})))

</script>

<template>
  <Suspense :key="filter">
    <template #fallback>
      <div class="flex justify-center">
        <ArrowPathIcon
          class="animate-spin h-24 w-24"
          :class="category.colour.text"
        />
      </div>
    </template>
    <template #default>
      <PagePanel
        :key="panelText + filter + locality?.slug"
        :theme="category.colour"
        :title="panelText"
      >
        <template #default>
          <div
            v-if="items"
            class="grid gap-3 my-3"
          >
            <template v-if="items.data.length">
              <NuxtLink
                v-for="item in items.data"
                :key="item.id"
                :to="{
                  name: 'providers-slug',
                  params: {
                    slug: item.slug,
                  },
                }"
              >
                <article
                  class="flex h-32 w-full shadow-lg"
                >
                  <div
                    class="aspect-video bg-black"
                  />
                  <footer
                    class="grow p-3 bg-white text-neutral-700 text-lg"
                  >
                    {{ item.title }}
                  </footer>
                </article>
              </NuxtLink>
            </template>
            <template v-else>
              No results
            </template>
          </div>
          <div v-else>
            Loading...
          </div>
        </template>
      </PagePanel>
    </template>
  </Suspense>
</template>
