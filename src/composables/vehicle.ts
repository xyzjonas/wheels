import type { FuelEntry, Vehicle } from '@/types'
import { calculateAverageCostPerDistance } from '@/utils/calculations'
import { round } from '@/utils/math'
import { computed, type Ref } from 'vue'

export const useVehicleCalculations = (vehicle: Ref<Vehicle | undefined>) => {
  const fuelEntries = computed(() => vehicle.value?.expand?.fuel_entries ?? [])
  const sorted = computed(() => fuelEntries.value.sort((a, b) => a.odometer - b.odometer))
  const latestEntry = computed(() => sorted.value[sorted.value.length - 1])

  const calculateAvg = (entries: FuelEntry[]) => {
    if (entries.length <= 0) {
      return 0
    }
  
    const avg = entries.reduce((avg, currentItem) => {
      if (!currentItem.average) {
        return avg
      }
  
      if (avg === 0) {
        return currentItem.average
      }
  
      return (avg + currentItem.average) / 2
    }, 0)
  
    if (avg === 0) {
      return 0
    }
  
    return round(avg, 2)
  }

  const thisYear = computed(() =>
    sorted.value.filter(
      (item) => new Date(item.refueled).getUTCFullYear() === new Date().getUTCFullYear()
    )
  )

  const avgCostPerDistance = computed(() => {
    return calculateAverageCostPerDistance(sorted.value)
  })

  const avgCostPerDistanceYear = computed(() => {
    const thisYear = new Date().getUTCFullYear()
    return calculateAverageCostPerDistance(
      sorted.value.filter((entry) => new Date(entry.refueled).getUTCFullYear() === thisYear)
    )
  })

  const avgAmortizationWithRepairs = computed(() => {
    const driven = latestEntry.value.odometer - (vehicle.value?.purchased_odometer ?? 0)
    const total = (vehicle.value?.expand?.maintenance_entries ?? []).reduce(
      (a, b) => a + b.price,
      0
    )
    return total / driven
  })

  const avgAmortization = computed(() => {
    const driven = latestEntry.value.odometer - (vehicle.value?.purchased_odometer ?? 0)
    const total = (vehicle.value?.expand?.maintenance_entries ?? [])
      .filter((entry) => entry.category !== 'service')
      .reduce((a, b) => a + b.price, 0)
    return total / driven
  })

  const ownedSince = computed(() => {
    if (vehicle.value?.purchased) {
      return new Date(vehicle.value.purchased).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    }

    return 'N/A'
  })

  const drivenTotal = computed(() => {
    return latestEntry.value.odometer - (vehicle.value?.purchased_odometer ?? 0)
  })

  const allTimeAvg = computed(() => calculateAvg(sorted.value))
  const yearAvg = computed(() => calculateAvg(thisYear.value))

  return {
    sorted,
    latestEntry,
    avgCostPerDistance,
    avgCostPerDistanceYear,
    avgAmortization,
    avgAmortizationWithRepairs,
    ownedSince,
    drivenTotal,
    thisYear,
    allTimeAvg,
    yearAvg,
  }
}
