<script setup lang="ts">
interface Props {
    title?: string;
    theme: ColourTheme;
    size?: 'text-xl' | 'text-2xl' | 'text-3xl';
}

defineProps<Props>()

</script>

<template>
  <div>
    <header
      v-if="title"
      :class="[size || 'text-xl', theme.bgDark]"
      class="flex justify-between shadow-md bg-gradient-to-bl from-white/30 to-[50px] to-white/0 w-full gap-3 p-3"
    >
      <h2 v-text="title" />
      <template v-if="$slots.header">
        <slot name="header" />
      </template>
    </header>
    <div
      v-if="$slots.default"
      :class="['flex-row', theme.text]"
    >
      <slot name="default" />
    </div>
  </div>
</template>
