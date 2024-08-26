<template>
  <q-list padding separator style="height: calc(100% - 90px); margin-top: 90px; border-right: 1px solid #ddd">
    <q-item
      v-for="item in listItems"
      clickable
      v-ripple
      @click="item.click"
      :active="item.active"
    >
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>
      <q-item-section>{{ item.label }}</q-item-section>
    </q-item>
  </q-list>

  <q-list padding separator class="absolute-bottom">

      <q-item
      clickable
      v-ripple
      @click="router.push({ name: 'vehicles' })"
      :active="router.currentRoute.value.name === 'vehicles'"
      >
      <q-item-section avatar>
        <q-icon name="i-hugeicons-car-03" />
      </q-item-section>
      <q-item-section>All vehicles</q-item-section>
    </q-item>
    
    <q-item
    clickable
    v-ripple
    @click="toggle"
    >
    <q-item-section avatar>
        <q-icon :name="isDark ? 'i-hugeicons-moon-02' : 'i-hugeicons-sun-01'" />
      </q-item-section>
      <q-item-section>{{ isDark ? 'Dark' : 'Light' }} mode</q-item-section>
    </q-item>
  </q-list>

  <q-img
    v-if="selectedVehicle"
    class="absolute-top"
    src="https://png.pngtree.com/thumb_back/fh260/background/20230618/pngtree-grey-abstract-background-design-vector-image_4132433.jpg"
    style="height: 100px"
  >
    <div class="absolute-bottom bg-transparent flex items-center justify-between">
      <div>
        <div class="text-weight-bold">{{ selectedVehicle.name }}</div>
        <div>{{ selectedVehicle.model }}</div>
        <q-badge color="secondary" rounded class="px-3">{{ selectedVehicle.registration }}</q-badge>
      </div>
      <q-img
        ratio="1"
        src="https://smartson.se/images/historic/articles/analysis-archive-tudor-2/ford-focus-2005-front.jpg"
        class="border-rd-full"
        style="height: 70px; max-width: 70px"
      />
    </div>
  </q-img>
  <q-btn
    v-else
    flat
    class="disabled pointer-events-none absolute-top m-1 border border-dashed border-[#aaa]"
    style="height: 90px"
    label="Vehicle not selected"
    @click="router.push({ name: 'vehicles' })"
  />
</template>

<script setup lang="ts">
import { useDark } from '@/composables/dark';
import { useVehicles } from '@/composables/vehicles'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const { isDark, toggle } = useDark()

const { selectedVehicle } = useVehicles()

const router = useRouter()

const listItems = computed(() => {
  const items = []
  if (selectedVehicle.value) {
    items.push(
      {
        label: 'Overview',
        icon: 'ion-planet-outline',
        click: () =>
          router.push({ name: 'vehicle-home', params: { id: selectedVehicle.value?.id } }),
        active: router.currentRoute.value.name === 'vehicle-home'
      },
      {
        label: 'Fuel',
        icon: 'i-hugeicons-fuel-station',
        click: () =>
          router.push({ name: 'vehicle-fuel', params: { id: selectedVehicle.value?.id } }),
        active: router.currentRoute.value.name === 'vehicle-fuel'
      },
      {
        label: 'Maintenance',
        icon: 'i-hugeicons-wrench-01',
        click: () =>
          router.push({ name: 'vehicle-maintenance', params: { id: selectedVehicle.value?.id } }),
        active: router.currentRoute.value.name === 'vehicle-maintenance'
      }
    )
  }

  return items
})
</script>

<style lang="css" scoped></style>
