<script setup lang="ts">

import { getOrganisationPost } from '~/utils/asyncApi'
import { useCategories } from '~/stores/categories'
import CategoryPanel from '~/Components/Profile/CategoryPanel.vue'

const { slug, provider }: {slug: string, provider: string} = useRoute().params
const post = await getOrganisationPost(provider, slug)
if (!post.value) {
  useRouter().push('/404')
}

const categories = ref(useCategories().categoryTree(post.value.categories))

</script>
<!--
length LR: 24.5
circ LR: 24.7
 -->
<template>
  <div class="grid grid-cols-12 gap-3">
    <article class="col-span-8 bg-white border rounded-md shadow-md border-neutral-200 p-4">
      <header class="relative isolate flex flex-col justify-end overflow-hidden rounded-t-md bg-primary-500 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 -m-4 mb-4">
        <img v-if="post.image" :src="post.image" :alt="post.title" class="absolute inset-0 -z-10 h-full w-full object-cover">
        <div class="absolute inset-0 -z-10 bg-gradient-to-t via-35% to-50% from-neutral-900/80 via-neutral-900/60" />
        <h1 class="text-2xl font-bold text-neutral-50">
          {{ post.title }}
        </h1>
        <h2 class="text-lg  text-neutral-100">
          {{ post.description }}
        </h2>
        <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-neutral-300">
          <time :datetime="post.datetime" class="mr-8">{{ post.date }}</time>
          <div class="-ml-4 flex items-center gap-x-4">
            <svg viewBox="0 0 2 2" class="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
              <circle cx="1" cy="1" r="1" />
            </svg>
            <div class="flex gap-x-2.5">
              <img v-if="post.provider.avatar" :src="post.provider.avatar" alt="" class="h-6 w-6 flex-none rounded-full bg-white/10">
              {{ post.provider.title }}
            </div>
          </div>
        </div>
      </header>
      <div class="trix-content text-neutral-900" v-html="post.content" />
    </article>
    <div class="col-span-4 bg-white border rounded-md shadow-md border-neutral-200 p-4">
      <CategoryPanel :category-ids="post.categories" />
    </div>
  </div>
</template>

<style scoped>
@import "trix/dist/trix.css";

figure a {
  pointer-events: none;
}

.trix-content {
  @apply flex flex-col gap-3 text-lg;

  h1 {
    @apply text-2xl;
  }

  div {
    @apply p-2;
  }

  .attachment__name {
    display: none;
  }

  .attachment__size {
    display: none;
  }

  img {
    @apply mx-auto max-h-64 w-auto;
  }
}
</style>
