<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon, ArrowRightOnRectangleIcon, WindowIcon } from '@heroicons/vue/24/outline'

const { isLoggedIn, user, logout } = useAuth()
</script>

<template>
  <nav
    class="sticky top-0 z-50 bg-gradient-to-r from-accent-400 to-accent-600 shadow-lg"
  >
    <header class="mb-1.5">
      <div class="relative bg-white">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
          <div class="flex md:w-0 md:flex-1 gap-4">
            <NuxtLink
              class="-my-3 flex items-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-500 p-2 px-6 text-2xl font-semibold text-white hover:bg-gradient-to-bl"
              :to="{name: 'providers'}"
            >
              FindSupport
            </NuxtLink>
            <NuxtLink
              class="text-neutral-400 hover:text-neutral-800 hover:underline"
              :to="{ name: 'index' }"
            >
              Home
            </NuxtLink>
          </div>
          <div class="md:text-auto text-right">
            <template v-if="!isLoggedIn">
              <NuxtLink
                class="text-neutral-400 hover:text-neutral-800 hover:underline mr-2"
                :to="{ name: 'providers-sign-in' }"
              >
                Sign In
              </NuxtLink>
              <NuxtLink
                class="font-semibold bg-accent-500 text-white hover:bg-accent-600 rounded-lg px-4 py-2 shadow hover:ring-2 hover:ring-offset-1 hover:ring-accent-500"
                :to="{ name: 'providers-create-account' }"
              >
                Create Account
              </NuxtLink>
            </template>
            <template v-else>
              <Menu as="div" class="relative inline-block text-left -my-2">
                <div>
                  <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-neutral-500 shadow-sm ring-1 ring-inset ring-neutral-300 hover:ring-accent-300 hover:text-accent-400">
                    {{ user.name }}
                    <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems class="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1 grid gap-0.5">
                      <MenuItem>
                        <NuxtLink
                          class="w-full px-4 py-2 text-sm text-left text-neutral-400 hover:text-accent-600 hover:underline hover:bg-accent-50 mr-2"
                          :to="{ name: 'dashboard' }"
                        >
                          <WindowIcon class="mr-2 w-4 h-4 inline-block" />
                          Dashboard
                        </NuxtLink>
                      </MenuItem>
                      <MenuItem>
                        <button class="w-full px-4 py-2 text-sm text-left text-neutral-400 hover:text-accent-600 hover:underline hover:bg-accent-50 mr-2" @click="logout">
                          <ArrowRightOnRectangleIcon class="mr-2 w-4 h-4 inline-block" />
                          Sign out
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </template>
          </div>
        </div>
      </div>
    </header>
  </nav>
</template>
