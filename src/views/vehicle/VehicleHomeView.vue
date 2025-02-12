<template>
  <main v-if="selectedVehicle">
    <card class="my-3">
      <fuel-table
        :entries="sorted"
        summary
        @to-fuel-view="router.push({ name: 'vehicle-fuel', params: { id: selectedVehicle.id } })"
      ></fuel-table>
    </card>

    <div class="home-grid">
      <vehicle-avg-consumption-card title="last average" :entries="[latestEntry]" />
      <vehicle-value-card
        :title="`Last Price per ${settings.units.vol.short}`"
        :value="latestEntry?.price_per_unit ?? 'N/A'"
        :unit="settings.currency.name"
        icon="sell"
        class="top-card"
      />
      <vehicle-avg-consumption-card title="year average" :entries="thisYear" />

      <vehicle-value-card
        :title="`avg cost per ${settings.units.dist.short} (${new Date().getUTCFullYear()})`"
        :value="avgCostPerDistanceYear"
        :unit="settings.currency.name"
        icon="sell"
        class="top-card"
      />

      <vehicle-refuel-button-card
        class="card py-10"
        @click="router.push({ name: 'vehicle-refuel' })"
      />

      <vehicle-maintenance-card :vehicle="selectedVehicle" class="card min-w-xs max-h-[16rem]" />

      <vehicle-value-card
        title="driven since purchase"
        :subtitle="`Owned since ${ownedSince}`"
        :value="drivenTotal"
        icon="speedometer"
        :unit="settings.units.dist.long"
      />

      <vehilce-insurance-card :vehicle="selectedVehicle" class="card" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useVehicles } from '@/composables/vehicles'
import { useRouter } from 'vue-router'

import Card from '@/components/Card.vue'
import VehicleAvgConsumptionCard from '@/components/vehicle/cards/VehicleAvgConsumptionCard.vue'
import VehicleMaintenanceCard from '@/components/vehicle/cards/VehicleMaintenanceCard.vue'
import VehicleRefuelButtonCard from '@/components/vehicle/cards/VehicleRefuelButtonCard.vue'
import VehicleValueCard from '@/components/vehicle/cards/VehicleValueCard.vue'
import VehilceInsuranceCard from '@/components/vehicle/cards/VehilceInsuranceCard.vue'

import FuelTable from '@/components/vehicle/FuelTable.vue'
import { useVehicleCalculations } from '@/composables/vehicle'
import { computed } from 'vue'

const router = useRouter()

const { selectedVehicle, selectedVehicleId, settings } = useVehicles()

selectedVehicleId.value = router.currentRoute.value.params.id as string

if (!selectedVehicle.value) {
  selectedVehicleId.value = ''
  router.push({ name: 'vehicles' })
} else if (!router.currentRoute.value.params.id) {
  router.push({ name: 'vehicle-home', params: { id: selectedVehicle.value.id } })
}

const { sorted, avgCostPerDistanceYear, latestEntry, ownedSince, drivenTotal } = useVehicleCalculations(selectedVehicle)

const thisYear = computed(() =>
  sorted.value.filter(
    (item) => new Date(item.refueled).getUTCFullYear() === new Date().getUTCFullYear()
  )
)
</script>

<style lang="css" scoped>
.home-grid {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.card {
  flex: 1 0 auto;
}

.card:last-child {
  width: 100%;
}
</style>
