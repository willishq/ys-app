<script setup lang="ts">

</script>

<template>
  <div class="flex min-h-screen flex-col bg-neutral-100 gap-8">
    <nav
      class="sticky top-0 z-50 bg-gradient-to-r from-secondary-400 via-accent-400 to-primary-400 shadow-lg"
    >
      <header class="mb-1.5">
        <div class="relative bg-white">
          <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
            <div class="flex content-center justify-start md:w-0 md:flex-1">
              <NuxtLink
                class="-my-5 flex items-center rounded-lg bg-gradient-to-br from-secondary-400 to-primary-400 p-2 px-6 text-2xl font-semibold text-white hover:bg-gradient-to-bl"
                to="/"
              >
                FindSupport
              </NuxtLink>
            </div>
            <div class="md:text-auto text-right">
              <NuxtLink
                class="font-semibold text-neutral-600 hover:text-neutral-800 hover:underline"
                :to="{ name: 'providers' }"
              >
                Run a service?
              </NuxtLink>
            </div>
          </div>
        </div>
      </header>
    </nav>
    <main class="z-5 mx-auto flex w-full max-w-7xl flex-grow flex-col">
      <slot />
    </main>
  </div>
</template>
