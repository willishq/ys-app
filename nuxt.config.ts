// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    ['@nuxtjs/eslint-module', {
      fix: true
    }],
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-mapbox'

  ],
  mapbox: {
    accessToken: 'pk.eyJ1Ijoid2lsbGlzaHEiLCJhIjoiY2xtbmg1YzhzMHd6YjJrbDhkd2QxZDBjayJ9.Jz6IA_8CupTGYlQ_4B1ssw'
  },
  hooks: {
    'pages:extend' (pages) {
      pages.push({
        name: 'directory-category-in-locality',
        path: '/directory/:category-in-:locality',
        file: '~/pages/directory/[category]/index.vue'
      })

      pages.push({
        name: 'directory-category-in-locality-type',
        path: '/directory/:category-in-:locality/:type',
        file: '~/pages/directory/[category]/[type].vue'
      })
    }
  },

  runtimeConfig: {
    public: {
      backendUrl: 'http://localhost/api',
      frontendUrl: 'http://localhost:3000'
    }
  },

  imports: {
    dirs: ['./stores', './utils']
  },

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  },

  devtools: {
    enabled: true
  }
})
