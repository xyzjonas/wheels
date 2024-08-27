<template>
  <main v-if="selectedVehicle" class="p-2 flex-1 flex flex-col">
    <hero-card title="Edit Vehicle" class="mb-5">
      <div class="text-white text-lg uppercase">{{selectedVehicle.name}}</div>
      <div>{{ selectedVehicle.model }}</div>
    </hero-card>
    <vehicle-form v-model="vehicle" @submit="submit" @cancel="goBack" @upload-icon="uploadIcon" class="flex-1"/>
  </main>
</template>

<script setup lang="ts">
import VehicleForm from '@/components/vehicle/VehicleForm.vue';
import { useVehicles } from '@/composables/vehicles';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import HeroCard from '@/components/HeroCard.vue';
import { computed } from '@vue/reactivity';
import type { Vehicle } from '@/types';

const { selectedVehicle, editVehicle, uploadThumbnail } = useVehicles()

const router = useRouter()
if (!selectedVehicle.value) {
  router.push({ name: 'vehicles' })
}

const vehicle = ref<Vehicle>(JSON.parse(JSON.stringify(selectedVehicle.value)))
const vehicleId = computed(() => router.currentRoute.value.params.id as string);

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

<style lang="css" scoped>
.foo {
  height: 100%;
  width: 100%;
}
</style>