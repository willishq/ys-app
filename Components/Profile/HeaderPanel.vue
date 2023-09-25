<script setup lang="ts">

import PagePanel from '~/Components/PagePanel.vue'

interface Props {
    theme: ColourTheme;
    organisation: Provider;
}

defineProps<Props>()
</script>

<template>
  <PagePanel :theme="theme" class="bg-white rounded p-4 mb-8">
    <div class="grow-1 flex w-full flex-col justify-center gap-3 bg-white">
      <h1 class="text-shadow text-5xl">
        {{ organisation.title }}
      </h1>
    </div>
  </PagePanel>
  <PagePanel
    :theme="theme"
    class="bg-white rounded p-4"
  >
    <div class="grow-1 flex w-full flex-col justify-center gap-3 bg-white">
      <p class="text-shadow text-lg">
        {{ organisation.description }}
      </p>
    </div>
  </PagePanel>
</template>
