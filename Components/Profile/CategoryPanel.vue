<script setup lang="ts">

import { computed, ComputedRef } from 'vue'
import CategoryItem from '~/Components/Profile/CategoryItem.vue'
import { useCategories } from '~/stores/categories'
interface Props {
    categoryIds: string[];
    defaultOpen?: boolean;
}

const { categoryIds = [], defaultOpen = false } = defineProps<Props>()

const categories: ComputedRef<PrimaryCategory[] | undefined> = computed(() => useCategories().categoryTree(categoryIds))
</script>

<template>
  <section class="flex justify-center gap-3 flex-wrap">
    <CategoryItem v-for="category in categories" :key="category.id" :category="category" :default-open="defaultOpen || false" />
  </section>
</template>
