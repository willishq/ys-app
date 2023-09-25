<script setup lang="ts">

import { CheckIcon } from '@heroicons/vue/24/solid'
import PagePanel from '~/Components/PagePanel.vue'

const route = useRoute()

interface Props {
    primaryCategory: PrimaryCategory;
    filter?: string;
}

interface Events {
    (event: 'update:filter', filter?: string): void;

    (event: 'apply'): void;
}

const props = defineProps<Props>()
const emit = defineEmits<Events>()

const binaryFilter = computed(() => ('0'.repeat(props.primaryCategory.children.length) + parseInt(props.filter || 'FFF', 16).toString(2)).slice(-props.primaryCategory.children.length))
const updateSelectedCategories = ({ target }: { target: HTMLInputElement }, position) => {
  const filter = binaryFilter.value
  const newFilter = filter.substring(0, position) + (target.checked ? '1' : '0') + filter.substring(position + 1)
  let newFilterInt = parseInt(newFilter, 2)
  if (newFilterInt === parseInt('1'.repeat(props.primaryCategory.children.length), 2)) {
    newFilterInt = 0
  }
  emit('update:filter', newFilterInt === 0 ? undefined : newFilterInt.toString(16))
}

const isDirty = computed(() => props.filter !== route.query.f || (!route.query.f && props.filter))
</script>

<template>
  <PagePanel
    title="Filters"
    :theme="primaryCategory.colour"
    class="col-span-3 border"
    :class="primaryCategory.colour.border"
  >
    <div
      :class="[
        'flex flex-col divide-y justify-center flex-wrap border bg-white',
        primaryCategory.colour.divide,
        primaryCategory.colour.border,
      ]"
    >
      <label
        v-for="(category, position) in primaryCategory.children"
        :key="category.id"
        :class="[
          'p-2 text-sm items-center font-medium flex justify-between cursor-pointer group',
          primaryCategory.colour.text,
          primaryCategory.colour.hoverLightBg,
          binaryFilter[position] === '0' && 'opacity-50 hover:opacity-80'
        ]"
      >
        <input
          class="hidden"
          type="checkbox"
          :value="category.id"
          :checked="binaryFilter[position] === '1'"
          @change="updateSelectedCategories($event, position)"
        >
        <span>{{ category.name }}</span>
        <CheckIcon
          v-if="binaryFilter[position] === '1'"
          class="w-5 h-5"
        />
      </label>
    </div>
    <div
      v-if="isDirty"
      class="p-2 border border-t-0"
      :class="primaryCategory.colour.border"
    >
      <button
        type="button"
        :class="[
          'p-2 w-full border-2 hover:bg-white',
          primaryCategory.colour.bgDark,
          primaryCategory.colour.border,
          primaryCategory.colour.hoverText,
        ]"
        @click="emit('apply')"
      >
        Apply
      </button>
    </div>
  </PagePanel>
</template>
