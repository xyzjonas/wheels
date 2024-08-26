<template>
  <card @click="router.push({ name: 'vehicle-maintenance', params: { id: vehicle.id } })">
    <div class="p-2 w-full h-full">
      <div class="flex items-center gap-2 mb-3">
        <q-icon name="i-hugeicons-edit-01" class="text-xl"></q-icon>
        <span class="text-xl uppercase">INSURANCE</span>
      </div>
      <q-table
        flat
        hide-header
        hide-pagination
        square
        :rows="rows"
        :columns="[
          {
            field: 'left',
            align: 'left',
            name: 'left',
            label: 'left'
          },
          {
            field: 'right',
            align: 'right',
            name: 'right',
            label: 'right'
          }
        ]"
        class="mb-10"
      />
      <div class="absolute-bottom-right p-2 pr-3 flex items-center gap-2 text-positive">
        <span class="font-600">ACTIVE</span>
        <q-icon name="i-hugeicons-checkmark-circle-04" class="text-xl"></q-icon>
      </div>
    </div>
  </card>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue'
import type { Vehicle } from '@/types';
import { useRouter } from 'vue-router'

defineProps<{
  vehicle: Vehicle,
}>()

const router = useRouter()

const rows = [
  {
    left: 'Valid Through',
    right: new Date().toUTCString(),
  },
  {
    left: 'Cost',
    right: '7653,- Kč'
  }
]
</script>

<style lang="scss" scoped></style>
