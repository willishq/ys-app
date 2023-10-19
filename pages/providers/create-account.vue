<script setup lang="ts">

import RegisterUser from '~/Components/Forms/RegisterUser.vue'
import CreateCompany from '~/Components/Forms/CreateCompany.vue'

definePageMeta({
  layout: 'auth'
})
const {
  isLoggedIn
} = useAuth()

const router = useRouter()

const showForm = computed(() => isLoggedIn.value ? 'provider' : 'user')

</script>

<template>
  <div class="m-4">
    <h2 class="font-semibold text-4xl text-neutral-600 mb-4">
      Create an account
    </h2>
    <RegisterUser
      v-if="showForm === 'user'"
    />
    <CreateCompany
      v-if="showForm === 'provider'"
      @success="() => router.push({
        name: 'dashboard'
      })"
    />
  </div>
</template>
