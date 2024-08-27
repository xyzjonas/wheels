<template>
  <vehicle-value-card
    :title="title ?? 'average consumption'"
    icon="i-hugeicons-fuel-station"
    :value="avg"
    :unit="settings.units.consumption.short"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useVehicles } from '@/composables/vehicles'
import type { FuelEntry, Vehicle } from '@/types'

import { round } from '@/utils/math'
import VehicleValueCard from './VehicleValueCard.vue'

const { settings } = useVehicles()
const props = defineProps<{ entries: FuelEntry[], title?: string }>()

const sorted = computed(() => props.entries.sort((a, b) => a.odometer - b.odometer))
const avg = computed(() => {
  if (sorted.value.length <= 0) {
    return 'N/A'
  }

  const avg = sorted.value.reduce((avg, currentItem) => {
    if (!currentItem.average) {
      return avg
    }

    if (avg === 0) {
      return currentItem.average
    }

    return (avg + currentItem.average) / 2
  }, 0)

  return round(avg, 2)
})

</script>

<style lang="scss" scoped></style>
