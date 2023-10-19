<script setup lang="ts">
import { useGeolocationStore } from '~/stores/geolocation'
import LocalityPicker from '~/Components/Forms/LocalityPicker.vue'

interface Props {
    label?: string;
    error?: string;
    prefix?: string;
}
const store = useGeolocationStore()
interface Emits {
    (event: 'update:locality', value?: string): void;
}

const { label, prefix } = defineProps<Props>()

const emit = defineEmits<Emits>()

const location = ref<string>(store.current?.slug as string)

const updateValue = (value: string) => {
  if (value) {
    store.setCurrent(value)
  } else {
    store.setCurrent(null)
  }
  location.value = value
  emit('update:locality', value)
}

</script>
<template>
  <LocalityPicker :label="label" :inline="true" :prefix="prefix" :model-value="location" @update:model-value="updateValue" />
</template>
