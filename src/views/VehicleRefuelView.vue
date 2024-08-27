<template>
  <div ref="page">
    <refuel-form v-model="newEntry" :last-odometer="lastOdo" @submit="submit" @cancel="goBack"></refuel-form>
  </div>
</template>

<script setup lang="ts">
import RefuelForm from '@/components/vehicle/RefuelForm.vue';
import { useVehicles } from '@/composables/vehicles';
import type { FuelEntry } from '@/types';
import { useWindowScroll } from '@vueuse/core';
import { date } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const newEntry = ref<Partial<FuelEntry>>({
  full_tank: true,
  reset: false,
  refueled: date.formatDate(new Date(), "YYYY/MM/DD"),
})

const router = useRouter()
const vehicleId = computed(() => router.currentRoute.value.params.id as string);

const goBack = () => {
  router.push({ name: 'vehicle-home', params: { id: vehicleId.value } })
}

const { selectedVehicle } = useVehicles()
const lastOdo = computed(() => (selectedVehicle.value?.expand?.fuel_entries ?? []).sort((a, b) => b.odometer - a.odometer)[0]?.odometer)

const { addFuelEntry } = useVehicles()

const submit = async (entry: any) => {
  try {
    await addFuelEntry(vehicleId.value, entry)
    router.push({ name: 'vehicle-home', params: { id: vehicleId.value } })
  } catch {}
}

const { y } = useWindowScroll()
onMounted(() => y.value = 0)

</script>

<style lang="scss" scoped>

</style>