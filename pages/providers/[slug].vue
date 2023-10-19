<script setup lang="ts">

import { getProvider } from '~/utils/asyncApi'

const route = useRoute()

const provider = await getProvider(route.params.slug)
</script>

<template>
  <div>
    {{ provider.title }}
  </div>
</template>
