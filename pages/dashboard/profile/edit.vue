<script setup lang="ts">
import FormInput from '~/Components/Forms/FormInput.vue'
import FormTextarea from '~/Components/Forms/FormTextarea.vue'
import { useCurrentProvider } from '~/composables/provider'
import { useAuth } from '~/utils/auth'

definePageMeta({
  layout: 'dashboard',
  keepalive: false
})

const { currentProvider: provider } = await useCurrentProvider()

const { form, errors, update } = useForm({
  name: provider.value.title,
  description: provider.value.description,
  avatar: provider.value.avatar,
  cover: provider.value.cover
}, `providers/${provider.value.id}`)

const saveForm = async () => {
  await update()
  await useAuth().refresh()
}
</script>

<template>
  <div>
    <form @submit.prevent="saveForm">
      <FormInput id="title" v-model="form.name" label="Name" type="text" :errors="errors.title" />
      <FormTextarea id="description" v-model="form.description" label="Description" :errors="errors.description" />
      <div class="flex justify-end mt-2">
        <button
          type="submit"
          :class="[
            'bg-accent-500 text-white font-medium text-sm rounded-md border p-2',
          ]"
        >
          Update Provider Profile
        </button>
      </div>
    </form>
  </div>
</template>
