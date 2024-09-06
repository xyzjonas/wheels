<template>
  <q-table
    title="Maintenance History"
    flat
    no-data-label="No maintenance history found"
    :rows="entries"
    :pagination="pagination"
    :columns="fuelColumns"
    @row-click="(evt, row) => $emit('toDetail', row.id)"
    row-key="name"
  >
    <template v-slot:top>
      <q-btn
        icon="i-hugeicons-row-insert"
        unelevated
        color="primary"
        label="add"
        class="ml-auto"
        @click="$emit('addEntry')"
      />
    </template>
    <template v-slot:body-cell-category="props">
      <q-td auto-width>
        <q-icon
          size="1.4rem"
          :name="categoryIcons[props.row.category as Category].name"
          :color="categoryIcons[props.row.category as Category].color"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { useVehicles } from '@/composables/vehicles'
import type { Category, MaintenanceEntry } from '@/types'
import { useQuasar, type QTableColumn } from 'quasar'
import { computed } from 'vue'

const props = defineProps<{
  entries: MaintenanceEntry[]
}>()

defineEmits(['toFuelView', 'addEntry', 'toEdit', 'toDetail', 'delete', 'recompute'])

const pagination = computed(() => {
  return {
    rowsPerPage: 10,
    sortBy: 'date',
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
      field: 'category',
      name: 'category',
      label: '',
      align: 'left',
      sortable: false
    },
    {
      field: 'date',
      name: 'date',
      label: 'Date',
      format: formatDate,
      align: 'left',
      sortable: true
    },
    {
      field: 'description',
      name: 'description',
      label: 'Description',
      align: 'left',
      sortable: false
    }
  ]

  if ($q.screen.gt.md) {
    columns.push({
      field: 'odometer',
      name: 'odometer',
      label: 'Odometer',
      format: (val: number) => (val > 0 ? `${val} ${settings.value.units.dist.short}` : ''),
      align: 'left',
      sortable: true
    })
  }

  columns.push({
    field: 'price',
    name: 'price',
    label: $q.screen.gt.sm ? 'Total Price' : 'Total',
    format: (val: number) => (val > 0 ? formatCurrency(val) : ''),
    align: 'right',
    sortable: true
  })

  return columns
})

const categoryIcons: { [K in Category]: { name: string; color: string } } = {
  maintenance: {
    name: 'i-hugeicons-wrench-01',
    color: 'primary'
  },
  service: {
    name: 'i-hugeicons-settings-error-01',
    color: 'negative'
  },
  tax: {
    name: 'i-hugeicons-payment-success-01',
    color: ''
  },
  reminder_check: {
    name: 'i-hugeicons-checkmark-circle-01',
    color: 'positive'
  }
}
</script>

<style lang="scss" scoped></style>
