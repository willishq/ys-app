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
    accessToken: process.env.MAPBOX_TOKEN || ''
  },

  runtimeConfig: {
    public: {
      backendUrl: process.env.API_URL || '',
      frontendUrl: process.env.APP_URL || ''
    }
  },

  imports: {
    dirs: ['./stores', './utils']
  },

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  },

  devtools: {
    enabled: process.env.APP_ENV === 'local'
  }
})
