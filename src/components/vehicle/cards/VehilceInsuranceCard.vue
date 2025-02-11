<template>
  <card @click="router.push({ name: 'vehicle-maintenance', params: { id: vehicle.id } })">
    <div class="p-2 w-full h-full">
      <div class="flex items-center gap-2 mb-3">
        <q-icon name="personal_injury" class="text-xl"></q-icon>
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
      <div class="absolute-bottom-right p-2">
        <q-btn color="primary" icon="description" label="green card" unelevated></q-btn>
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
  },
]
</script>

<style lang="scss" scoped></style>
