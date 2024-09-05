<template> 
  <main v-if="selectedVehicle" class="p-2 scroll-block max-w-[100%] overflow-hidden">
    <hero-card title="Cost Calculator">
      <div class="text-white text-lg uppercase">{{ selectedVehicle.name }}</div>
      <div>{{ selectedVehicle.model }}</div>
    </hero-card>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useVehicles } from "@/composables/vehicles"

import HeroCard from "@/components/HeroCard.vue";
import { useRoutingGuard } from "@/composables/routing";

const router = useRouter();
const { getVehicleOrRouteAway } = useRoutingGuard()

getVehicleOrRouteAway()

const { selectedVehicle, selectedVehicleId, fetch } = useVehicles()

selectedVehicleId.value = router.currentRoute.value.params.id as string

await fetch();

</script>

