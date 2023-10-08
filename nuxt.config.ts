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

      pages.push({
        name: 'post-type-provider-slug',
        path: '/:type(articles|features|guides)/:provider/:slug',
        file: '~/pages/posts/post.vue'
      })
    }
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
