<script setup lang="ts">
import { useRouter } from "vue-router";
import { useVehicles } from "@/composables/vehicles"

const router = useRouter();

const { selectedVehicle, selectedVehicleId, fetch } = useVehicles()

await fetch();


if (!selectedVehicle.value) {
  selectedVehicleId.value = "";
  router.push({ name: 'vehicles' })
} else if (!router.currentRoute.value.params.id) {
  router.push({ name: 'vehicle-home', params: { id: selectedVehicle.value.id } })
}

</script>

<template> 
  <main class="p-2 scroll-block">
    <h1>MAINTENANCE</h1>
  </main>
</template>
