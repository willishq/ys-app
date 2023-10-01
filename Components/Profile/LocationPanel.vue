<script setup lang="ts">

import * as gl from 'mapbox-gl'
import PagePanel from '~/Components/PagePanel.vue'
import LocationItem from '~/Components/Profile/LocationItem.vue'
import LocationMarker from '~/Components/Maps/LocationMarker.vue'

interface Props {
  places: Place[];
  theme: ColourTheme;
}

const { places, theme } = defineProps<Props>()

const activeLocationId = ref<string | null>(null)
const pendingMarkerLeave = ref<string | null>(null)

const bounds: gl.LngLatBounds = new gl.LngLatBounds()
useMapbox('places-map', (map) => {
  places.forEach((place) => {
    if (place?.point) {
      bounds.extend(place.point)
    }
  })

  map.fitBounds(bounds, {
    maxZoom: 12,
    animate: false
  })
})

const markerEnter = (id: string) => {
  activeLocationId.value = id
  pendingMarkerLeave.value = null
}
const markerLeave = (id: string) => {
  pendingMarkerLeave.value = id
  setTimeout(() => {
    if (pendingMarkerLeave.value === id) {
      activeLocationId.value = null
      pendingMarkerLeave.value = null
    }
  }, 500)
}

</script>

<template>
  <PagePanel :theme="theme" title="Locations">
    <div class="mt-3 p3 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <ul class="col-span-2 flex flex-col gap-3 max-h-[50rem] overflow-auto">
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
          @mouseenter="activeLocationId = place.id"
          @mouseleave="activeLocationId = null"
        />
      </ul>

      <div class="col-span-3 bg-secondary-500 aspect-square relative">
        <MapboxMap
          map-id="places-map"
          :options="{
            style: 'mapbox://styles/mapbox/streets-v12',
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
        >
          <template v-for="place in places">
            <LocationMarker
              v-if="place?.point"
              :key="place.id"
              :marker-id="`marker-${place.id}`"
              :point="place.point"
              :active="activeLocationId === place.id"
              @mouseenter="markerEnter(place.id)"
              @mouseleave="markerLeave(place.id)"
            />
          </template>
        </MapboxMap>
      </div>
    </div>
  </PagePanel>
</template>
