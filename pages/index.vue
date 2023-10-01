<script setup lang="ts">

import LocalitySelector from '~/Components/LocalitySelector.vue'

const store = useCategories()
const localityStore = useGeolocationStore()

const routeTo = (category: string) => {
  const params: { category: string, locality?: string } = {
    category
  }
  if (localityStore.current) {
    params.locality = localityStore.current.slug
  }

  return {
    name: params.locality ? 'directory-category-in-locality' : 'directory-category',
    params
  }
}
</script>

<template>
  <div class="flex flex-grow flex-col content-center justify-center">
    <div
      class="flex flex-col gap-12 rounded-lg bg-gradient-to-br from-secondary-900/20 via-accent-900/30 to-primary-900/20 p-12 backdrop-blur-lg"
    >
      <h1 class="text-shadow text-6xl">
        Need help?
      </h1>
      <p class="text-shadow text-xl" />
      <LocalitySelector label="Find somewhere nearby today" prefix="Find somewhere near" />

      <ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <li
          v-for="item in store.primaryCategories"
          :key="item.id"
          :class="`text-lg rounded p-6 text-center hover:underline font-semibold ${item.colour.bgDark}`"
        >
          <NuxtLink
            :to="routeTo(item.slug)"
          >
            <p>{{ item.name }}</p>
            <p v-if="localityStore.current">
              in {{ localityStore.current.name }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
