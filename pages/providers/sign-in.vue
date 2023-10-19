<script setup lang="ts">

import FormInput from '~/Components/Forms/FormInput.vue'

definePageMeta({
  layout: 'auth'
})
const {
  isLoggedIn,
  login
} = useAuth()

const router = useRouter()
const {
  form,
  submit,
  errors
} = login({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

watch(() => isLoggedIn.value, () => {
  if (isLoggedIn.value) {
    router.push({
      name: 'dashboard'
    })
  }
})

</script>

<template>
  <div class="m-4">
    <h2 class="font-semibold text-4xl text-neutral-600 mb-4">
      Sign in to your account
    </h2>
    <form @submit.prevent="submit">
      <div>
        <FormInput
          id="user.email"
          v-model="form.email"
          label="Email"
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
      </div>

      <div class="flex justify-end mt-4">
        <button
          type="submit"
          :class="[
            'bg-accent-500 text-white font-medium text-sm rounded-md border p-2',
          ]"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>
