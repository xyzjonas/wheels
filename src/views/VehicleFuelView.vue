<template>
  <main v-if="selectedVehicle" class="p-2 max-w-[100%]">
    <hero-card title="Fuel Report" class="mb-5">
      <div class="text-white text-lg uppercase">{{ selectedVehicle.name }}</div>
      <div>{{ selectedVehicle.model }}</div>
    </hero-card>

    <fuel-table
      :entries="fuelEntries"
      @add-entry="toNewEntry"
      @to-edit="toEditView"
      @delete="onDelete"
      @recompute="recompute"
    />

    <q-dialog v-model="showDeleteDialog" position="bottom">
      <q-card class="min-w-xs flex flex-col">
        <q-card-section class="row items-center no-wrap pb-2">
          <div>
            <div class="text-weight-bold text-lg">Are you sure?</div>
            <div class="text-grey">Deleted entry will be lost forever.</div>
          </div>
        </q-card-section>
        <q-card-section class="flex gap-2 h-fit">
          <q-btn
            outline
            dense
            :loading="deleteLoading"
            icon="i-hugeicons-delete-02"
            label="delete"
            color="negative"
            class="flex-1"
            @click="actualDelete"
          />
          <q-btn flat dense label="cancel" class="flex-1" @click="showDeleteDialog = false" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="recomputing" position="bottom">
      <q-card class="min-w-xs flex flex-col">
        <q-card-section class="flex flex-col items-center justify-center gap-10 w-full no-wrap pb-2 my-10">
          <q-circular-progress
          indeterminate
          size="5rem"
          color="primary"
          />
          <span class="font-500">Updating fuel items...</span>
        </q-card-section>
        <q-linear-progress :value="itemsDone / sorted.length" size="6px"/>
      </q-card>
    </q-dialog>

  </main>
</template>

<script setup lang="ts">
import { useVehicles } from '@/composables/vehicles'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import HeroCard from '@/components/HeroCard.vue'
import FuelTable from '@/components/vehicle/FuelTable.vue'
import type { FuelEntry } from '@/types'

const router = useRouter()

const { selectedVehicle, selectedVehicleId, editFuelEntry, removeFuelEntry } = useVehicles()

selectedVehicleId.value = router.currentRoute.value.params.id as string

if (!selectedVehicle.value) {
  selectedVehicleId.value = ''
  router.push({ name: 'vehicles' })
} else if (!router.currentRoute.value.params.id) {
  router.push({ name: 'vehicle-home', params: { id: selectedVehicle.value.id } })
}

const toNewEntry = () => {
  router.push({ name: 'vehicle-refuel', params: { id: selectedVehicleId.value } })
}

const toEditView = (refuelItemId: string) => {
  router.push({
    name: 'vehicle-refuel-edit',
    params: { id: selectedVehicleId.value, refuelId: refuelItemId }
  })
}

const deleteLoading = ref(false)
const showDeleteDialog = ref(false)
const fuelEntryToBeDeletedId = ref('')
const onDelete = (refuelItemId: string) => {
  showDeleteDialog.value = true
  fuelEntryToBeDeletedId.value = refuelItemId
}

const actualDelete = async () => {
  deleteLoading.value = true
  try {
    await removeFuelEntry(selectedVehicleId.value, fuelEntryToBeDeletedId.value)
  } finally {
    setTimeout(() => {
      deleteLoading.value = false
      showDeleteDialog.value = false
    }, 500)
  }
}

const fuelEntries = computed<FuelEntry[]>(() => selectedVehicle.value?.expand?.fuel_entries ?? [])

const sorted = computed(() => fuelEntries.value.sort((a, b) => a.odometer - b.odometer))
const recomputing = ref(false)
const itemsDone = ref(1)
async function recompute() {
  if (sorted.value.length <= 1) {
    return
  }

  itemsDone.value = 1
  recomputing.value = true

  try {
    let tempOdo = 0
    let tempAmount = 0

    for (let index = 1; index < sorted.value.length; index++) {
      const prev = sorted.value[index - 1]
      const current = sorted.value[index]
      itemsDone.value += 1

      if (current.reset) {
        tempOdo = 0
        tempAmount = 0
        continue
      }

      if (current.full_tank && tempOdo === 0) {
        const intervalAverage = (current.amount / (current.odometer - prev.odometer)) * 100
        current.average = intervalAverage
        await editFuelEntry(selectedVehicleId.value, current.id, current)

        tempOdo = 0
        tempAmount = 0
      } else if (current.full_tank) {
        const totalAmount = tempAmount + current.amount
        const intervalAverage = (totalAmount / (current.odometer - tempOdo)) * 100
        current.average = intervalAverage
        await editFuelEntry(selectedVehicleId.value, current.id, current)

        tempOdo = 0
        tempAmount = 0
      } else {
        if (tempOdo === 0) {
          tempOdo = prev.odometer
        }
        tempAmount += current.amount
      }
    }
  } finally {
    setTimeout(() =>  recomputing.value = false, 300)
  }
}
</script>
