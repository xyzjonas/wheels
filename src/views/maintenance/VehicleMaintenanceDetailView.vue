<template>
  <q-page v-if="maintenanceEntry" class="flex flex-col" padding>
    <maintenance-form v-model="maintenanceEntry" readonly @cancel="goBack" @to-edit="toEditView" />
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

const { selectedVehicle, selectedVehicleId } = useVehicles()
const maintenanceEntry = computed(() => {
  return selectedVehicle.value?.expand?.maintenance_entries.find(
    (e) => e.id === maintenanceId.value
  ) as MaintenanceEntry
})

const router = useRouter()
const goBack = () => {
  router.push({ name: 'vehicle-maintenance', params: { id: selectedVehicleId.value } })
}

const toEditView = () => {
  router.push({
    name: 'vehicle-maintenance-edit',
    params: { id: selectedVehicleId.value, maintenanceId: maintenanceId.value }
  })
}

</script>

<style lang="scss" scoped></style>
