<template>
  <main v-if="selectedVehicle" class="p-2">
    <hero-card :title="selectedVehicle.name">
      <div class="text-white mb-5">{{ selectedVehicle.model }}</div>
      <div class="flex justify-between">
        <div>
          <div class="text-xs text-secondary">VIN</div>
          <div class="text-white flex items-center gap-2 uppercase">
            {{ selectedVehicle.vin }}
            <q-btn dense rounded color="secondary" unelevated>
              <div class="block content-center w-6 h-6">
                <q-icon name="i-hugeicons-copy-02" size="14px"></q-icon>
              </div>
            </q-btn>
          </div>
        </div>
        <div>
          Registration Number
          <div class="text-white flex items-center gap-2 uppercase">
            {{ selectedVehicle.registration }}
          </div>
        </div>
      </div>
    </hero-card>

    <card class="my-3">
      <fuel-table
        :entries="fuelEntries"
        summary
        @to-fuel-view="router.push({ name: 'vehicle-fuel', params: { id: selectedVehicle.id } })"
      ></fuel-table>
    </card>

    <div class="home-grid">
      <vehicle-avg-consumption-card title="last average" :entries="lastEntry" />
      <vehicle-avg-consumption-card title="year average" :entries="thisYear" />
      <vehicle-avg-consumption-card title="all time avg" :entries="fuelEntries" />

      <vehicle-refuel-button-card
        class="card py-10"
        @click="router.push({ name: 'vehicle-refuel' })"
      />

      <vehicle-maintenance-card :vehicle="selectedVehicle" class="card min-w-xs max-h-[16rem]" />

      <vehicle-value-card
        title="driven since purchase"
        :subtitle="`Owned since ${ownedSince}`"
        :value="drivenTotal"
        icon="i-hugeicons-road"
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
import HeroCard from '@/components/HeroCard.vue'
import VehicleMaintenanceCard from '@/components/vehicle/cards/VehicleMaintenanceCard.vue'
import VehicleRefuelButtonCard from '@/components/vehicle/cards/VehicleRefuelButtonCard.vue'
import VehilceInsuranceCard from '@/components/vehicle/cards/VehilceInsuranceCard.vue'
import VehicleAvgConsumptionCard from '@/components/vehicle/cards/VehicleAvgConsumptionCard.vue'
import VehicleValueCard from '@/components/vehicle/cards/VehicleValueCard.vue'

import FuelTable from '@/components/vehicle/FuelTable.vue'
import type { FuelEntry } from '@/types'
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

const fuelEntries = computed<FuelEntry[]>(() => selectedVehicle.value?.expand?.fuel_entries ?? [])
const sorted = computed(() => fuelEntries.value.sort((a, b) => b.odometer - a.odometer))
const lastEntry = computed(() => {
  const avgOnly = sorted.value.filter((e) => e.average)
  if (avgOnly.length > 0) {
    return [avgOnly[0]]
  }
  return []
})
const thisYear = computed(() =>
  fuelEntries.value.filter(
    (item) => new Date(item.refueled).getUTCFullYear() === new Date().getUTCFullYear()
  )
)

const drivenTotal = computed(() => {
  if (sorted.value.length > 0 && selectedVehicle.value?.purchased_odometer !== undefined) {
    return sorted.value[0].odometer - selectedVehicle.value.purchased_odometer
  }

  return 'N/A'
})

const ownedSince = computed(() => {
  if (selectedVehicle.value?.purchased) {
    return new Date(selectedVehicle.value.purchased).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }
})
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
