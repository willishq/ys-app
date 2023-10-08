<script setup lang="ts">

import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { categories as categoryThemes } from '~/colours/categories'

interface Props {
    category: PrimaryCategory;
    defaultOpen?: boolean;
}

const props = defineProps<Props>()
const theme = categoryThemes(props.category.slug)

</script>

<template>
  <div class="flex flex-col gap-2 items-center">
    <h4 :class="['text-md font-medium rounded-full px-4 py-1.5 shadow w-full border', theme.bgDark, theme.border]">
      {{ category.name }}
    </h4>
    <ul class="flex gap-2">
      <li
        v-for="{slug, name} in category.children"
        :key="slug"
        :class="['px-3 py-1 bg-white shadow rounded-full text-xs border', theme.text, theme.border]"
      >
        {{ name }}
      </li>
    </ul>
  </div>
</template>
