<script setup lang="ts">
import {
  IdentificationIcon,
  HomeIcon,
  RectangleGroupIcon,
  BuildingOfficeIcon,
  LinkIcon,
  NewspaperIcon,
  ClipboardDocumentCheckIcon,
  PlusIcon,
  PencilSquareIcon,
  ChevronUpDownIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, ListboxLabel } from '@headlessui/vue'

const navigation = [
  { name: 'Dashboard', routeName: 'dashboard', icon: HomeIcon, buttonType: 'none' },

  { name: 'Company Profile', routeName: 'dashboard-profile', icon: IdentificationIcon, buttonType: 'edit' },
  { name: 'Categories', routeName: 'dashboard-categories', icon: RectangleGroupIcon, buttonType: 'edit' },
  { name: 'Links', routeName: 'dashboard-links', icon: LinkIcon, buttonType: 'edit' },

  { name: 'Services', routeName: 'dashboard-services', icon: ClipboardDocumentCheckIcon, buttonType: 'add' },
  { name: 'Locations', routeName: 'dashboard-locations', icon: BuildingOfficeIcon, buttonType: 'add' },
  { name: 'Posts', routeName: 'dashboard-posts', icon: NewspaperIcon, buttonType: 'add' }
]

const { currentProvider, userProviders, setCurrent } = await useCurrentProvider()
const isCurrentRoute = (routeName: string) => {
  return routeName === useRoute().name || `${routeName}-create` === useRoute().name
}

const changeCurrentProvider = (id: string) => {
  setCurrent(id)
  useRouter().push({
    name: 'dashboard',
    force: true
  })
}

</script>

<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-600 px-6 pb-2 lg:pb-0">
    <div class="flex h-16 shrink-0 items-center">
      <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company">
    </div>
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="-mx-2 space-y-1">
            <li v-for="item in navigation" :key="item.name">
              <div :class="[isCurrentRoute(item.routeName) ? 'bg-primary-700 text-white' : 'text-primary-200 hover:text-white hover:bg-primary-700', 'group flex gap-3 justify-between items-center rounded-md text-sm leading-6 font-semibold']">
                <NuxtLink :to="{name: item.routeName}" class="flex gap-x-3 flex-grow p-2">
                  <component :is="item.icon" :class="[isCurrentRoute(item.routeName) ? 'text-white' : 'text-primary-200 group-hover:text-white', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                  {{ item.name }}
                </NuxtLink>
                <NuxtLink
                  v-if="item.buttonType === 'add'"
                  :to="{
                    name: `${item.routeName}-create`,
                  }"
                  class="hidden p-2 mr-0.5 h-full rounded-md text-white border border-primary-700 hover:border-white group-hover:block"
                >
                  <PlusIcon class="h-5 w-5" aria-hidden="true" />
                </NuxtLink>
                <NuxtLink
                  v-if="item.buttonType === 'edit'"
                  :to="{
                    name: `${item.routeName}-edit`,
                  }"
                  class="hidden p-2 mr-0.5 h-full rounded-md text-white border border-primary-700 hover:border-white group-hover:block"
                >
                  <PencilSquareIcon class="h-5 w-5" aria-hidden="true" />
                </NuxtLink>
              </div>
            </li>
          </ul>
        </li>

        <li class="-mx-6 mt-auto hidden lg:block">
          <ul>
            <li v-if="currentProvider">
              <Listbox
                v-if="userProviders.length > 1"
                as="div"
                class="p-2 border-y border-primary-700"
                :default-value="currentProvider.id"
                @update:model-value="(id) => changeCurrentProvider(id)"
              >
                <ListboxLabel class="block text-xs font-medium leading-6 text-primary-200">
                  Change Provider:
                </ListboxLabel>

                <ListboxButton class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6">
                  <span class="block truncate">{{ currentProvider.title }}</span>
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-neutral-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <div class="relative mt-2">
                  <ListboxOptions class="absolute z-10 bottom-12 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <template v-for="{title, id} in userProviders" :key="id">
                      <ListboxOption
                        v-slot="{ active, selected }"
                        as="template"
                        :value="id"
                      >
                        <li :class="[active ? 'bg-primary-600 text-white' : 'text-neutral-900', 'relative cursor-default select-none py-2 pl-8 pr-4']">
                          <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                            {{ title }}
                          </span>
                          <span v-if="selected" :class="[active ? 'text-white' : 'text-primary-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                          </span>
                        </li>
                      </ListboxOption>
                    </template>
                    <li class="group text-neutral-900 font-normal relative cursor-default select-none py-2 pl-8 pr-4 hover:bg-primary-600 hover:text-white">
                      <NuxtLink :to="{name: 'providers-create-account'}" class="flex items-center gap-1.5 w-full">
                        <span class="hidden group-hover:flex absolute inset-y-0 left-0 items-center pl-1.5">
                          <PlusIcon class=":inline-block h-5 w-5" aria-hidden="true" />
                        </span>
                        <span>
                          Create New Provider
                        </span>
                      </NuxtLink>
                    </li>
                  </ListboxOptions>
                </div>
              </Listbox>
              <div v-else class="border-y border-primary-700 text-white">
                {{ currentProvider.title }}
              </div>
            </li>
            <li>
              <a href="#" class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-primary-700">
                <img class="h-8 w-8 rounded-full bg-primary-700" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                <span class="sr-only">Your profile</span>
                <span aria-hidden="true">Tom Cook</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>
