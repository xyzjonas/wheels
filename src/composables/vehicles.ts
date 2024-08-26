import { useLocalStorage } from '@vueuse/core'
import PocketBase from 'pocketbase'

import type { CreateFuelEntry, FuelEntry, PbFetchError, Vehicle } from '../types'
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

  async function addFuelEntry(vehicleId: string, entry: CreateFuelEntry) {
    const newEntry = JSON.parse(JSON.stringify(entry))
    try {
      newEntry.refueled = new Date(newEntry.refueled).toUTCString()

      const res = await pb.collection<FuelEntry>('fuel_entries').create(newEntry)
      const updatedVehicle = await pb.collection<Vehicle>('vehicles').update(vehicleId, {
        'fuel_entries+': res.id,
      })

      vehicles.value.forEach(veh => {
        if (veh.id === updatedVehicle.id) {
          veh.fuel_entries.push(res.id)
          veh.expand?.fuel_entries.push(res)
        }
      })

      $q.notify({
        type: 'positive',
        message: 'New fuel entry added.',
      })

    } catch(err: any) {
      const details = err as PbFetchError;

      let message: string = "Something wrong happened...";
      if (!details.status) {
        isOffline.value = true
        message = 'You are offline!'
      } else {
        isOffline.value = false
      }

      if (details.status >= 500) {
        message = 'Server error, this is not your fault.'
      } else if (details.status >= 400) {
        message = `Client error, ${details.message.toLowerCase()}`
      }

      $q.notify({
        type: 'negative',
        message: message,
      })

      throw err
    }
  }

  const selectedVehicle = computed<Vehicle | undefined>(() =>
    vehicles.value.find((veh) => veh.id === selectedVehicleId.value)
  )

  function getThumbnail(li: Vehicle) {
    return `/api/files/${li.collectionId}/${li.id}/${li.icon}?thumb=128x128`
  }

  return {
    vehicles,
    selectedVehicleId,
    selectedVehicle,
    fetch,
    addFuelEntry,
    getThumbnail,
  }
}
