<script setup lang="ts">
import { Ref } from 'vue'
import { getProvider } from '~/utils/asyncApi'
import { categories as categoryThemes } from '~/colours/categories'
import CategoryPanel from '~/Components/Profile/CategoryPanel.vue'
import LocationPanel from '~/Components/Profile/LocationPanel.vue'
import ServicePanel from '~/Components/Profile/ServicePanel.vue'
import HeaderPanel from '~/Components/Profile/HeaderPanel.vue'
import ArticlePanel from '~/Components/Profile/ArticlePanel.vue'

const route = useRoute()

const provider: Ref<Provider | null> = await getProvider(route.params.slug as string)

const theme = categoryThemes('default')

</script>

<template>
  <div v-if="provider" class="flex w-full flex-col justify-end bg-cover gap-12">
    <HeaderPanel :provider="provider" :theme="theme" />
    <CategoryPanel :category-ids="provider.categories" />
    <ArticlePanel v-if="provider.articles.length" :articles="provider.articles" :theme="theme" />
    <ServicePanel v-if="provider.services.length" :services="provider.services" :theme="theme" />
    <LocationPanel v-if="provider.places.length" :places="provider.places" :theme="theme" />
  </div>
</template>
