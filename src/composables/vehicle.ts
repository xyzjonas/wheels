import type { Vehicle } from '@/types'
import { calculateAverageCostPerDistance } from '@/utils/calculations'
import { computed, type Ref } from 'vue'

export const useVehicleCalculations = (vehicle: Ref<Vehicle | undefined>) => {
  const fuelEntries = computed(() => vehicle.value?.expand?.fuel_entries ?? [])
  const sorted = computed(() => fuelEntries.value.sort((a, b) => a.odometer - b.odometer))
  const latestEntry = computed(() => sorted.value[sorted.value.length - 1])

  const avgCostPerDistance = computed(() => {
    return calculateAverageCostPerDistance(sorted.value)
  })

  const avgCostPerDistanceYear = computed(() => {
    const thisYear = new Date().getUTCFullYear()
    return calculateAverageCostPerDistance(
      sorted.value.filter((entry) => new Date(entry.refueled).getUTCFullYear() === thisYear)
    )
  })
  
    const avgAmortization = computed(() => {
        const driven = latestEntry.value.odometer - (vehicle.value?.purchased_odometer ?? 0)
        const total = (vehicle.value?.expand?.maintenance_entries ?? []).reduce((a, b) => a + b.price, 0)
        return total / driven
    })

  return {
    sorted,
    latestEntry,
    avgCostPerDistance,
    avgCostPerDistanceYear,
    avgAmortization
  }
}
