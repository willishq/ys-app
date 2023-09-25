<script setup lang="ts">

import { useCategories } from '#imports'

interface Props {
    category: Category,
}

interface Events {
    (event: 'update:category', category: Category): void;
}

defineProps<Props>()
const emit = defineEmits<Events>()

const store = useCategories()

const isOpen = ref(false)
const toggleSelector = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div
    :class="['relative w-1/2 user-select-none', !isOpen && 'flex items-center']"
  >
    <div
      :class="[
        'absolute w-full bg-white flex flex-col content-center',
        isOpen && ` border -mt-6.5 -mx-0.5 border-2 rounded rounded-tr-none -mt-[1.625rem] w-auto ${category.colour.border}`
      ]"
    >
      <h1
        :class="[
          'text-2xl cursor-pointer px-6 hover:underline',
          category.colour.text,
          isOpen && `${category.colour.hoverLightBg} py-5`
        ]"
        @click="toggleSelector"
      >
        {{ category.name }}
      </h1>
      <div
        v-if="isOpen"
        class="flex flex-col"
      >
        <template
          v-for="c in store.primaryCategories"
          :key="c.slug"
        >
          <button
            v-if="c.slug !== category.slug"
            type="button"
            :class="[
              'flex-wrap text-left cursor-pointer p-4 hover:underline',
              c.colour.text,
              c.colour.hoverLightBg
            ]"
            @click="emit('update:category', c)"
          >
            {{ c.name }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
