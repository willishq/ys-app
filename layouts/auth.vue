<script setup lang="ts">
import ProviderNavbar from '~/Components/Navigation/ProviderNavbar.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-neutral-100 gap-8">
    <ProviderNavbar />
    <main class="z-5 mx-auto flex w-full max-w-md bg-white shadow-md flex-col">
      <slot />
    </main>
  </div>
</template>
