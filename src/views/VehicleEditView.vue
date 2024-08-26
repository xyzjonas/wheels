<template>
  <vehicle-form v-model="vehicle"/>
</template>

<script setup lang="ts">
import VehicleForm from '@/components/vehicle/VehicleForm.vue';
import { useVehicles } from '@/composables/vehicles';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { selectedVehicle } = useVehicles()

const router = useRouter()
if (!selectedVehicle.value) {
  router.push({ name: 'vehicles' })
}

const vehicle = ref(JSON.parse(JSON.stringify(selectedVehicle.value)))
</script>

<style lang="scss" scoped>

</style>