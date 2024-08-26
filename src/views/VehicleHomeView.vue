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

    <q-table
      title="Last Refueling"
      flat
      hide-pagination
      :rows="selectedVehicle?.expand?.fuel_entries ?? []"
      :pagination="{
        rowsPerPage: 3,
        sortBy: 'odometer',
        descending: true
      }"
      :columns="fuelColumns"
      row-key="name"
      class="my-3"
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

    <div class="flex flex-wrap gap-2">
      <card class="p-2 flex-1">
        <div class="text-xs uppercase">AVG</div>
        <div class="grid content-center h-full w-full">
          <div class="flex items-baseline gap-1">
            <div class="self-center text-xl">
              <q-icon name="i-hugeicons-fuel-station" class="self-baseline"></q-icon>
            </div>
            <div class="text-5xl self-start">5.6</div>
            <span class="text-sm uppercase">l/100 km</span>
            <!-- <q-icon class="text-positive  text-lg" name="i-hugeicons-chart-decrease"></q-icon> -->
          </div>
        </div>
        <!-- <q-btn unelevated color="primary" class="mt-auto">fill up</q-btn> -->
      </card>

      <card class="p-2 min-w-sm">
        <div class="text-xs uppercase">FUEL</div>
        <div class="flex flex-col gap-1 my-5">
          <div class="flex items-baseline gap-1">
            <q-icon name="i-hugeicons-fuel-station"></q-icon>
            <span class="text-2xl">32</span>
            <span class="text-sm"> l/100km</span>
            <!-- <q-icon class="text-positive  text-lg" name="i-hugeicons-chart-decrease"></q-icon> -->
          </div>
          <div class="flex items-baseline gap-1">
            <q-icon name="i-hugeicons-dashboard-speed-01"></q-icon>
            <span class="text-2xl">820</span>
            <span class="text-sm"> km</span>
            <!-- <q-icon class="text-positive  text-lg" name="i-hugeicons-chart-decrease"></q-icon> -->
          </div>
        </div>
        <q-btn unelevated color="primary" class="mt-auto">fill up</q-btn>
      </card>

      <q-img
        @click="router.push({ name: 'vehicle-maintenance', params: { id: selectedVehicle.id } })"
        fit="cover"
        class="border-rd-[4px] hover:cursor-pointer flex-1 min-w-xs max-w-md"
        src="https://theosautomotive.com.au/images/slider/engine_maintenance.jpg"
      >
        <div class="p-2 w-full h-full">
          <q-icon name="i-hugeicons-check-list" class="text-xl"></q-icon>
          <div class="text-xl uppercase">maintenance</div>
          <div class="absolute-bottom-right p-2 pr-3 flex items-center gap-2 text-positive">
            <span class="font-600">OK</span>
            <q-icon name="i-hugeicons-checkmark-circle-04" class="text-xl"></q-icon>
          </div>
        </div>
      </q-img>

      <q-btn color="primary" unelevated class="aspect-ratio-square">FILL UP</q-btn>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useVehicles } from '@/composables/vehicles'

import Card from '@/components/Card.vue'
import { computed } from 'vue'
import { useQuasar, type QTableColumn, type QTableProps } from 'quasar'

const router = useRouter()

const { selectedVehicle, selectedVehicleId } = useVehicles()

selectedVehicleId.value = router.currentRoute.value.params.id as string

if (!selectedVehicle.value) {
  selectedVehicleId.value = ''
  router.push({ name: 'vehicles' })
} else if (!router.currentRoute.value.params.id) {
  router.push({ name: 'vehicle-home', params: { id: selectedVehicle.value.id } })
}

const $q = useQuasar()
const fuelColumns = computed<QTableColumn[]>(() => {
  const columns: QTableColumn[] = [
    {
      field: 'odometer',
      name: 'odometer',
      label: 'Odometer',
      format: (val: number) => `${val} km`,
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
      format: (val: number) => `${val} l`,
      align: 'right'
    }
  ]

  if ($q.screen.gt.md) {
    columns.push({
      field: 'price_per_unit',
      name: 'price_per_unit',
      label: 'Price Per Unit',
      format: (val: number) => `${val},- Kč`,
      align: 'right'
    })
  }

  columns.push({
    field: 'price',
    name: 'price',
    label: 'Total Price',
    format: (val: number) => `${val},- Kč`,
    align: 'right'
  })

  return columns
})
</script>
