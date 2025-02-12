<template>
  <q-page v-if="maintenanceEntry" class="flex flex-col" padding>
    <maintenance-form v-model="maintenanceEntry" @cancel="toDetailView" @submit="submit" />
  </q-page>
</template>

<script setup lang="ts">
import { useRoutingGuard } from '@/composables/routing'
import { useVehicles } from '@/composables/vehicles'
import { computed } from 'vue'

import MaintenanceForm from '@/components/vehicle/MaintenanceForm.vue'
import type { MaintenanceEntry } from '@/types'
import { useRouter } from 'vue-router'

const { getMaintenanceItemOrRouteAway, maintenanceId } = useRoutingGuard()

getMaintenanceItemOrRouteAway()

const { selectedVehicle, selectedVehicleId, editMaintenanceEntry } = useVehicles()
const maintenanceEntry = computed(() => {
  return selectedVehicle.value?.expand?.maintenance_entries.find(
    (e) => e.id === maintenanceId.value
  ) as MaintenanceEntry
})

const router = useRouter()
const goBack = () => {
  router.push({ name: 'vehicle-maintenance-detail', params: { id: selectedVehicleId.value, maintenanceId: maintenanceId.value } })
}

const submit = async (entry: any) => {
  await editMaintenanceEntry(selectedVehicleId.value, maintenanceEntry.value.id, entry)
  goBack()
}

const toDetailView = () => {
  router.push({
    name: 'vehicle-maintenance-detail',
    params: { id: selectedVehicleId.value, maintenanceId: maintenanceEntry.value.id }
  })
}

</script>

<style lang="scss" scoped></style>
