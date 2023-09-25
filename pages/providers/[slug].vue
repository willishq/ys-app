<script setup lang="ts">

import { getOrganisation } from '~/utils/asyncApi'

const route = useRoute()

const organisation = await getOrganisation(route.params.slug)
</script>

<template>
  <div>
    {{ organisation.title }}
  </div>
</template>
