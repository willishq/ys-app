<script setup lang="ts">

import FormInput from '~/Components/Forms/FormInput.vue'
import { FormErrors } from '~/utils/form'

interface Emits {
  (event: 'success'): void
  (event: 'error', data: FormErrors | null): void
}

const emit = defineEmits<Emits>()
const { register } = useAuth()

const {
  form,
  submit,
  errors,
  hasErrors
} = register({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const submitForm = async () => {
  await submit()
  if (hasErrors.value) {
    emit('error', errors.value)
  } else {
    setTimeout(() => {
      emit('success')
    }, 100)
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div>
      <FormInput
        id="user.name"
        v-model="form.name"
        label="Your name"
        type="text"
        :errors="errors.name"
      />
      <FormInput
        id="user.email"
        v-model="form.email"
        label="Your email"
        type="email"
        :errors="errors.email"
      />

      <FormInput
        id="user.password"
        v-model="form.password"
        label="Password"
        type="password"
        :errors="errors.password"
      />
      <FormInput
        id="user.passwordConfirmation"
        v-model="form.password_confirmation"
        label="Confirm Password"
        type="password"
      />
    </div>

    <div class="flex justify-end mt-4">
      <button
        type="submit"
        :class="[
          'bg-accent-500 text-white font-medium text-sm rounded-md border p-2',
        ]"
      >
        Create Account
      </button>
    </div>
  </form>
</template>
