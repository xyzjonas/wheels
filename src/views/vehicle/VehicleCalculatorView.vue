<template>
  <main v-if="selectedVehicle" class="my-3 flex flex-col gap-2">
    <q-input filled v-model="distance" label="Distance Driven" />
    <q-select filled v-model="consumption" :options="consumptionOptions" />
    <q-input filled v-model="pricePerUnit" label="Price Per Unit" />

    <q-toggle v-model="includeAmortization" label="Include Amortization?" />
    <q-toggle
      v-if="includeAmortization"
      v-model="includeRepairs"
      label="Include accident and defect repairs?"
    />
    <q-input
      readonly
      v-if="includeAmortization"
      filled
      v-model="amortization"
      label="Average Amortizaton"
    />

    <q-separator class="my-5" />
    <h1 class="text-3xl font-400">
      Grand Total:
      <span class="font-bold ml-5">{{ round(total, 2) }}</span>
      {{ selectedVehicle.setting_currency }}
    </h1>
  </main>
</template>

<script setup lang="ts">
import { useVehicles } from '@/composables/vehicles'
import { useRouter } from 'vue-router'

import { useRoutingGuard } from '@/composables/routing'
import { computed, ref, watch } from 'vue'
import { useVehicleCalculations } from '@/composables/vehicle'
import { round } from '@/utils/math'

const router = useRouter()
const { getVehicleOrRouteAway } = useRoutingGuard()

getVehicleOrRouteAway()

const { selectedVehicle, selectedVehicleId, fetch } = useVehicles()

selectedVehicleId.value = router.currentRoute.value.params.id as string

const {
  avgCostPerDistance,
  avgCostPerDistanceYear,
  latestEntry,
  avgAmortization,
  avgAmortizationWithRepairs
} = useVehicleCalculations(selectedVehicle)

type Option = { label: string; value: number }

const consumptionOptions = computed<Option[]>(() => [
  {
    label: `Last Fuel Consumption (${latestEntry.value.average ?? 0})`,
    value: latestEntry.value.average ?? 0
  },
  {
    label: `All Time Average (${avgCostPerDistance.value})`,
    value: avgCostPerDistance.value
  },
  {
    label: `This Year Average ${avgCostPerDistanceYear.value}`,
    value: avgCostPerDistanceYear.value
  }
])

const distance = ref<number>(100)
const consumption = ref<Option>(consumptionOptions.value[0])
const pricePerUnit = ref<number>(latestEntry.value.price_per_unit)

const includeAmortization = ref(false)
const includeRepairs = ref(false)
const amortization = ref(round(avgAmortization.value, 2))

watch(
  includeRepairs,
  () =>
    (amortization.value = includeRepairs.value
      ? avgAmortizationWithRepairs.value
      : avgAmortization.value)
)

const total = computed(() => {
  const amort = round((includeAmortization.value ? amortization.value : 1) * distance.value, 2)
  return (consumption.value.value * pricePerUnit.value * distance.value) / 100 + amort
})

await fetch()
</script>
