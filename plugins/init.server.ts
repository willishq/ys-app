import fs from 'fs'
import path from 'path'
import { defineNuxtPlugin } from '#app/nuxt'
import { useCategories } from '~/stores/categories'
import { useGeolocationStore } from '~/stores/geolocation'

export default defineNuxtPlugin(async (app) => {
  const categoryStore = useCategories(app.$pinia)
  const geolocationStore = useGeolocationStore(app.$pinia)
  const cache = (file = '') => '../.nuxt/.cache' + file

  fs.existsSync(path.resolve(__dirname, cache())) || fs.mkdirSync(path.resolve(__dirname, cache()))

  const categoriesJson = path.resolve(__dirname, cache('/categories.json'))

  if (fs.existsSync(categoriesJson)) {
    categoryStore.fill(JSON.parse(fs.readFileSync(categoriesJson, 'utf-8')))
  } else {
    const categories = await categoryStore.fetch()
    fs.writeFileSync(categoriesJson, JSON.stringify(categories))
  }

  const localitiesJson = path.resolve(__dirname, cache('/localities.json'))

  if (fs.existsSync(localitiesJson)) {
    geolocationStore.fill(JSON.parse(fs.readFileSync(localitiesJson, 'utf-8')))
  } else {
    const localities = await geolocationStore.fetch()
    fs.writeFileSync(localitiesJson, JSON.stringify(localities))
  }
})
