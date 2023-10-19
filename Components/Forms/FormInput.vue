<script setup lang="ts">

import { FormErrors } from '~/utils/form'

enum InputType {
  text = 'text',
  password = 'password',
  email = 'email',
  date = 'date',
  datetimeLocal = 'datetime-local',

}
interface Props {
  errors?: string | string[] | FormErrors | FormErrors[] | undefined;
  modelValue: string;
  label: string;
  id: string;
  type: InputType;
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
    <input
      :id="id"
      :value="modelValue"
      :type="type"
      :name="id"
      class="bg-white font-medium text-sm rounded-md border p-2 w-full text-left border-neutral-300 focus:border-accent-500 focus:ring-1 focus:ring-accent-500"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <template v-if="showErrors">
      <span v-for="error in errors" :key="error" class="text-error-500 text-sm block" v-text="error" />
    </template>
  </div>
</template>
