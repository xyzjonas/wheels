<template>
  <q-form @submit.prevent="$emit('submit', model)" class="h-full flex flex-col gap-3">
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

    <separator class="text-lg mt-5">Settings</separator>

    <q-input
      filled
      v-model="model.setting_currency"
      label="Currency Name"
      hint="Set an arbitrary currency label"
    >
      <template v-slot:prepend>
        <q-icon name="i-hugeicons-dollar-02" />
      </template>
    </q-input>

    <q-select
      filled
      v-model="model.setting_currency_position"
      :options="['before', 'after']"
      label="Currency position"
      hint="Whether the currency label is put before or after the number"
    />

    <q-select
      filled
      v-model="model.setting_measurement"
      :options="['metric', 'imperial']"
      label="Measurement"
      hint="Set this car's units to metric or imperial"
    />

    <div class="flex gap-2 mt-auto pt-5">
      <q-btn unelevated label="Submit" type="submit" color="primary" class="flex-1" />
      <q-btn @click="$emit('cancel')" label="go back" color="primary" outline class="flex-1" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { useVehicles } from '@/composables/vehicles'
import type { Vehicle } from '@/types'

import Separator from '@/components/Separator.vue';

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
