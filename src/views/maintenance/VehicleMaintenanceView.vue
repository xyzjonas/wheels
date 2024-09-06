<template>
  <main v-if="selectedVehicle" class="p-2 scroll-block max-w-[100%] overflow-hidden">
    <hero-card title="vehicle upkeep">
      <div class="text-white text-lg uppercase">{{ selectedVehicle.name }}</div>
      <div>{{ selectedVehicle.model }}</div>
    </hero-card>

    <div class="flex w-full gap-2 items-stretch flex-wrap my-3">
      <vehicle-value-card
        title="paid for Maintenance"
        :value="maintenanceSum"
        :unit="settings.currency.name"
        icon="i-hugeicons-dollar-01"
        class="top-card"
      />
      <vehicle-value-card
        title="paid for repairs"
        :value="repairSum"
        :unit="settings.currency.name"
        icon="i-hugeicons-coins-dollar"
        class="top-card"
      />
    </div>

    <maintanence-table
      :entries="entries"
      class=""
      @to-detail="toDetail"
      @add-entry="toCreate"
    />
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useVehicles } from '@/composables/vehicles'

import HeroCard from '@/components/HeroCard.vue'
import MaintanenceTable from '@/components/vehicle/MaintanenceTable.vue'
import VehicleValueCard from '@/components/vehicle/cards/VehicleValueCard.vue'
import { computed } from 'vue'
import type { MaintenanceEntry } from '@/types'

const router = useRouter()

const { selectedVehicle, selectedVehicleId, settings, fetch } = useVehicles()

selectedVehicleId.value = router.currentRoute.value.params.id as string

await fetch()

if (!selectedVehicle.value) {
  selectedVehicleId.value = ''
  router.push({ name: 'vehicles' })
} else if (!router.currentRoute.value.params.id) {
  router.push({ name: 'vehicle-home', params: { id: selectedVehicle.value.id } })
}

const entries = computed(() => selectedVehicle?.value?.expand?.maintenance_entries ?? [])

const sum = (entries: MaintenanceEntry[]) => {
  return entries.reduce((prev: number, current: MaintenanceEntry) => prev + current.price, 0)
}

const maintenanceEntries = computed(() => entries.value.filter(e => e.category !== "service"))
const repairEntries = computed(() => entries.value.filter(e => e.category === "service"))

const maintenanceSum = computed(() => sum(maintenanceEntries.value))
const repairSum = computed(() => sum(repairEntries.value))

const toDetail = (id: string) =>
  router.push({
    name: 'vehicle-maintenance-detail',
    params: {
      id: selectedVehicleId.value,
      maintenanceId: id
    }
  })

const toCreate = () =>
  router.push({
    name: 'vehicle-maintenance-create',
    params: {
      id: selectedVehicleId.value
    }
  })
</script>

<style lang="css" scoped>
.top-card {
  flex: 1;
  min-width: 10rem; /** enough space for 2 decimal precision */
}
</style>