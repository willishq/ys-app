<script setup lang="ts">

import * as gl from 'mapbox-gl'
import PagePanel from '~/Components/PagePanel.vue'
import { getMapMarker } from '~/utils/profileHelpers'
import LocationItem from '~/Components/Profile/LocationItem.vue'

interface Props {
  places: Place[];
  theme: ColourTheme;
}

const { places, theme } = defineProps<Props>()

const markers = ref<{ marker: gl.Marker, id: string }[]>([])
const activeLocationId = ref<string | null>(null)

let leaveTimeout

const bounds: gl.LngLatBounds = new gl.LngLatBounds()
useMapbox('places-map', (map) => {
  places.forEach((place) => {
    if (place.point) {
      const m = new gl.Marker(getMapMarker('text-primary-500') as HTMLElement, {
        anchor: 'bottom'
      })
      bounds.extend(place.point)

      m.setLngLat(place.point)
      m.addTo(map)
      markers.value.push({
        marker: m,
        id: place.id
      })

      m.getElement()?.addEventListener('click', () => {
        leaveTimeout && clearTimeout(leaveTimeout)
        activeLocationId.value = place.id
        const leaveListener = () => {
          m.getElement()?.removeEventListener('mouseleave', leaveListener)
          leaveTimeout = setTimeout(() => {
            activeLocationId.value = null
          }, 1000)
        }
        m.getElement()?.addEventListener('mouseleave', leaveListener)
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
      <div class="col-span-2 flex flex-col gap-3">
        <LocationItem
          v-for="place in places"
          :key="place.id"
          :name="place.name"
          :address="place.address"
          :locality="place.locality"
          :country="place.country"
          :postcode="place.postcode"
          :theme="theme"
          :active="activeLocationId === place.id"
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
