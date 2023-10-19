<script setup lang="ts">
import { ref } from 'vue'
import { CalendarIcon } from '@heroicons/vue/24/solid'
import { categories } from '~/colours/categories'
import { useCategories } from '~/stores/categories'

interface Props {
  post: Post;
  provider?: Provider;
  theme?: ColourTheme
}

const props = defineProps<Props>()
const colourTheme = props.theme || categories('default')

const providerCategory = ref()

if (props.post.provider) {
  const primaryProviderCategoryTree = useCategories().categoryTree(props.post.provider.categories)
  providerCategory.value = primaryProviderCategoryTree[0]
}

</script>

<template>
  <div
    :class="[
      'p-4 block',
      colourTheme.hoverLightBg
    ]"
  >
    <NuxtLink
      :to="{
        name: 'type-provider-slug',
        params: {
          type: post.type,
          provider: (provider || post.provider).slug,
          slug: post.slug
        }
      }"
      class="hover:underline"
    >
      <div class="text-lg font-bold text-neutral-500">
        {{ post.title }}
      </div>
    </NuxtLink>
    <div class="flex items-center justify-between gap-y-1 overflow-hidden text-sm leading-6 text-neutral-400">
      <div class="select-none">
        <CalendarIcon class="h-5 w-5 inline-block text-neutral-400 mr-1.5" />
        <time :datetime="post.datetime" class="mr-8">{{ post.date }}</time>
      </div>
      <template v-if="post.provider">
        <NuxtLink
          :to="{
            name: 'category-providers-slug',
            params: {
              category: providerCategory.slug,
              slug: post.provider.slug
            }
          }"
          class="flex items-center gap-x-2.5 hover:text-neutral-900 hover:underline"
        >
          <img v-if="post.provider.avatar" :src="post.provider.avatar" alt="" class="h-6 w-6 flex-none rounded-full">
          {{ post.provider.title }}
        </NuxtLink>
      </template>
    </div>
  </div>
</template>
