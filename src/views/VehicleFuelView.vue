<template>
  <main v-if="selectedVehicle" class="p-2 scroll-block">
    <q-card flat bordered class="flex p-2 mb-10">
      <div>
        <div class="text-4xl uppercase flex gap-2">
          <q-icon name="i-hugeicons-fuel"></q-icon>
          Fuel
        </div>
        <div class="ml-1">{{ selectedVehicle.model }}</div>
        <q-badge class="ml-1">{{ selectedVehicle.registration }}</q-badge>
      </div>
    </q-card>

    <q-timeline color="secondary">
      <q-timeline-entry
        v-for="(item, index) in fuelEntries"
        :subtitle="`${new Date(item.refueled).toLocaleDateString()}`"
        :title="`${item.odometer.toLocaleString()} km`"
        :side="index % 2 === 0 ? 'left' : 'right'"
      >
        <div class="flex flex-col">
          <div>
            <q-icon name="i-hugeicons-fuel"></q-icon>
            {{ item.amount }} l
          </div>
          <div>
            <q-icon name="i-hugeicons-coins-01"></q-icon>
            {{ item.price }},- Kč
          </div>
        </div>
      </q-timeline-entry>
    </q-timeline>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useVehicles } from '@/composables/vehicles'
import { useQuasar } from 'quasar'
import { computed } from 'vue'

const router = useRouter()

const { selectedVehicle, selectedVehicleId, fetch } = useVehicles()

selectedVehicleId.value = router.currentRoute.value.params.id as string

await fetch()

if (!selectedVehicle.value) {
  selectedVehicleId.value = ''
  router.push({ name: 'vehicles' })
} else if (!router.currentRoute.value.params.id) {
  router.push({ name: 'vehicle-home', params: { id: selectedVehicle.value.id } })
}

const $q = useQuasar()
// const layout = computed(() => {
//   return $q.screen.lt.sm ? 'dense' : $q.screen.lt.md ? 'comfortable' : 'loose'
// })

const fuelEntries = computed(() => {
  if (!selectedVehicle.value) {
    return []
  }

  return selectedVehicle.value.expand.fuel_entries.sort(
    (a, b) => new Date(b.refueled).getTime() - new Date(a.refueled).getTime()
  )
})
</script>
