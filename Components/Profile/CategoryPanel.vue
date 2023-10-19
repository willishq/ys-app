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
  <div>
    <CategoryItem v-for="category in categories" :key="category.id" :category="category" :default-open="defaultOpen || false">
      <template #default="{category: c}">
        <slot
          :category="c"
        />
      </template>
    </CategoryItem>
  </div>
</template>
