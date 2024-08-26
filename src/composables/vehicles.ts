import { useLocalStorage } from '@vueuse/core'
import PocketBase from 'pocketbase'

import type { Vehicle } from '../types'
import { computed } from 'vue'

const vehicles = useLocalStorage<Vehicle[]>('vehicles', [])
const selectedVehicleId = useLocalStorage<string>('selectedVehicle', '')

export const useVehicles = () => {
  const pb = new PocketBase()

  async function fetch() {
    vehicles.value = await pb
      .collection<Vehicle>('vehicles')
      .getFullList({ expand: 'fuel_entries' })
  }

  const selectedVehicle = computed<Vehicle | undefined>(() =>
    vehicles.value.find((veh) => veh.id === selectedVehicleId.value)
  )

  return {
    vehicles,
    selectedVehicleId,
    selectedVehicle,
    fetch
  }
}
