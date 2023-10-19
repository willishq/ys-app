<script setup lang="ts">
import { Combobox, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { useGeolocationStore } from '~/stores/geolocation'

interface Props {
  label?: string;
  inline?: boolean;
  prefix?: string;
  modelValue?: string;
}

interface Emits {
  (event: 'update:modelValue', value?: string): void;
}

const store = useGeolocationStore()

const { label, prefix, modelValue, inline = true } = defineProps<Props>()

const combobox = ref<HTMLElement | null>()

const emit = defineEmits<Emits>()

const query = ref<string>('')
const selected = ref(store.find(modelValue))

const sorter = (a: Locality, b: Locality): number => b.population - a.population
const filter = (items: Locality[]): Locality[] => {
  const filteredItems = items.filter(i => i.name.toLowerCase().startsWith(query.value.toLowerCase()))
    .sort(sorter)

  if (filteredItems.length > 15) {
    return filteredItems.slice(0, 10)
  }
  return filteredItems
}
const options = computed(() => query.value ? filter(store.localities) : store.primary)

const showInput = ref<boolean>(false)
const updateValue = (value: string) => {
  emit('update:modelValue', value)
  selected.value = store.find(value)
  showInput.value = false
  query.value = ''
  emit('update:modelValue', value)
}

const handleShowInput = () => {
  showInput.value = true
  query.value = ''
}

watch(combobox, () => {
  combobox.value?.$el.focus()
})

</script>
<template>
  <Combobox
    :model-value="modelValue || ''"
    as="div"
    :class="[
      'flex flex-col mr-6',
      inline ?'': 'w-full gap-0.5 my-0.5',
    ]"
    @update:model-value="updateValue"
  >
    <ComboboxLabel v-if="!inline" class="block text-sm font-medium text-neutral-500">
      {{ label }}
    </ComboboxLabel>
    <div
      v-if="!showInput"
      :class="[
        'text-neutral-500 cursor-pointer flex items-center gap-2',
        !inline && 'border border-neutral-300 p-2 rounded w-full text-sm',
      ]"
    >
      <span
        v-if="selected"
        :class="[inline ? 'hover:underline' : 'w-full']"
        @click="handleShowInput"
      >
        {{ prefix }} {{ selected.name }}
        <span
          v-if="selected.stateName && selected.stateName !== selected.name"
          class="text-xs"
          v-text="`(${selected.stateName})`"
        />
      </span>
      <XMarkIcon
        v-if="selected"
        class="w-4 h-4 inline-block hover:scale-125"
        @click="updateValue('')"
      />
      <span
        v-else
        :class="[inline ? 'hover:underline' : 'w-full']"
        @click="handleShowInput"
      >{{ inline && label ? label : 'Search' }}</span>
    </div>
    <div
      v-else
      class="relative"
    >
      <ComboboxInput
        ref="combobox"
        :display-value="() => query"
        :class="[
          'text-sm', inline ?
            'py-1.5 -my-1.5 focus:ring-primary-500 rounded focus:border focus:border-primary-500' :
            'border border-neutral-500 p-2 rounded w-full text-sm focus:ring-accent-500 focus:border-accent-500'
        ]"
        placeholder="Enter a location"
        @change="query = $event.target.value"
        @keydown.escape="showInput = false"
        @keydown.tab.prevent="showInput = false"
      />

      <ComboboxOptions
        v-if="showInput"
        class="absolute max-h-48 overflow-auto z-10 w-full bg-white shadow-md rounded-b flex flex-col"
      >
        <ComboboxOption
          v-for="{id, slug, name, stateName} in options"
          :key="id"
          v-slot="{ active, selected: nestedSelected}"
          as="template"
          :value="slug"
        >
          <li
            class="w-full px-4 py-2 text-sm user-select-none cursor-pointer"
            :class="[
              active ? 'bg-primary-100' : 'bg-white',
              nestedSelected ? 'text-primary-500' : 'text-neutral-900',
            ]"
          >
            {{ name }}
            <span
              v-if="stateName && stateName !== name"
              class="text-xs text-neutral-500"
              v-text="`(${stateName})`"
            />
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
