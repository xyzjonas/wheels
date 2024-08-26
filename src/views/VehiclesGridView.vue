<script setup lang="ts">
import { useVehicles } from "@/composables/vehicles"

import VehiclesList from "@/components/VehiclesList.vue";

const { fetch } = useVehicles()

console.info("LOAD")
await fetch();
</script>

<template> 
  <main class="p-2 scroll-block">
    <vehicles-list />
  </main>
</template>
