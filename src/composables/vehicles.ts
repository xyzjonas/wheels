import { useLocalStorage } from '@vueuse/core'
import PocketBase from 'pocketbase'

import type { Vehicle } from '../types'
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'

const vehicles = useLocalStorage<Vehicle[]>('vehicles', [])
const selectedVehicleId = useLocalStorage<string>('selectedVehicle', '')
const isOffline = ref(false)

export const useVehicles = () => {
  const pb = new PocketBase()
  const $q = useQuasar()

  async function fetch() {
    try {
      vehicles.value = await pb
        .collection<Vehicle>('vehicles')
        .getFullList({ expand: 'fuel_entries' })
      
      if (isOffline.value) {
        isOffline.value = false
        $q.notify({
          type: 'positive',
          message: 'Back online.',
        })
      }
    } catch(err: unknown) {
      isOffline.value = true
      $q.notify({
        type: 'negative',
        message: 'You are offline!',
      })
    }
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
