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
      <vehicle-value-card
        title="LAST AVG"
        icon="i-hugeicons-fuel-station"
        :value="6.6"
        unit="l/100km"
        class="min-h-[12rem]"
      />
      <vehicle-value-card
        title="ALL TIME AVG"
        icon="i-hugeicons-fuel-station"
        :value="5.6"
        unit="l/100km"
      />

      <!-- <card class="p-2 min-w-sm card">
        <div class="text-xs uppercase">FUEL</div>
        <div class="flex flex-col gap-1 my-5">
          <div class="flex items-baseline gap-1">
            <q-icon name="i-hugeicons-fuel-station"></q-icon>
            <span class="text-2xl">32</span>
            <span class="text-sm"> l/100km</span>
          </div>
          <div class="flex items-baseline gap-1">
            <q-icon name="i-hugeicons-dashboard-speed-01"></q-icon>
            <span class="text-2xl">820</span>
            <span class="text-sm"> km</span>
          </div>
        </div>
        <q-btn unelevated color="primary" class="mt-auto">fill up</q-btn>
      </card> -->

      <vehicle-refuel-card class="card py-10" @click="router.push({ name: 'vehicle-refuel' })" />

      <vehicle-maintenance-card :vehicle="selectedVehicle" class="card min-w-xs max-h-[16rem]" />

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
import VehicleRefuelCard from '@/components/vehicle/cards/VehicleRefuelCard.vue'
import VehicleValueCard from '@/components/vehicle/cards/VehicleValueCard.vue'
import VehilceInsuranceCard from '@/components/vehicle/cards/VehilceInsuranceCard.vue'

import FuelTable from '@/components/vehicle/FuelTable.vue'
import type { FuelEntry } from '@/types'
import { computed } from 'vue'

const router = useRouter()

const { selectedVehicle, selectedVehicleId } = useVehicles()

selectedVehicleId.value = router.currentRoute.value.params.id as string

if (!selectedVehicle.value) {
  selectedVehicleId.value = ''
  router.push({ name: 'vehicles' })
} else if (!router.currentRoute.value.params.id) {
  router.push({ name: 'vehicle-home', params: { id: selectedVehicle.value.id } })
}

const fuelEntries = computed<FuelEntry[]>(() => selectedVehicle.value?.expand?.fuel_entries ?? [])
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
