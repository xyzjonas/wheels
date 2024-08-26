<template>
  <form @submit.prevent="$emit('submit', model)" class="flex-fluid p-2">
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
          label="Odometer"
          lazy-rules
          class="card"
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
          label="Fuel Amount"
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
          label="Price per Unit"
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
          label="Total"
        >
          <template v-slot:prepend>
            <q-icon name="i-hugeicons-summation-01" />
          </template>
        </q-input>

        <q-input filled type="number" v-model="model.amount" label="Your age *" lazy-rules />
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
  </form>
</template>

<script setup lang="ts">
import type { FuelEntry } from '@/types'

const model = defineModel<Partial<FuelEntry>>({ required: true })

defineEmits(['submit', 'cancel'])

function round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}


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
  if (model.value.price) {
    model.value.price_per_unit =  round(model.value.price / model.value.amount, 2)
  }
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
