<script setup lang="ts">

import * as gl from 'mapbox-gl'
import PagePanel from '~/Components/PagePanel.vue'
import { hash } from '~/utils/profileHelpers'
import LocationItem from '~/Components/Profile/LocationItem.vue'

interface Props {
    places: Place[];
    theme: ColourTheme;
}

const { places, theme } = defineProps<Props>()

const markers = ref<{ marker: gl.Marker, id: string }[]>([])

useMapbox('places-map', (map) => {
  const w = document.createElement('div')
  w.innerHTML = '<svg class="w-16 h-16 fill-white stroke-primary-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"/></svg>'
  w.classList.add('z-10', 'text-primary-500')
  const bounds: gl.LngLatBounds = new gl.LngLatBounds()
  places.forEach((place) => {
    if (place.point) {
      const m = new gl.Marker(w, {
        anchor: 'bottom'
      })
      bounds.extend(place.point)

      m.setLngLat(place.point)
      m.addTo(map)
      markers.value.push({
        marker: m,
        id: place.id
      })
    }
  })

  map.fitBounds(bounds, {
    maxZoom: 12,
    animate: false
  })
})</script>

<template>
  <PagePanel :theme="theme" title="Locations">
    <div class="mt-3 p3 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <div class="col-span-2">
        <LocationItem
          v-for="place in places"
          :key="hash(place.name)"
          :name="place.name"
          :address="place.address"
          :locality="place.locality"
          :country="place.country"
          :postcode="place.postcode"
          :theme="theme"
        />
      </div>

      <div class="col-span-3 aspect-square bg-secondary-500 relative">
        <MapboxMap
          map-id="places-map"
          :options="{
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            zoom: 12,
            dragPan: false,
            dragRotate: false,
            touchZoomRotate: false,
            boxZoom: false,
            scrollZoom: false,
            doubleClickZoom: false,
          }"

          :style="{
            height: `100%`
          }"
        />
      </div>
    </div>
  </PagePanel>
</template>
