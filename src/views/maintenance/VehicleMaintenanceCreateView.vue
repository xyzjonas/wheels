<template>
  <main class="p-2 flex-1 flex flex-col">
    <maintenance-form v-model="newEntry" :last-odometer="lastOdo" @submit="submit" @cancel="goBack" />
  </main>
</template>

<script setup lang="ts">
import MaintenanceForm from '@/components/vehicle/MaintenanceForm.vue';
import { useVehicles } from '@/composables/vehicles';
import type { CreateMaintenanceEntry, FuelEntry, MaintenanceEntry } from '@/types';
import { useWindowScroll } from '@vueuse/core';
import { date } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const newEntry = ref<CreateMaintenanceEntry>({
  body: "",
  description: "",
  date: (new Date()).toISOString(),
  attachements: [],
  category: "maintenance",
  odometer: 0,
  price: 0,
})

const router = useRouter()
const vehicleId = computed(() => router.currentRoute.value.params.id as string);

const goBack = () => {
  router.push({ name: 'vehicle-home', params: { id: vehicleId.value } })
}

const { selectedVehicle, addMaintenanceEntry } = useVehicles()
const lastOdo = computed(() => (selectedVehicle.value?.expand?.fuel_entries ?? []).sort((a, b) => b.odometer - a.odometer)[0]?.odometer)

const { addFuelEntry } = useVehicles()

const submit = async (entry: any) => {
  try {
    await addMaintenanceEntry(vehicleId.value, entry)
    router.push({ name: 'vehicle-maintenance', params: { id: vehicleId.value } })
  } catch {}
}

const { y } = useWindowScroll()
onMounted(() => y.value = 0)

</script>

<style lang="scss" scoped>

</style>