<script setup lang="ts">
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { computed } from 'vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/solid'

interface Props {
    label?: string;
    options: { id: string; name: string; active: boolean }[];
    defaultOptions: {id: string; name: string; active: boolean }[];
    disabledOptions?: string[];
    modelValue?: string | string[] | object | null;
    error?: string | boolean;
    placeholder?: string;
    by?: string;
    format?: (option: { id: string; name: string }) => string;
}

interface Emits {
    (
        e: 'update:modelValue',
        value: string | string[] | object | object[]
    ): void;

    (e: 'blur'): void;
}

defineOptions({
  inheritAttrs: false
})

const {
  label,
  options,
  disabledOptions = [],
  modelValue,
  error,
  placeholder = 'Select One...',
  by = 'id'
} = defineProps<Props>()

const emit = defineEmits<Emits>()

const multiple = computed(() => Array.isArray(modelValue))
const isDisabled = option =>
  option.disabled || disabledOptions.includes(option[by])

const displayName = computed(() => {
  if (multiple.value) {
    return Array.isArray(modelValue) && modelValue.length
      ? `${modelValue.length} Selected`
      : placeholder
  } else if (modelValue) {
    const option = optionCollection.value.find(o =>
      [modelValue[by], modelValue].includes(o[by])
    )
    return option?.name || placeholder
  }
  return placeholder
})

const optionCollection = computed(() =>
  options.map(option => ({
    ...option,
    disabled: isDisabled(option),
    active: option?.active || false
  }))
)

const p = v => v && (v[by] || v)
const update = (value) => {
  const v = multiple.value ? [...value].map(p) : p(value)
  emit('update:modelValue', v)
}
</script>

<template>
  <div class="w-full">
    <Listbox
      v-slot="{ open }"
      :multiple="multiple"
      as="div"
      :model-value="modelValue"
      @update:model-value="update"
    >
      <div v-if="!open && emit('blur') && false" />
      <ListboxLabel class="block text-sm font-medium text-neutral-700">
        {{ label }}
      </ListboxLabel>
      <div class="relative">
        <ListboxButton
          v-bind="$attrs"
          class="relative w-full cursor-default border border-neutral-300 bg-white py-2 pl-5 pr-10 text-left text-sm shadow focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <span class="block truncate text-neutral-500">
            {{ displayName }}
          </span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-neutral-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            as="div"
          >
            <div
              class="h-60 overflow-y-auto scroll-smooth"
            >
              <div>
                <ListboxOption
                  v-for="option in optionCollection"
                  :key="option.id"
                  v-slot="{ active, selected }"
                  as="template"
                  class="disabled:text-neutral-400"
                  :disabled="isDisabled(option)"
                  :value="option.id"
                >
                  <div
                    :class="{
                      'relative cursor-default select-none': true,
                      'text-white': active,
                      'bg-primary-500 text-white':
                        isDisabled(option) && selected,
                      'cursor-not-allowed text-neutral-300':
                        isDisabled(option) && !selected,
                      'cursor-default text-neutral-900':
                        !isDisabled(option) &&
                        !selected,
                    }"
                  >
                    <slot
                      :option="option"
                      :active="active"
                      :selected="selected"
                      name="option"
                    >
                      <span
                        :class="[
                          selected
                            ? 'font-semibold'
                            : 'font-normal',
                          'block truncate py-2 pl-3 pr-9',
                          active
                            ? 'bg-primary-500'
                            : '',
                        ]"
                      >
                        {{ option.name }}
                      </span>
                      <span
                        v-if="selected"
                        :class="[
                          'absolute inset-y-0 right-0 flex items-center pr-4 text-white',
                        ]"
                      >
                        <CheckIcon
                          class="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    </slot>
                  </div>
                </ListboxOption>
              </div>
            </div>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <span
      v-if="error"
      class="text-left text-sm font-semibold text-error-600"
      v-text="error"
    />
  </div>
</template>
