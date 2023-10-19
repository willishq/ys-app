<script setup lang="ts">

interface Props {
  article: Article;
  provider?: Provider;
}

defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="{
      name: 'type-provider-slug',
      params: {
        type: article.type,
        provider: (article.provider || provider).slug,
        slug: article.slug
      }
    }"
    class="relative isolate flex flex-col justify-end overflow-hidden rounded-md px-8 pb-8 pt-40 sm:pt-24 lg:pt-40"
  >
    <article>
      <div class="absolute top-2 right-2">
        <span class="inline-flex items-center gap-x-1.5 rounded-lg px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white bg-primary-500">
          {{ article.type }}
        </span>
      </div>

      <img :src="article.image" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover">
      <div class="absolute inset-0 -z-10 bg-gradient-to-t from-neutral-900 via-neutral-700/40" />
      <div class="absolute inset-0 -z-10 rounded-md ring-1 ring-inset ring-neutral-700/10" />

      <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-neutral-300">
        <time :datetime="article.datetime" class="mr-8">{{ article.date }}</time>
      </div>
      <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
        <span>
          <span class="absolute inset-0" />
          {{ article.title }}
        </span>
      </h3>
    </article>
  </NuxtLink>
</template>

<style scoped>

</style>
