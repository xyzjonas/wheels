<template>
  <div>
    <refuel-form v-model="newEntry" @submit="submit" @cancel="goBack"></refuel-form>
  </div>
</template>

<script setup lang="ts">
import RefuelForm from '@/components/vehicle/RefuelForm.vue';
import { useVehicles } from '@/composables/vehicles';
import type { FuelEntry } from '@/types';
import { date } from 'quasar';
import { computed, ref } from 'vue';
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

const { addFuelEntry } = useVehicles()

const submit = async (entry: any) => {
  try {
    await addFuelEntry(vehicleId.value, entry)
    router.push({ name: 'vehicle-home', params: { id: vehicleId.value } })
  } catch {}
}

</script>

<style lang="scss" scoped>

</style>