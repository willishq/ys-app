<script setup lang="ts">
import { hash } from '~/utils/profileHelpers'
interface Props {
    title: string;
    description: string;
    features: string[];
    theme: ColourTheme;
}
defineProps<Props>()
</script>

<template>
  <div class="bg-white rounded p-4 gap-3 flex flex-col justify-between">
    <header>
      <h4 :class="['text-xl font-medium yp-4', theme.text]">
        {{ title }}
      </h4>
      <p class="p-4">
        {{ description }}
      </p>
    </header>

    <ul class="flex flex-col gap-1 text-sm">
      <li
        v-for="feature in features"
        :key="hash(feature)"
        :class="['px-3 py-1', theme.bg]"
      >
        {{ feature }}
      </li>
    </ul>
  </div>
</template>
