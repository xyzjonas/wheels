<template>
  <main v-if="maintenanceEntry" class="p-2 flex-1 flex flex-col">
    <maintenance-form v-model="maintenanceEntry" @cancel="goBack" @submit="submit" />
  </main>
</template>

<script setup lang="ts">
import { useRoutingGuard } from '@/composables/routing'
import { useVehicles } from '@/composables/vehicles'
import { computed } from 'vue'

import RefuelForm from '@/components/vehicle/RefuelForm.vue'
import MaintenanceForm from '@/components/vehicle/MaintenanceForm.vue'
import type { MaintenanceEntry } from '@/types'
import { useRouter } from 'vue-router'

const { getMaintenanceItemOrRouteAway, maintenanceId } = useRoutingGuard()
console.info("fooo")
getMaintenanceItemOrRouteAway()

const { selectedVehicle, selectedVehicleId, editMaintenanceEntry } = useVehicles()
const maintenanceEntry = computed(() => {
  return selectedVehicle.value?.expand?.maintenance_entries.find(
    (e) => e.id === maintenanceId.value
  ) as MaintenanceEntry
})

const date = computed(() =>
  new Date(maintenanceEntry.value.date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
)

const router = useRouter()
const goBack = () => {
  router.push({ name: 'vehicle-maintenance-detail', params: { id: selectedVehicleId.value, maintenanceId: maintenanceId.value } })
}

const submit = async (entry: any) => {
  await editMaintenanceEntry(selectedVehicleId.value, maintenanceEntry.value.id, entry)
  goBack()
}

const toEditView = (refuelItemId: string) => {
  router.push({
    name: 'vehicle-refuel-edit',
    params: { id: selectedVehicleId.value, refuelId: refuelItemId }
  })
}

</script>

<style lang="scss" scoped></style>
