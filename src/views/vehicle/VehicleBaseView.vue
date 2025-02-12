<template>
  <q-page v-if="selectedVehicle" padding>
    <HeroCard :title="title ?? selectedVehicle.name">
      <div class="text-white text-lg mb-5 font-500">{{ selectedVehicle.model }}</div>
      <div class="flex flex-col min-[400px]:flex-row min-[400px]:justify-between items-end gap-3">
        <div class="flex flex-col max-[400px]:items-end">
          <span class="text-xs text-secondary">VIN</span>
          <div class="text-white flex items-center gap-2 uppercase max-[400px]:flex-row-reverse">
            <span class="text-xs">{{ selectedVehicle.vin }}</span>
            <CopyButton :value="selectedVehicle.vin" />
          </div>
        </div>
        <div class="flex flex-col max-[400px]:items-end">
          Registration Number
          <div class="text-white flex items-center justify-end gap-2 uppercase max-[400px]:flex-row-reverse">
            {{ selectedVehicle.registration }}
            <CopyButton :value="selectedVehicle.registration" />
          </div>
        </div>
      </div>
    </HeroCard>
    <router-view></router-view>
  </q-page>
</template>

<script setup lang="ts">
import { useVehicles } from '@/composables/vehicles'
import { useRouter } from 'vue-router'

import HeroCard from '@/components/HeroCard.vue'
import CopyButton from '@/components/CopyButton.vue'
import { computed } from 'vue'
import type { RouteNames } from '@/types'

const props = defineProps<{ id: string }>()

const router = useRouter()

const { selectedVehicle, selectedVehicleId, settings } = useVehicles()

selectedVehicleId.value = props.id

if (!selectedVehicle.value) {
  selectedVehicleId.value = ''
  router.push({ name: 'vehicles' })
}

const title = computed(() => {
  const name = router.currentRoute.value.name as RouteNames
  if (name === 'vehicle-fuel') {
    return 'Fuel Report'
  }

  if (name === 'vehicle-maintenance') {
    return 'vehicle upkeep'
  }

  if (name === 'vehicle-edit') {
    return 'vehicle settings'
  }

  if (name === 'vehicle-calculator') {
    return 'calculator'
  }

  return selectedVehicle.value?.name
})
</script>
