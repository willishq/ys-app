<script setup lang="ts">

import { FormErrors } from '~/utils/form'
interface Props {
  errors?: string | string[] | FormErrors | FormErrors[] | undefined;
  modelValue: string;
  label: string;
  id: string;
}

interface Emits {
  (event: 'update:modelValue', value?: string): void;
}

const props = defineProps<Props>()

defineEmits<Emits>()

const showErrors = ref(false)
const initialValue = ref(props.modelValue)

watch(() => props.modelValue, () => {
  showErrors.value = initialValue.value === props.modelValue
})

watch(() => props.errors, () => {
  showErrors.value = true
  initialValue.value = props.modelValue
})
</script>

<template>
  <div class="flex flex-col gap-0.5 my-0.5">
    <label :for="id" class="block text-sm font-medium text-neutral-500" v-text="label" />
    <textarea
      :id="id"
      :value="modelValue"
      :name="id"
      class="bg-white font-medium text-sm rounded-md border p-2 w-full text-left border-neutral-300 focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
      @input="$emit('update:modelValue', $event.target.value)"
      v-text="modelValue"
    />
    <template v-if="showErrors">
      <span v-for="error in errors" :key="error" class="text-error-500 text-sm block" v-text="error" />
    </template>
  </div>
</template>
