<script setup lang="ts">

import PagePanel from '~/Components/PagePanel.vue'
import ServiceItem from '~/Components/Profile/ServiceItem.vue'
import { hash } from '~/utils/profileHelpers'
interface Props {
    theme: ColourTheme;
    services: Service[];
}

defineProps<Props>()
</script>

<template>
  <PagePanel :theme="theme" title="Services">
    <div class="mt-3 p3 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ServiceItem
        v-for="service in services"
        :key="hash(service.title)"
        :title="service.title"
        :description="service.description"
        :features="service.features"
        :theme="theme"
      />
    </div>
  </PagePanel>
</template>

<style scoped>

</style>
