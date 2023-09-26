<script setup lang="ts">

interface Props {
    name: string;
    address: {[k: string]: string};
    locality: string;
    country: string;
    postcode?: string;
    theme: ColourTheme;
    active?: boolean;
}

defineProps<Props>()

</script>

<template>
  <div class="bg-white rounded p-4 gap-3 flex flex-col justify-between ring" :class="[active ? theme.ring : 'ring-white']">
    <header>
      <h4 :class="['text-xl font-medium yp-4', theme.text]">
        {{ name }}
      </h4>
    </header>

    <ul class="flex flex-col gap-1 text-sm">
      <li v-for="line in address" :key="hash(line)" :class="['px-3 py-1', theme.bg]">
        {{ line }}
      </li>
      <li :class="['px-3 py-1  font-semibold', theme.bg]">
        {{ locality }}
      </li>
      <li v-if="country" :class="['px-3 py-1', theme.bg]">
        {{ country }}
      </li>
      <li v-if="postcode" :class="['px-3 py-1', theme.bg]">
        {{ postcode }}
      </li>
    </ul>
  </div>
</template>
