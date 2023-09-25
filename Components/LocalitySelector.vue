<script setup lang="ts">
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/20/solid'

interface Props {
    label?: string;
    locality?: string;
    error?: string;
}

interface Emits {
    (event: 'update:locality', value?: string): void;
}

const store = useGeolocationStore()

const { locality, label } = defineProps<Props>()

const combobox = ref<HTMLElement | null>()

const selected = computed<Locality | undefined>(() => store.localities.find(l => l.slug === locality))

const emit = defineEmits<Emits>()

const query = ref<string>('')

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
  emit('update:locality', value)

  showInput.value = false
  query.value = ''
}

const handleShowInput = () => {
  showInput.value = true
  query.value = ''
}

let blurTimout = null
const handleInputBlur = () => {
  if (blurTimout) {
    clearTimeout(blurTimout)
  }

  blurTimout = setTimeout(() => {
    showInput.value = false
  }, 200)
}

watch(combobox, () => {
  combobox.value?.$el.focus()
})

</script>
<template>
  <Combobox
    :model-value="locality || ''"
    as="div"
    class="flex flex-row items-center mr-6"
    @update:model-value="updateValue"
  >
    <div
      v-if="!showInput"
      class="text-neutral-500 cursor-pointer flex items-center gap-2"
    >
      <span
        v-if="selected"
        class="hover:underline"
        @click="handleShowInput"
      >
        in {{ selected.name }}
        <span
          v-if="selected.stateName && selected.stateName !== locality.name"
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
        class="hover:underline"
        @click="handleShowInput"
      >{{ label || 'Enter a location' }}</span>
    </div>
    <div
      v-else
      class="relative"
    >
      <ComboboxInput
        ref="combobox"
        :display-value="() => query"
        class="text-sm py-1.5 -my-1.5"
        placeholder="Enter a location"
        @change="query = $event.target.value"
        @keydown.escape="showInput = false"
        @keydown.tab.prevent="showInput = false"
        @blur="handleInputBlur"
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
