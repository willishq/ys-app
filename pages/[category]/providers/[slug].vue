<script setup lang="ts">
import { Ref } from 'vue'
import { getOrganisation } from '~/utils/asyncApi'
import { categories as categoryThemes } from '~/colours/categories'
import CategoryPanel from '~/Components/Profile/CategoryPanel.vue'
import LocationPanel from '~/Components/Profile/LocationPanel.vue'
import ServicePanel from '~/Components/Profile/ServicePanel.vue'
import HeaderPanel from '~/Components/Profile/HeaderPanel.vue'

const route = useRoute()

const organisation: Ref<Provider | null> = await getOrganisation(route.params.slug as string)

const theme = categoryThemes('default')

</script>

<template>
  <div v-if="organisation" class="flex w-full flex-col justify-end bg-cover gap-12">
    <HeaderPanel :organisation="organisation" :theme="theme" />
    <CategoryPanel :category-ids="organisation.categories" />
    <ServicePanel :services="organisation.services" :theme="theme" />
    <LocationPanel :places="organisation.places" :theme="theme" />
  </div>
</template>
