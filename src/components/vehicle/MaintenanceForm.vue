<template>
  <q-form @submit.prevent="$emit('submit', model)" class="flex flex-1 flex-col gap-3">
    <q-date
      flat
      bordered
      v-model="model.date"
      :landscape="$q.screen.gt.sm"
      emit-immediately
      class="w-full"
      :readonly="readonly"
    />

    <q-select
      filled
      v-model="model.category"
      :options="['maintenance', 'service', 'tax']"
      label="Category"
      hint="Indicate maintenance entry category"
      :readonly="readonly"
    />

    <q-input
      filled
      v-model="model.description"
      type="textarea"
      label="Description *"
      hint="Short description of the maintenance entry"
      :readonly="readonly"
    >
      <template v-slot:prepend>
        <q-icon name="i-hugeicons-text-align-left" />
      </template>
    </q-input>

    <q-input
      filled
      type="number"
      v-model="model.odometer"
      label="Odometer"
      lazy-rules
      :hint="odoHint"
      :readonly="readonly"
    >
      <template v-slot:prepend>
        <q-icon name="speed" />
      </template>
    </q-input>

    <q-input
      filled
      v-model="model.price"
      type="number"
      label="Price *"
      :hint="`Total price paid in ${settings.currency.name}`"
      :readonly="readonly"
    >
      <template v-slot:prepend>
        <q-icon name="i-hugeicons-summation-01" />
      </template>
    </q-input>

    <separator class="mt-5 text-lg">Details</separator>
    <q-editor v-if="!readonly" v-model="model.body" min-height="5rem" />

    <q-card v-else flat bordered class="min-h-[5rem]">
      <q-card-section v-html="!model.body ? 'No details...' : model.body" />
    </q-card>

    <div class="flex gap-2 mt-auto pt-5">
      <q-btn
        v-if="!readonly"
        unelevated
        label="Submit"
        type="submit"
        color="primary"
        class="flex-1"
      />
      <q-btn
        v-else
        unelevated
        label="Edit"
        color="primary"
        class="flex-1"
        @click="$emit('toEdit')"
      />
      <q-btn @click="$emit('cancel')" label="cancel" color="primary" outline class="flex-1 h-[4rem]" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { useVehicles } from '@/composables/vehicles'
import type { CreateMaintenanceEntry, MaintenanceEntry } from '@/types'
import { date } from 'quasar'
import { computed, onMounted } from 'vue'

import Separator from '@/components/Separator.vue'

const { settings } = useVehicles()
const model = defineModel<CreateMaintenanceEntry>({ required: true })

const props = defineProps<{ lastOdometer?: number; readonly?: boolean }>()
const odoHint = computed(() => {
  if (props.lastOdometer) {
    return `Odometer reading in ${settings.value.units.dist.long} (last reading: ${props.lastOdometer} ${settings.value.units.dist.short})`
  }

  return `Odometer reading in ${settings.value.units.dist.long}`
})

defineEmits(['submit', 'cancel', 'toEdit', 'toDetail'])

const mustBeNonZero = (val: string | number | null) => {
  if (isNaN(parseFloat(`${val}`))) {
    return 'Must be a number.'
  }

  const num = parseFloat(`${val}`)
  if (num <= 0) {
    return 'Must be greater than zero.'
  }

  return true
}

onMounted(() => {
  model.value.date = date.formatDate(model.value.date, 'YYYY/MM/DD')
})
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
