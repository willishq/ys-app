<script setup lang="ts">

import PagePanel from '~/Components/PagePanel.vue'
import { socialLink } from '~/utils/profileHelpers'

interface Props {
    theme: ColourTheme;
    provider: Provider;
}

const { provider, theme } = defineProps<Props>()

const nonSocialKeys = ['website', 'phone', 'email']

const linkHref = (link, type) => {
  const options = {
    email: `mailto:${link}`,
    phone: `tel:${link}`,
    website: link
  }
  return options[type] || (socialLink(type) && `${socialLink(type).prefix}${link}`)
}

const socialLinks = computed(() => provider.links?.filter(({ type }) => !nonSocialKeys.includes(type)))

const otherLinks = computed(() => provider.links?.filter(({ type }) => nonSocialKeys.includes(type)))

const isCopying = ref(false)

const copy = (event, text, key) => {
  if (key !== 'website') {
    event.preventDefault()
    isCopying.value = key
    navigator.clipboard.writeText(text)
    setTimeout(() => (isCopying.value = false), 1000)
  }
}

const backgroundStyle = computed(() => {
  if (provider.cover) {
    return `background-image: url(${provider.cover})`
  }
  return ''
})

const linkWithIconClass = type =>
  !socialLink(type).icon && 'flex items-center text-sm py-1'

const checkIsCopying = (text, key) => isCopying.value === key ? 'Copied!' : text

</script>

<template>
  <PagePanel :theme="theme" class="bg-white rounded">
    <div
      class="flex w-full flex-col justify-end bg-cover"
      :class="provider.cover && 'aspect-[3/1]'"
      :style="backgroundStyle"
    >
      <div
        class="mx-auto flex flex w-full items-center gap-12 rounded bg-gradient-to-b from-white/10 to-white/60 p-6 shadow backdrop-blur-sm"
        :class="provider.cover && '-mb-56 sm:-mb-32'"
      >
        <div v-if="provider.avatar" class="w-64 grow-0">
          <img
            class="aspect-square rounded-full border-4 border-white object-cover shadow-lg"
            :src="provider.avatar"
            alt="provider logo"
          >
        </div>
        <div class="grow-1 flex w-full flex-col justify-center gap-3">
          <div class="flex justify-end gap-3">
            <a
              v-for="{ type, url, value } in socialLinks"
              :key="`${type}.${value}`"
              class="group w-auto rounded-full bg-primary-500 p-1.5 text-center text-white hover:bg-primary-400"
              :class="linkWithIconClass(type)"
              :href="linkHref(url, type)"
              target="_blank"
            >
              <svg
                class="inline h-6 w-6"
                fill="currentColor"
                :viewBox="socialLink(type).icon.viewBox"
              >
                <path
                  v-for="(path, key) in socialLink(type).icon.path"
                  :key="key"
                  :d="path"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
          <h1 class="text-shadow pb-4 text-5xl text-neutral-800">
            {{ provider.title }}
          </h1>
          <div class="flex gap-3">
            <a
              v-for="{ type, url, value } in otherLinks"
              :key="`${type}.${value}`"
              class="group flex w-full max-w-[16rem] items-center justify-center rounded-full bg-primary-500 py-1 px-4 text-center text-sm text-white hover:bg-primary-400"
              :href="linkHref(url, type)"
              target="_blank"
              :title="
                type === 'website'
                  ? 'Visit Website'
                  : 'Copy to clipboard'
              "
              @click="copy($event, value, type)"
            >
              <component :is="socialLink(type)" class="h-5 w-5" />
              <span
                class="ml-2 hidden w-full items-center truncate text-xs md:block"
                v-text="checkIsCopying(value, type)"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </PagePanel>
  <PagePanel
    :theme="theme"
    class="bg-white rounded p-4"
  >
    <div class="grow-1 flex w-full flex-col justify-center gap-3 bg-white">
      <p class="text-shadow text-lg">
        {{ provider.description }}
      </p>
    </div>
  </PagePanel>
</template>
