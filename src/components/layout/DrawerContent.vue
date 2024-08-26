<template>
  <q-scroll-area style="height: calc(100% - 100px); margin-top: 90px; border-right: 1px solid #ddd">
    <q-list padding separator>
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
  </q-scroll-area>

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
        <q-badge>{{ selectedVehicle.registration }}</q-badge>
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
    class="absolute-top m-1 border border-dashed border-[#444]"
    style="height: 150px"
  >
    <div class="text-weight-bold">
      Select a vehicle
      <br />
      <q-icon name="i-hugeicons-shipping-truck-02" />
    </div>
  </q-btn>
</template>

<script setup lang="ts">
import { useVehicles } from '@/composables/vehicles'
import { computed } from 'vue'
import { useRouter } from 'vue-router';

const { selectedVehicle } = useVehicles()

const router = useRouter()

const listItems = computed(() => {
  return [
    {
      label: 'Home',
      icon: 'i-hugeicons-home-06',
      click: () => router.push({ name: 'vehicle-home', params: { id: selectedVehicle.value?.id } }),
      active: router.currentRoute.value.name === 'vehicle-home',
    },
    {
      label: 'Fuel',
      icon: 'i-hugeicons-fuel-station',
      click: () => router.push({ name: 'vehicle-fuel', params: { id: selectedVehicle.value?.id } }),
      active: router.currentRoute.value.name === 'vehicle-fuel',
    },
    {
      label: 'Maintenance',
      icon: 'i-hugeicons-wrench-01',
      click: () => router.push({ name: 'vehicle-maintenance', params: { id: selectedVehicle.value?.id } }),
      active: router.currentRoute.value.name === 'vehicle-maintenance',
    },
    {
      label: 'All vehicles',
      icon: 'i-hugeicons-shipping-truck-02',
      click: () => router.push({ name: 'vehicles' }),
      active: false
    },
  ]
})
</script>

<style lang="css" scoped></style>
