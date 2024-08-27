<template>
  <q-form @submit.prevent="$emit('submit', model)" class="flex-fluid p-2">
    <q-date
      flat
      bordered
      v-model="model.refueled"
      :landscape="$q.screen.gt.sm"
      emit-immediately
      class="card"
    />
    <div class="card w-full flex-fluid">
      <div class="card flex flex-col gap-2 flex-1">
        <q-input
          filled
          type="number"
          v-model="model.odometer"
          label="Odometer *"
          lazy-rules
          class="card"
          :hint="odoHint"
          :rules="[mustBeNonZero]"
        >
          <template v-slot:prepend>
            <q-icon name="speed" />
          </template>
        </q-input>

        <q-input
          filled
          :model-value="model.amount"
          @update:model-value="amountChanged"
          type="number"
          label="Fuel Amount *"
          :hint="`Total amount refueled in ${settings.currency.name}`"
          :rules="[mustBeNonZero]"
        >
          <template v-slot:prepend>
            <q-icon name="ion-water" />
          </template>
        </q-input>

        <q-input
          filled
          :model-value="model.price_per_unit"
          @update:model-value="unitPriceChanged"
          type="number"
          label="Price per Unit *"
          :hint="`Price for a one unit of fuel in ${settings.units.vol.long}`"
          :rules="[mustBeNonZero]"
        >
          <template v-slot:prepend>
            <q-icon name="i-hugeicons-dollar-01" />
          </template>
        </q-input>

        <q-input
          filled
          :model-value="model.price"
          @update:model-value="totalPriceChanged"
          type="number"
          label="Total *"
          :hint="`Total price paid in ${settings.currency.name}`"
          :rules="[mustBeNonZero]"
        >
          <template v-slot:prepend>
            <q-icon name="i-hugeicons-summation-01" />
          </template>
        </q-input>

        <q-input
          filled
          :model-value="model.average"
          readonly
          @update:model-value="totalPriceChanged"
          type="number"
          label="Average Consumption"
          :hint="`Average fuel consumption since last refueling in ${settings.units.consumption.short}`"
        >
          <template v-slot:prepend>
            <q-icon name="i-hugeicons-fuel-02" />
          </template>
        </q-input>

      </div>
      <div class="min-w-xs flex flex-col gap-2 flex-1">
        <div class="flex flex-col flex-1">
          <q-toggle v-model="model.full_tank" label="Full Tank" />
          <q-toggle v-model="model.reset" label="Reset" />
        </div>

        <div class="flex gap-2 mt-auto flex-1 min-h-[3rem] max-h-[8rem]">
          <q-btn unelevated label="Submit" type="submit" color="primary" class="flex-1" />
          <q-btn @click="$emit('cancel')" label="go back" color="primary" outline class="flex-1" />
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { round } from '@/utils/math';
import { useVehicles } from '@/composables/vehicles';
import type { FuelEntry } from '@/types'
import { computed } from 'vue';

const { settings } = useVehicles()
const model = defineModel<Partial<FuelEntry>>({ required: true })

const props = defineProps<{ lastOdometer?: number }>()
const odoHint = computed(() => {
  if (props.lastOdometer) {
    return `Odometer reading in ${settings.value.units.dist.long} (last reading: ${props.lastOdometer} ${settings.value.units.dist.short})`
  }

  return `Odometer reading in ${settings.value.units.dist.long}`
})

defineEmits(['submit', 'cancel'])

const unitPriceChanged = (value: string | number | null) => {
  const number = parseFloat(`${value}`)

  model.value.price_per_unit = number
  if (model.value.amount) {
    model.value.price = model.value.amount * number
  }
}

const totalPriceChanged = (value: string | number | null) => {
  const number = parseFloat(`${value}`)

  model.value.price = number
  if (model.value.amount) {
    model.value.price_per_unit = round(model.value.price / model.value.amount, 2)
  }
}

const amountChanged = (value: string | number | null) => {
  console.info(typeof value)
  const number = parseFloat(`${value}`)

  model.value.amount = number
  if (model.value.price_per_unit) {
    model.value.price =  round(model.value.price_per_unit * model.value.amount, 2)
  }
}

const mustBeNonZero = (val: string | number | null) => {
  if (isNaN(parseFloat(`${val}`))) {
    return "Must be a number."
  }

  const num = parseFloat(`${val}`)
  if (num <= 0) {
    return "Must be greater than zero."
  }

  return true
}
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
