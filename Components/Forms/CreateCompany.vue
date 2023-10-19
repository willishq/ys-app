<script setup lang="ts">

import FormInput from '~/Components/Forms/FormInput.vue'
import PrimaryCategoryPicker from '~/Components/Forms/PrimaryCategoryPicker.vue'
import LocalitySelector from '~/Components/Forms/LocalitySelector.vue'
import FormTextarea from '~/Components/Forms/FormTextarea.vue'
import { FormErrors } from '~/utils/form'

interface Emits {
  (event: 'success'): void
  (event: 'error', data: FormErrors): void
}

const emit = defineEmits<Emits>()

const {
  form,
  errors,
  hasErrors,
  submit
} = useForm({
  name: '',
  category: '',
  description: '',
  locality: ''
}, 'providers')

const submitForm = async () => {
  await submit()
  if (hasErrors.value) {
    emit('error', errors.value)
  } else {
    await useAuth().refresh()
    setTimeout(() => {
      emit('success')
    }, 100)
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <fieldset>
      <FormInput
        id="provider.name"
        v-model="form.name"
        label="Company Name"
        type="text"
        :errors="errors.name"
      />
      <FormTextarea
        id="provider.description"
        v-model="form.description"
        label="Company description"
        :errors="errors.description"
      />
      <PrimaryCategoryPicker
        id="provider.category"
        v-model="form.category"
        label="Primary Category"
        :errors="errors.category"
      />
      <LocalitySelector
        v-model="form.locality"
        label="Primary Location"
        :errors="errors.locality"
      />
      <div class="flex justify-end mt-2">
        <button
          type="submit"
          :class="[
            'bg-accent-500 text-white font-medium text-sm rounded-md border p-2',
          ]"
        >
          Create Provider
        </button>
      </div>
    </fieldset>
  </form>
</template>
