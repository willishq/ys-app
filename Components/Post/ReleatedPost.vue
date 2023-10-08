<script setup lang="ts">
import { CalendarIcon } from '@heroicons/vue/24/solid'

interface Props {
  post: Post;
}

defineProps<Props>()

</script>

<template>
  <div class="my-4">
    <h1 class="text-lg font-bold text-neutral-500">
      {{ post.title }}
    </h1>
    <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-neutral-400">
      <CalendarIcon class="h-5 w-5 text-neutral-400 mr-1.5" />
      <time :datetime="post.datetime" class="mr-8">{{ post.date }}</time>
      <div v-if="post.provider" class="-ml-4 flex items-center gap-x-4">
        <svg viewBox="0 0 2 2" class="-ml-0.5 h-0.5 w-0.5 flex-none fill-neutral-400">
          <circle cx="1" cy="1" r="1" />
        </svg>
        <div class="flex gap-x-2.5">
          <img v-if="post.provider.avatar" :src="post.provider.avatar" alt="" class="h-6 w-6 flex-none rounded-full">
          {{ post.provider.title }}
        </div>
      </div>
    </div>
  </div>
</template>
