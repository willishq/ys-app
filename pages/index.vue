<script setup lang="ts">

const store = useCategories()

</script>

<template>
  <div class="flex flex-grow flex-col content-center justify-center">
    <div
      class="flex flex-col gap-12 rounded-lg bg-gradient-to-br from-secondary-900/20 via-accent-900/30 to-primary-900/20 p-12 backdrop-blur-lg"
    >
      <h1 class="text-shadow text-6xl">
        Need help?
      </h1>
      <p class="text-shadow text-xl">
        Find somewhere nearby today
      </p>

      <ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <li
          v-for="item in store.primaryCategories"
          :key="item.id"
          :class="`text-lg rounded p-6 text-center hover:underline font-semibold ${item.colour.bgDark}`"
        >
          <NuxtLink :to="`/directory/${item.slug}`">
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
