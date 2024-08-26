<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-table
      flat
      bordered
      grid
      title="VEHICLES"
      :rows="vehicles"
      :columns="[
        {
          name: 'name',
          label: 'Name',
          field: 'name'
        },
        {
          name: 'model',
          field: 'model',
          label: 'Model',
        },
        {
          name: 'registration',
          field: 'registration',
          label: 'Plates',
        },
      ]"
      row-key="name"
      @row-click="(evt, row, index) => select(row)"
    >
      <template v-slot:top-right>
        <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="i-hugeicons-search-02" />
          </template>
        </q-input>
      </template>
    </q-table>
  </q-pull-to-refresh>
</template>

<script setup lang="ts">
import { useVehicles } from '@/composables/vehicles'
import type { Vehicle } from '@/types'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { vehicles, selectedVehicleId, fetch } = useVehicles()

const filter = ref("")

const refresh = (done: () => void) => {
  fetch().finally(() => {
    setTimeout(done, 500)
  })
}

const router = useRouter()
const select = (row: Vehicle) => {
  console.info(row.id)
  selectedVehicleId.value = row.id
  router.push({ name: 'vehicle-home', params: { id: row.id } })
}
</script>

<style lang="css" scoped></style>
