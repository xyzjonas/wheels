<template>
  <q-form @submit.prevent="$emit('submit', model)" class="p-2 h-full flex flex-col">

    <q-input filled v-model="model.vin" label="VIN" hint="VIN Number">
      <template v-slot:prepend>
        <q-icon name="i-hugeicons-text-number-sign" />
      </template>
    </q-input>

    <q-input filled v-model="model.registration" label="Registration" hint="Registration Number">
      <template v-slot:prepend>
        <q-icon name="i-hugeicons-task-edit-01" />
      </template>
    </q-input>

    <q-input
      filled
      v-model="model.name"
      type="number"
      label="Name"
      hint="Name it anything you like ;)"
    >
      <template v-slot:prepend>
        <q-icon name="i-hugeicons-heading-01" />
      </template>
    </q-input>

    <q-input filled v-model="model.model" label="Model" hint="Vehicle brand and model">
      <template v-slot:prepend>
        <q-icon name="i-hugeicons-car-04" />
      </template>
    </q-input>

    <div class="flex gap-2 mt-20">
      <q-btn unelevated label="Submit" type="submit" color="primary" class="flex-1" />
      <q-btn @click="$emit('cancel')" label="go back" color="primary" outline class="flex-1" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { useVehicles } from '@/composables/vehicles'
import type { Vehicle } from '@/types'

const { settings } = useVehicles()
const model = defineModel<Partial<Vehicle>>({ required: true })

defineEmits(['submit', 'cancel'])
</script>

<style lang="css" scoped>
.flex-fluid {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.card {
  flex: 1 0 auto;
}
</style>
