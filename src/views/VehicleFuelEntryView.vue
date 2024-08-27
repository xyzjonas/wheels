<template>
  <main class="p-2">
    <hero-card :title="date"> </hero-card>
    <refuel-form v-model="refuelItem" readonly />
  </main>
</template>

<script setup lang="ts">
import { useRoutingGuard } from '@/composables/routing'
import { useVehicles } from '@/composables/vehicles'
import { computed, ref } from 'vue'

import type { FuelEntry } from '@/types'
import HeroCard from '@/components/HeroCard.vue'
import RefuelForm from '@/components/vehicle/RefuelForm.vue'

const { getRefuelItemOrRouteAway, refuleItemId } = useRoutingGuard()
getRefuelItemOrRouteAway()

const { selectedVehicle } = useVehicles()
const refuelItem = computed(() => {
  return selectedVehicle.value?.expand?.fuel_entries.find(
    (e) => e.id === refuleItemId.value
  ) as FuelEntry
})

const date = computed(() =>
  new Date(refuelItem.value.refueled).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
)
</script>

<style lang="scss" scoped></style>
