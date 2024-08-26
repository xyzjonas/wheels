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
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useVehicles } from '@/composables/vehicles'
import { computed, ref } from 'vue'

import HeroCard from '@/components/HeroCard.vue'
import FuelTable from '@/components/vehicle/FuelTable.vue'
import type { FuelEntry } from '@/types'

const router = useRouter()

const { selectedVehicle, selectedVehicleId, removeFuelEntry } = useVehicles()

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
</script>
