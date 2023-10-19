<script setup lang="ts">

import { Listbox, ListboxButton, ListboxOptions, ListboxOption, ListboxLabel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { useCategories } from '~/stores/categories'
import { FormErrors } from '~/utils/form'

interface Props {
  id: string;
  label?: string;
  errors?: string | string[] | FormErrors | FormErrors[] | undefined;
  modelValue: string;
}

interface Emits {
  (event: 'update:modelValue', value?: string): void;
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { primaryCategories: categories } = useCategories()
const findSelected = () => categories.find(c => props.modelValue === c.id)

const selected = ref(findSelected())
watch(() => props.modelValue, () => {
  selected.value = findSelected()
})

const showErrors = ref(false)
const initialValue = ref(props.modelValue)

watch(() => props.modelValue, () => {
  showErrors.value = initialValue.value === props.modelValue
})

watch(() => props.errors, () => {
  showErrors.value = true
  initialValue.value = props.modelValue
})

const updateValue = (value: string) => {
  emit('update:modelValue', value)
  selected.value = categories.find(c => value === c.id)
}

</script>

<template>
  <div class="flex flex-col gap-0.5 my-0.5">
    <Listbox as="div" class="relative" :model-value="modelValue" @update:model-value="updateValue">
      <ListboxLabel>
        <span class="block text-sm font-medium text-neutral-500" v-text="label" />
      </ListboxLabel>

      <ListboxButton
        :class="[
          'bg-white font-medium text-sm rounded-md border p-2 w-full flex justify-between align-center',
          selected?.colour.text || 'text-neutral-500',
          selected?.colour.border || 'border-neutral-300',
        ]"
      >
        {{ selected?.name || 'select category' }}
        <ChevronDownIcon class="w-5 h-5" />
      </ListboxButton>
      <ListboxOptions class="absolute w-full bg-white shadow-sm rounded mt-1.5 ring-1 ring-inset ring-neutral-300 hover:ring-accent-300 hover:text-accent-400">
        <ListboxOption v-for="{ name, colour, id: cid } in categories" :key="cid" :value="cid">
          <div :class="[colour.text, colour.hoverBgDark, 'py-2 px-4 cursor-pointer']">
            {{ name }}
          </div>
        </ListboxOption>
      </listboxOptions>
    </Listbox>
    <template v-if="showErrors">
      <span v-for="error in errors" :key="error" class="text-error-500 text-sm block" v-text="error" />
    </template>
  </div>
</template>
