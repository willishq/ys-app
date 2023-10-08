<script setup lang="ts">

import { getPostCategoriesRelatedPosts, getProviderPost, getProviderRelatedPosts } from '~/utils/asyncApi'
import CategoryPanel from '~/Components/Profile/CategoryPanel.vue'
import ReleatedPost from '~/Components/Post/ReleatedPost.vue'

const { slug, provider }: {slug: string, provider: string} = useRoute().params
const post = await getProviderPost(provider, slug)
if (!post.value) {
  useRouter().push('/404')
}

const providerRelatedPosts = await getProviderRelatedPosts(post.value.provider.id, post.value.id)
const categoryRelatedPosts = await getPostCategoriesRelatedPosts(post.value.id)

</script>

<!--eslint-disable vue/no-v-html  -->
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
        <div class="flex mt-4 flex-wrap items-center overflow-hidden text-sm leading-6 text-neutral-300">
          <span class="mr-1.5">Published on</span>
          <time :datetime="post.datetime" class="mr-8">{{ post.date }}</time>
        </div>
      </header>
      <div class="trix-content text-neutral-900" v-html="post.content" />
    </article>
    <div class="col-span-4 flex flex-col gap-6">
      <div class="bg-white border rounded-md shadow-md border-neutral-200 p-4 flex flex-col gap-3">
        <div class="leading-6 text-neutral-700 flex flex-col gap-2">
          <span class="text-neutral-500">{{ ucFirst(post.type) }} by</span>
          <div class="flex gap-x-2.5">
            <img v-if="post.provider.avatar" :src="post.provider.avatar" alt="" class="h-6 w-6 flex-none rounded-full">
            <h2 class="text-3xl font-semibold">
              {{ post.provider.title }}
            </h2>
          </div>
        </div>
        <hr class="h-px -mx-4 bg-neutral-300 border-0">
        <div v-if="providerRelatedPosts?.length > 0">
          <h3 class="leading-6 mb-3 text-neutral-400">
            More from {{ post.provider.title }}
          </h3>
          <hr class="h-px -mx-4 bg-neutral-300 border-0">
          <ReleatedPost
            v-for="providerPost in providerRelatedPosts"
            :key="providerPost.id"
            :post="providerPost"
          />
        </div>
      </div>

      <div class="bg-white border rounded-md shadow-md border-neutral-200 p-4 flex flex-col gap-3">
        <CategoryPanel :category-ids="post.categories" />
        <hr class="h-px -mx-4 bg-neutral-300 border-0">
        <div v-if="categoryRelatedPosts?.length > 0">
          <h3 class="leading-6 mb-3 text-neutral-400">
            Related content
          </h3>
          <hr class="h-px -mx-4 bg-neutral-300 border-0">
          <ReleatedPost
            v-for="categoryPost in categoryRelatedPosts"
            :key="categoryPost.id"
            :post="categoryPost"
          />
        </div>
      </div>
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
