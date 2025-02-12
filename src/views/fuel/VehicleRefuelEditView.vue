<template>
  <q-page v-if="fuelEntry" class="flex flex-col" padding>
    <refuel-form
      v-if="fuelEntry"
      v-model="fuelEntry"
      @submit="submit"
      @cancel="toDetailView"
    ></refuel-form>
  </q-page>
</template>

<script setup lang="ts">
import RefuelForm from '@/components/vehicle/RefuelForm.vue'
import { useRoutingGuard } from '@/composables/routing'
import { useVehicles } from '@/composables/vehicles'
import type { FuelEntry } from '@/types'
import { useWindowScroll } from '@vueuse/core'
import { date } from 'quasar'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const { getRefuelItemOrRouteAway, vehicleId, refuleItemId } = useRoutingGuard()
getRefuelItemOrRouteAway()

const newEntry = ref<Partial<FuelEntry>>({
  full_tank: true,
  reset: false,
  refueled: date.formatDate(new Date(), 'YYYY/MM/DD')
})

const router = useRouter()
const { fetchFuelEntry, editFuelEntry } = useVehicles()

const fuelEntry = ref<FuelEntry>()
try {
  fuelEntry.value = await fetchFuelEntry(refuleItemId.value)
  if (fuelEntry.value) {
    fuelEntry.value.refueled = date.formatDate(fuelEntry.value.refueled, 'YYYY/MM/DD')
  }
} catch(err) {
  console.error(err)
}

const { selectedVehicleId } = useVehicles()

const toDetailView = () => {
  router.push({
    name: 'vehicle-fuel-detail',
    params: { id: selectedVehicleId.value, refuelId: fuelEntry.value?.id }
  })
}

const submit = async (entry: any) => {
  try {
    await editFuelEntry(vehicleId.value, refuleItemId.value, entry)
    router.push({ name: 'vehicle-home', params: { id: vehicleId.value } })
  } catch {}
}

const { y } = useWindowScroll()
onMounted(() => y.value = 0)
</script>

<style lang="scss" scoped></style>
