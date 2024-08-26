<script setup lang="ts">
import { useVehicles } from "@/composables/vehicles"

import VehiclesList from "@/components/VehiclesList.vue";

const { fetch } = useVehicles()

const refresh = (done: () => void) => {
  fetch().finally(() => {
    setTimeout(done, 500)
  })
}

</script>

<template> 
  <!-- <main class="p-2 scroll-block"> -->
    <q-pull-to-refresh @refresh="refresh">
    <vehicles-list />
  </q-pull-to-refresh>
  <!-- </main> -->
</template>
