import { useLocalStorage } from '@vueuse/core'
import PocketBase from 'pocketbase'

import type { CreateFuelEntry, FuelEntry, PbFetchError, Vehicle } from '../types'
import { computed, handleError, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useApi } from '@/composables/api'

const vehicles = useLocalStorage<Vehicle[]>('vehicles', [])
const selectedVehicleId = useLocalStorage<string>('selectedVehicle', '')

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
      const data: Vehicle = JSON.parse(JSON.stringify(entry))
      if (data.purchased) {
        data.purchased = new Date(data.purchased).toUTCString()
      }
      const updatedVehicle = await pb.collection<Vehicle>('vehicles').update(vehicleId, data, {expand: 'fuel_entries'})

      updateVehicle(updatedVehicle)

      $q.notify({
        type: 'positive',
        message: `Vehicle ${updatedVehicle.name} updated.`,
      })

    } catch(err: any) {
      errorNotify(err)
    }
  }

  async function fetchFuelEntry(id: string) {
    try {
      return await pb.collection<FuelEntry>('fuel_entries').getOne(id)
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

  async function editFuelEntry(vehicleId: string, entryId: string, entry: CreateFuelEntry) {
    const newEntry = JSON.parse(JSON.stringify(entry))
    try {
      newEntry.refueled = new Date(newEntry.refueled).toUTCString()

      const updatedItem = await pb.collection<FuelEntry>('fuel_entries').update(entryId, newEntry)

      vehicles.value.forEach(veh => {
        if (veh.id === vehicleId) {
          if (veh.expand?.fuel_entries) {
            veh.expand.fuel_entries = veh.expand?.fuel_entries.map(oldItem => {
              if (oldItem.id === updatedItem.id) {
                return updatedItem;
              }
              return oldItem
            })
          }
        }
      })

      $q.notify({
        type: 'positive',
        message: 'Fuel entry updated.',
      })

    } catch(err: any) {
      errorNotify(err)
    }
  }


  async function removeFuelEntry(vehicleId: string, entryId: string) {
    try {
      await pb.collection<FuelEntry>('fuel_entries').delete(entryId)

      vehicles.value.forEach(veh => {
        if (veh.id === vehicleId) {
          if (veh.expand?.fuel_entries) {
            veh.expand.fuel_entries = veh.expand?.fuel_entries.filter(oldItem => oldItem.id !== entryId)
          }
        }
      })

      $q.notify({
        type: 'positive',
        message: 'Fuel entry removed.',
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

  async function uploadThumbnail(vehicleId: string, imageFile: any) {
    const formData = new FormData();
    formData.append('icon', imageFile)
    try {
      const updatedVehicle = await pb.collection<Vehicle>('vehicles').update(vehicleId, formData)
      updateVehicle(updatedVehicle)
      $q.notify({
        type: 'positive',
        message: 'Vehicle icon updated.',
      })
    } catch (err: unknown) {
      errorNotify(err)
    }
  }
  
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
    fetchFuelEntry,
    editFuelEntry,
    removeFuelEntry,
    addFuelEntry,
    getThumbnail,
    uploadThumbnail,
  }
}
