<script setup lang="ts">
import { useCategories } from '~/stores/categories'
import CategoryPosts from '~/Components/Post/CategoryPosts.vue'

const error = useError()

const categoryStore = useCategories()

const errorMessages = {
  400: 'Bad request',
  403: 'Forbidden',
  404: 'Page not found',
  408: 'Request timeout',
  500: 'Internal server error',
  418: "I'm a teapot",
  503: 'Service unavailable',
  504: 'Gateway timeout',
  429: 'Too many requests',
  401: 'Unauthorized',
  406: 'Not acceptable',
  419: 'Authentication timeout',
  420: 'Enhance your calm',
  422: 'Unprocessable entity',
  451: 'Unavailable for legal reasons',
  502: 'Bad gateway'
}

</script>

<template>
  <NuxtLayout>
    <div v-if="error?.statusCode" class="grid grid-cols-3 gap-8 mb-8">
      <div class="col-span-3 bg-white px-8 py-16 my-16 rounded shadow">
        <h1 class="text-4xl font-bold">
          {{ error.statusCode }}
          <span v-if="errorMessages[error.statusCode]">{{ errorMessages[error.statusCode] }}</span>
          <span v-else-if="error.statusCode < 500">Please try again.</span>
          <span v-else>It's not you, it's me.</span>
        </h1>
        <p class="text-2xl mt-4">
          <NuxtLink
            to="/"
          >
            Go to the home page
          </NuxtLink>
        </p>
      </div>
      <div class="col-span-3 grid gap-8">
        <div class="bg-white px-8 py-4 rounded shadow inline">
          <h2 class="text-2xl">
            Try these latest posts:
          </h2>
        </div>
        <div class="grid grid-cols-3 gap-8">
          <CategoryPosts v-for="category in categoryStore.primaryCategories" :key="category.id" :category="category" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
