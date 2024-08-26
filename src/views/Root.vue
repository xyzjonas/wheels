<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import { useVehicles } from '@/composables/vehicles';
import { useRouter } from 'vue-router';

const router = useRouter()
const { selectedVehicle } = useVehicles()
if (selectedVehicle.value) {
  router.push({ name: 'vehicle-home', params: { id: selectedVehicle.value.id } })
} else {
  router.push({ name: 'vehicles' })
}
</script>

<style scoped>

</style>