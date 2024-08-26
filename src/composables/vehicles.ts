import { useLocalStorage } from '@vueuse/core'
import PocketBase from 'pocketbase'

import type { CreateFuelEntry, FuelEntry, PbFetchError, Vehicle } from '../types'
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useApi } from '@/composables/api'

const vehicles = useLocalStorage<Vehicle[]>('vehicles', [])
const selectedVehicleId = useLocalStorage<string>('selectedVehicle', '')
// const isOffline = ref(false)


const DEFAULT_CURRENCY = "EUR"
const DEFAULT_POSITION = "after"
const DEFAULT_MEASUREMENT = "metric"


export const useVehicles = () => {
  const pb = new PocketBase()
  const $q = useQuasar()
  const { errorNotify, isOffline } = useApi()


  const updateVehicle = (newEntry: Vehicle) => {
    vehicles.value = vehicles.value.map(old => {
      if (old.id === newEntry.id) {
        return newEntry
      }
      return old
    })
  }

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
      errorNotify(err)
    }
  }

  async function editVehicle(vehicleId: string, entry: Partial<Vehicle>) {
    try {
      const updatedVehicle = await pb.collection<Vehicle>('vehicles').update(vehicleId, entry, {expand: 'fuel_entries'})

      updateVehicle(updatedVehicle)

      $q.notify({
        type: 'positive',
        message: `Vehicle ${updatedVehicle.name} updated.`,
      })

    } catch(err: any) {
      errorNotify(err)
    }
  }

  async function addFuelEntry(vehicleId: string, entry: CreateFuelEntry) {
    const newEntry = JSON.parse(JSON.stringify(entry))
    try {
      newEntry.refueled = new Date(newEntry.refueled).toUTCString()

      const res = await pb.collection<FuelEntry>('fuel_entries').create(newEntry)
      const updatedVehicle = await pb.collection<Vehicle>('vehicles').update(vehicleId, {
        'fuel_entries+': res.id,
      }, {
        expand: 'fuel_entries'
      })

      updateVehicle(updatedVehicle)

      $q.notify({
        type: 'positive',
        message: 'New fuel entry added.',
      })

    } catch(err: any) {
      errorNotify(err)
    }
  }

  const selectedVehicle = computed<Vehicle | undefined>(() =>
    vehicles.value.find((veh) => veh.id === selectedVehicleId.value)
  )

  const measurement = computed(() => selectedVehicle.value?.setting_measurement ?? DEFAULT_MEASUREMENT)

  const settings = computed(() => {
    if (measurement.value === 'imperial') {
      return {
        currency: {
          name: selectedVehicle.value?.setting_currency ?? DEFAULT_CURRENCY,
          position: selectedVehicle.value?.setting_currency_position ?? DEFAULT_POSITION,
        },
        units: {
          dist: {
            short: 'mi.',
            long: 'miles',
          },
          vol: {
            short: 'gal',
            long: 'gallons',
          },
          consumption: {
            short: 'mpg',
            long: 'miles per gallon',
          }
        }
      }
    }

    return {
      currency: {
        name: selectedVehicle.value?.setting_currency ?? DEFAULT_CURRENCY,
        position: selectedVehicle.value?.setting_currency_position ?? DEFAULT_POSITION,
      },
      units: {
        dist: {
          short: 'km',
          long: 'kilometers',
        },
        vol: {
          short: 'l',
          long: 'litres',
        },
        consumption: {
          short: 'l/100km',
          long: 'litres per 100 km',
        }
      }
    }
  })

  
  function getThumbnail(li: Vehicle) {
    return `/api/files/${li.collectionId}/${li.id}/${li.icon}?thumb=128x128`
  }

  return {
    vehicles,
    selectedVehicleId,
    selectedVehicle,
    // currency,
    // currencyPosition,
    // unitAmount,
    // unitConsumption,
    // unitDistance,
    settings,
    fetch,
    editVehicle,
    addFuelEntry,
    getThumbnail,
  }
}
