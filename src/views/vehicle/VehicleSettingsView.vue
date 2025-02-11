<template>
  <main v-if="selectedVehicle" class="flex-1 flex flex-col my-3">
    <VehicleForm
      v-model="vehicle"
      @submit="submit"
      @cancel="goBack"
      @upload-icon="uploadIcon"
      class="flex-1"
    />
  </main>
</template>

<script setup lang="ts">
import VehicleForm from '@/components/vehicle/VehicleForm.vue'
import { useVehicles } from '@/composables/vehicles'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import type { Vehicle } from '@/types'
import { date } from 'quasar'
import { computed } from 'vue'

const { selectedVehicle, editVehicle, uploadThumbnail } = useVehicles()

const router = useRouter()
if (!selectedVehicle.value) {
  router.push({ name: 'vehicles' })
}

const vehicle = ref<Vehicle>(JSON.parse(JSON.stringify(selectedVehicle.value)))
if (vehicle.value.purchased) {
  vehicle.value.purchased = date.formatDate(vehicle.value.purchased, 'YYYY-MM-DD')
}

const vehicleId = computed(() => router.currentRoute.value.params.id as string)

const submit = async (entry: any) => {
  try {
    await editVehicle(vehicleId.value, entry)
    router.push({ name: 'vehicle-home', params: { id: vehicleId.value } })
  } catch {}
}

const uploadIcon = async (iconFile: any) => {
  console.info(iconFile)
  await uploadThumbnail(vehicleId.value, iconFile)
  vehicle.value = JSON.parse(JSON.stringify(selectedVehicle.value))
}

const goBack = () => {
  router.push({ name: 'vehicle-home', params: { id: vehicleId.value } })
}
</script>
