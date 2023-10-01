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

interface Emits {
    (event: 'mouseenter'): void;
    (event: 'mouseleave'): void;
}

const props = defineProps<Props>()
defineEmits<Emits>()

const el = ref<HTMLElement>()

watch(() => props.active, (value) => {
  if (value) {
    el.value.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
  }
})

</script>

<template>
  <li
    ref="el"
    class="bg-white rounded p-4 gap-3 flex flex-col justify-between border"
    :class="[active ? 'border-accent-500' : 'border-white']"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <header>
      <h4 :class="['text-xl font-medium yp-4', active ? 'text-accent-500' : theme.text]">
        {{ name }}
      </h4>
    </header>

    <ul class="flex flex-col gap-1 text-sm">
      <li v-for="line in address" :key="hash(line)" :class="['px-3 py-1', active ? 'bg-accent-50' : theme.bg]">
        {{ line }}
      </li>
      <li :class="['px-3 py-1  font-semibold', active ? 'bg-accent-50' : theme.bg]">
        {{ locality }}
      </li>
      <li v-if="country" :class="['px-3 py-1', active ? 'bg-accent-50' : theme.bg]">
        {{ country }}
      </li>
      <li v-if="postcode" :class="['px-3 py-1', active ? 'bg-accent-50' : theme.bg]">
        {{ postcode }}
      </li>
    </ul>
  </li>
</template>
