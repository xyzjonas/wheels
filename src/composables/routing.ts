import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVehicles } from './vehicles'

export const useRoutingGuard = () => {
  const { selectedVehicleId, selectedVehicle } = useVehicles()

  const router = useRouter()
  const vehicleId = computed<string>(() => router.currentRoute.value.params.id as string)
  const refuleItemId = computed<string>(() => router.currentRoute.value.params.refuelId as string)


  const toVehicles = () => router.push({ name: 'vehicles' })
  const toHome = (id: string) => router.push({ name: 'vehicle-home', params: { id } })

  const getVehicleOrRouteAway = (alwaysRoute?: boolean) => {
    selectedVehicleId.value = router.currentRoute.value.params.id as string

    if (!selectedVehicle.value) {
      selectedVehicleId.value = ''
      toVehicles()
    } else if (alwaysRoute) {
      toHome(selectedVehicle.value.id)
    }
  }


  const getRefuelItemOrRouteAway = () => {
    if (!selectedVehicle.value) {
      toVehicles()
      return
    }

    const entries = selectedVehicle.value?.expand?.fuel_entries ?? []

    if (entries.length <= 0 || !refuleItemId.value) {
      toHome(selectedVehicle.value.id)
      return
    }

    const match = entries.find(e => e.id === refuleItemId.value)
    if (!match) {
      toHome(selectedVehicle.value.id)
    }

  }



  return {
    vehicleId,
    refuleItemId,
    getVehicleOrRouteAway,
    getRefuelItemOrRouteAway
  }
}
