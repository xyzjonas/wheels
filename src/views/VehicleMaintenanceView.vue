<template> 
  <main v-if="selectedVehicle" class="p-2 scroll-block max-w-[100%] overflow-hidden">
    <hero-card title="vehicle upkeep">
      <div class="text-white text-lg uppercase">{{ selectedVehicle.name }}</div>
      <div>{{ selectedVehicle.model }}</div>
    </hero-card>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useVehicles } from "@/composables/vehicles"

import HeroCard from "@/components/HeroCard.vue";

const router = useRouter();

const { selectedVehicle, selectedVehicleId, fetch } = useVehicles()

selectedVehicleId.value = router.currentRoute.value.params.id as string

await fetch();


if (!selectedVehicle.value) {
  selectedVehicleId.value = "";
  router.push({ name: 'vehicles' })
} else if (!router.currentRoute.value.params.id) {
  router.push({ name: 'vehicle-home', params: { id: selectedVehicle.value.id } })
}

</script>

