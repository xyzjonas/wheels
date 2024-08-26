<template>
  <main v-if="selectedVehicle" class="p-2 scroll-block">

    <card class="bg-primary text-secondary p-5 mb-5">
      <div class="text-[4rem] uppercase font-500 tracking-tighter">Fuel Report</div>
      <div class="text-white text-lg uppercase">{{selectedVehicle.name}}</div>
      <div>{{ selectedVehicle.model }}</div>
    </card>

    <fuel-table :entries="fuelEntries" @add-entry="toNewEntry" @to-edit="toEditView"/>

  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useVehicles } from '@/composables/vehicles'
import { useQuasar } from 'quasar'
import { computed } from 'vue'

import Card from '@/components/Card.vue'
import FuelTable from '@/components/vehicle/FuelTable.vue'
import type { FuelEntry } from '@/types'

const router = useRouter()

const { selectedVehicle, selectedVehicleId, fetch } = useVehicles()

selectedVehicleId.value = router.currentRoute.value.params.id as string

await fetch()

if (!selectedVehicle.value) {
  selectedVehicleId.value = ''
  router.push({ name: 'vehicles' })
} else if (!router.currentRoute.value.params.id) {
  router.push({ name: 'vehicle-home', params: { id: selectedVehicle.value.id } })
}

const $q = useQuasar()
// const layout = computed(() => {
//   return $q.screen.lt.sm ? 'dense' : $q.screen.lt.md ? 'comfortable' : 'loose'
// })

const toNewEntry = () => {
  router.push({ name: 'vehicle-refuel', params: { id: selectedVehicleId.value } })
}

const toEditView = (refuelItemId: string) => {
  router.push({ name: 'vehicle-refuel-edit', params: { id: selectedVehicleId.value, refuelId: refuelItemId } })
}

const fuelEntries = computed<FuelEntry[]>(() => selectedVehicle.value?.expand?.fuel_entries ?? [])

</script>
