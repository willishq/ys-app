<script setup lang="ts">
import LocalityPicker from '~/Components/Forms/LocalityPicker.vue'
import { FormErrors } from '~/utils/form'
interface Props {
  errors?: string | string[] | FormErrors | FormErrors[] | undefined; modelValue: string;
  label: string;
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
    <LocalityPicker
      :inline="false"
      :label="label"
      :model-value="modelValue"
      @update:model-value="(v) => $emit('update:modelValue', v)"
    />
    <template v-if="showErrors">
      <span v-for="error in errors" :key="error" class="text-error-500 text-sm block" v-text="error" />
    </template>
  </div>
</template>
