<script setup lang="ts">
import { getCategoryLatestPosts } from '~/utils/asyncApi'
import RelatedPost from '~/Components/Post/ReleatedPost.vue'

interface Props {
  category: PrimaryCategory;
}

const props = defineProps<Props>()

const latestPosts = await getCategoryLatestPosts(props.category)

</script>

<template>
  <div>
    <div class="bg-white rounded shadow">
      <h3
        :class="[
          'p-4 text-lg font-bold rounded-t',
          category.colour.bgDark
        ]"
      >
        {{ category.name }}
      </h3>
      <template v-for="post in latestPosts" :key="post.id">
        <RelatedPost :post="post" :theme="category.colour" />
      </template>
    </div>
  </div>
</template>
