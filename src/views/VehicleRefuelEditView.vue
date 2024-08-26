<template>
  <div>
    <refuel-form
      v-if="fuelEntry"
      v-model="fuelEntry"
      @submit="submit"
      @cancel="goBack"
    ></refuel-form>
    <div v-else>NO SUCH ENTRY!</div>
  </div>
</template>

<script setup lang="ts">
import RefuelForm from '@/components/vehicle/RefuelForm.vue'
import { useVehicles } from '@/composables/vehicles'
import type { FuelEntry } from '@/types'
import { useWindowScroll } from '@vueuse/core'
import { date } from 'quasar'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const newEntry = ref<Partial<FuelEntry>>({
  full_tank: true,
  reset: false,
  refueled: date.formatDate(new Date(), 'YYYY/MM/DD')
})

const { fetchFuelEntry, editFuelEntry } = useVehicles()

const router = useRouter()
const vehicleId = router.currentRoute.value.params.id as string
const refuleItemId = router.currentRoute.value.params.refuelId as string

const fuelEntry = ref<FuelEntry>()
try {
  fuelEntry.value = await fetchFuelEntry(refuleItemId)
  if (fuelEntry.value) {
    fuelEntry.value.refueled = date.formatDate(fuelEntry.value.refueled, 'YYYY/MM/DD')
  }
} catch {}



const goBack = () => {
  router.push({ name: 'vehicle-home', params: { id: vehicleId } })
}

const submit = async (entry: any) => {
  try {
    await editFuelEntry(vehicleId, refuleItemId, entry)
    router.push({ name: 'vehicle-home', params: { id: vehicleId } })
  } catch {}
}

const { y } = useWindowScroll()
onMounted(() => y.value = 0)
</script>

<style lang="scss" scoped></style>
