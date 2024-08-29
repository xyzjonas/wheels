<template>
  <main v-if="refuelItem" class="p-2 flex-1 flex flex-col">
    <refuel-form v-model="refuelItem" readonly @toEdit="toEditView" @cancel="goBack"/>
  </main>
</template>

<script setup lang="ts">
import { useRoutingGuard } from '@/composables/routing'
import { useVehicles } from '@/composables/vehicles'
import { computed } from 'vue'

import RefuelForm from '@/components/vehicle/RefuelForm.vue'
import type { FuelEntry } from '@/types'
import { useRouter } from 'vue-router'

const { getRefuelItemOrRouteAway, refuleItemId } = useRoutingGuard()
getRefuelItemOrRouteAway()

const { selectedVehicle, selectedVehicleId } = useVehicles()
const refuelItem = computed(() => {
  return selectedVehicle.value?.expand?.fuel_entries.find(
    (e) => e.id === refuleItemId.value
  ) as FuelEntry
})

const date = computed(() =>
  new Date(refuelItem.value.refueled).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
)

const router = useRouter()
const goBack = () => {
  router.push({ name: 'vehicle-fuel', params: { id: selectedVehicleId.value } })
}

const toEditView = (refuelItemId: string) => {
  router.push({
    name: 'vehicle-refuel-edit',
    params: { id: selectedVehicleId.value, refuelId: refuelItemId }
  })
}

</script>

<style lang="scss" scoped></style>
