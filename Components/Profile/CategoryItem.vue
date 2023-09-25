<script setup lang="ts">

import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { categories as categoryThemes } from '~/colours/categories'

interface Props {
    category: PrimaryCategory;
}

const props = defineProps<Props>()
const theme = categoryThemes(props.category.slug)

</script>

<template>
  <div :class="['shadow-lg rounded z-10', theme.text]">
    <Disclosure v-slot="{open}">
      <DisclosureButton>
        <header class="flex justify-between gap-3 items-center rounded-t p-2" :class="[theme.bgDark, !open && 'rounded-b']">
          <h4 :class="['text-md font-medium rounded-tl']">
            {{ category.name }}
          </h4>

          <ChevronRightIcon
            class="w-5 h-5 cursor-pointer rounded-tr"
            :class="[{
              'transform rotate-90': open,
              'transform rotate-0': !open,
            }]
            "
          />
        </header>
      </DisclosureButton>
      <div class="relative">
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-y-0 opacity-0"
          enter-to-class="transform scale-y-100 opacity-100"
          leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-y-100 opacity-100"
          leave-to-class="transform scale-y-0 opacity-0"
        >
          <DisclosurePanel>
            <ul class="flex absolute top-0 w-full bg-white shadow-xl rounded-b flex-col gap-1 text-sm pt-1 border" :class="theme.border">
              <li
                v-for="{slug, name} in category.children"
                :key="slug"
                :class="['px-3 py-1', theme.text]"
              >
                {{ name }}
              </li>
            </ul>
          </DisclosurePanel>
        </transition>
      </div>
    </Disclosure>
  </div>
</template>
