<script setup lang="ts">
import { useVehicles } from "@/composables/vehicles"
import { onMounted } from "vue";

import VehiclesList from "@/components/VehiclesList.vue";

const { vehicles, fetch } = useVehicles()

onMounted(() => fetch())
</script>

<template> 
  <main class="p-2 scroll-block">
    <vehicles-list />
  </main>
</template>
