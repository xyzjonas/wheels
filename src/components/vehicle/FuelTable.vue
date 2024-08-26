<template>
  <q-table
    title="Refueling History"
    flat
    :hide-pagination="summary"
    :rows="entries"
    :pagination="pagination"
    :columns="fuelColumns"
    row-key="name"
  >
    <template v-if="summary" v-slot:bottom>
      <q-btn
        icon="i-hugeicons-arrow-right-03"
        dense
        flat
        label="see all"
        class="ml-auto"
        @click="$emit('toFuelView')"
      />
    </template>
    <template v-if="!summary" v-slot:top>
      <q-btn
        icon="i-hugeicons-plus-sign-circle"
        unelevated
        color="primary"
        label="add entry"
        class="ml-auto"
        @click="$emit('addEntry')"
      />
    </template>
    <template v-slot:body-cell-menu="props">
      <q-td auto-width>
        <q-btn dense flat icon="i-hugeicons-more-vertical">
          <q-menu v-model="props.row.showMenu">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="$emit('toEdit', props.row.id)">
                <q-item-section>Edit</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Delete</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { useVehicles } from '@/composables/vehicles'
import router from '@/router';
import type { FuelEntry } from '@/types'
import { useQuasar, type QTableColumn } from 'quasar'
import { computed, ref } from 'vue'

const props = defineProps<{
  entries: FuelEntry[]
  summary?: boolean
}>()

defineEmits(['toFuelView', 'addEntry', 'toEdit'])

const pagination = computed(() => {
  return {
    rowsPerPage: props.summary ? 3 : 10,
    sortBy: 'odometer',
    descending: true
  }
})

const { settings } = useVehicles()
const $q = useQuasar()

const formatCurrency = (val: any) => {
  if (settings.value.currency.position === 'before') {
    return `${settings.value.currency.name} ${val}`
  }

  return `${val} ${settings.value.currency.name}`
}

const fuelColumns = computed<QTableColumn[]>(() => {
  const columns: QTableColumn[] = [
    {
      field: 'refueled',
      name: 'refueled',
      label: 'Date',
      format: (val: string) => new Date(val).toLocaleDateString(),
      align: 'left',
      sortable: true
    },
    {
      field: 'odometer',
      name: 'odometer',
      label: 'Odometer',
      format: (val: number) => `${val} ${settings.value.units.dist.short}`,
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

  if (!props.summary) {
    columns.push({
      field: 'menu',
      name: 'menu',
      label: '',
      align: 'right',
      sortable: true
    })
  }

  return columns
})

// const toEditView = (refuelItemId: string) => {
//   router.push({ name: 'refuel-edit', params: { id:  } })
// }

</script>


<style lang="scss" scoped></style>
