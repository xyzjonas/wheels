<template>
  <q-table
    title="Refueling History"
    flat
    no-data-label="No refueling history found"
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
      <div class="ml-auto flex gap-2">
        <q-btn
        icon="i-hugeicons-calculator"
        unelevated
        flat
        color="primary"
        label="re-calculate"
        class="ml-auto"
        @click="$emit('recompute')"
      />
        <q-btn
        icon="i-hugeicons-row-insert"
        unelevated
        color="primary"
        label="add"
        class="ml-auto"
        @click="$emit('addEntry')"
        />
      </div>
    </template>
    <template v-slot:body-cell-menu="props">
      <q-td auto-width>
        <q-btn dense flat icon="i-hugeicons-more-vertical">
          <q-menu v-model="props.row.showMenu">
            <q-list>
              <q-item clickable v-close-popup @click="props.row.showMenu = false; $emit('toDetail', props.row.id)">
                <q-item-section class="flex flex-row gap-3 items-center justify-start no-wrap">
                  <q-icon name="i-hugeicons-view" />
                  Detail
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="props.row.showMenu = false; $emit('toEdit', props.row.id)">
                <q-item-section class="flex flex-row gap-3 items-center justify-start no-wrap">
                  <q-icon name="i-hugeicons-edit-02" />
                  Edit
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup class="w-fit text-negative" @click="props.row.showMenu = false; $emit('delete', props.row.id)">
                <q-item-section class="flex flex-row gap-3 items-center justify-start no-wrap">
                  <q-icon name="i-hugeicons-delete-02" />
                  Delete
                </q-item-section>
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
import type { FuelEntry } from '@/types'
import { useQuasar, type QTableColumn } from 'quasar'
import { computed } from 'vue'

const props = defineProps<{
  entries: FuelEntry[]
  summary?: boolean,
}>()

defineEmits(['toFuelView', 'addEntry', 'toEdit', 'toDetail', 'delete', 'recompute'])

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

const formatDate = (val: string) => {
  const now = new Date()
  const date = new Date(val)

  if (now.getUTCFullYear() === date.getUTCFullYear()) {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: undefined
    })
  }

  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: '2-digit'
  })
}

const fuelColumns = computed<QTableColumn[]>(() => {
  const columns: QTableColumn[] = [
    {
      field: 'refueled',
      name: 'refueled',
      label: 'Date',
      format: formatDate,
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

    columns.push({
      field: 'price',
      name: 'price',
      label: $q.screen.gt.sm ? 'Total Price' : 'Total',
      format: formatCurrency,
      align: 'right'
    })
  }


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
</script>

<style lang="scss" scoped></style>
