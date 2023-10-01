<script setup lang="ts">

import PagePanel from '../PagePanel.vue'
import ArticleItem from '~/Components/Profile/ArticleItem.vue'

interface Props {
  articles: Article[];
  theme: ColourTheme;
}

defineProps<Props>()
</script>

<template>
  <PagePanel :theme="theme" title="Posts">
    <div class="mt-3 p3 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ArticleItem
        v-for="article in articles"
        :key="article.id"
        :article="article"
        :theme="theme"
      />
    </div>
  </PagePanel>
</template>
