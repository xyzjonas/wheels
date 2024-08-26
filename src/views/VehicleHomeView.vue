<template>
  <main v-if="selectedVehicle" class="p-2">
    <card class="bg-primary text-secondary p-5">
      <div class="text-[4rem] uppercase font-500 tracking-tighter">{{ selectedVehicle.name }}</div>
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
    </card>

    <card class="my-3">
    <q-table
      title="Refueling History"
      flat
      hide-pagination
      :rows="selectedVehicle?.expand?.fuel_entries ?? []"
      :pagination="{
        rowsPerPage: 4,
        sortBy: 'odometer',
        descending: true
      }"
      :columns="fuelColumns"
      row-key="name"
    >
      <template v-slot:bottom>
        <q-btn
          icon="i-hugeicons-arrow-right-03"
          dense
          flat
          label="see all"
          class="ml-auto"
          @click="router.push({ name: 'vehicle-fuel', params: { id: selectedVehicle.id } })"
        />
      </template>
    </q-table>
    </card>

    
    <div class="home-grid">
      <vehicle-value-card title="LAST AVG" icon="i-hugeicons-fuel-station" :value="6.6" unit="l/100km" class="min-h-[12rem]" />
      <vehicle-value-card title="ALL TIME AVG" icon="i-hugeicons-fuel-station" :value="5.6" unit="l/100km" />

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

      <vehicle-maintenance-card :vehicle="selectedVehicle" class="card min-w-xs max-h-[16rem]"  />

      <vehilce-insurance-card :vehicle="selectedVehicle" class="card" />

    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useVehicles } from '@/composables/vehicles'

import Card from '@/components/Card.vue'
import VehicleRefuelCard from '@/components/vehicle/cards/VehicleRefuelCard.vue'
import VehicleMaintenanceCard from '@/components/vehicle/cards/VehicleMaintenanceCard.vue'
import VehilceInsuranceCard from '@/components/vehicle/cards/VehilceInsuranceCard.vue'
import VehicleValueCard from '@/components/vehicle/cards/VehicleValueCard.vue'

import { computed } from 'vue'
import { useQuasar, type QTableColumn, type QTableProps } from 'quasar'

const router = useRouter()

const { selectedVehicle, selectedVehicleId, settings } = useVehicles()

selectedVehicleId.value = router.currentRoute.value.params.id as string

if (!selectedVehicle.value) {
  selectedVehicleId.value = ''
  router.push({ name: 'vehicles' })
} else if (!router.currentRoute.value.params.id) {
  router.push({ name: 'vehicle-home', params: { id: selectedVehicle.value.id } })
}

const formatCurrency = (val: any) => {
  if (settings.value.currency.position === 'before') {
    return `${settings.value.currency.name} ${val}`
  }

  return `${val} ${settings.value.currency.name}`
}

const $q = useQuasar()
const fuelColumns = computed<QTableColumn[]>(() => {
  const columns: QTableColumn[] = [
    {
      field: 'odometer',
      name: 'odometer',
      label: 'Odometer',
      format: (val: number) => `${val} ${settings.value.units.dist.short}`,
      align: 'left',
      sortable: true
    },
    {
      field: 'refueled',
      name: 'refueled',
      label: 'Date',
      format: (val: string) => new Date(val).toLocaleDateString(),
      align: 'left',
      sortable: true
    },
    {
      field: 'amount',
      name: 'amount',
      label: 'Amount',
      format: (val: string) => `${val} ${settings.value.units.vol.short}`,
      align: 'right'
    }
  ]

  if ($q.screen.gt.md) {
    columns.push({
      field: 'price_per_unit',
      name: 'price_per_unit',
      label: 'Price Per Unit',
      format: formatCurrency,
      align: 'right'
    })
  }

  columns.push({
    field: 'price',
    name: 'price',
    label: 'Total Price',
    format: formatCurrency,
    align: 'right'
  })

  return columns
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
