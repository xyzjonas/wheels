<template>
  <div>
    <q-img
    @click="router.push({ name: 'vehicle-maintenance', params: { id: vehicle.id } })"
    fit="cover"
    height="100%"
    class="border-rd-[4px] hover:cursor-pointer"
    src="https://theosautomotive.com.au/images/slider/engine_maintenance.jpg"
    >
    <div class="p-2 w-full h-full">
      <q-icon name="i-hugeicons-check-list" class="text-xl"></q-icon>
      <div class="text-xl uppercase">maintenance</div>
      <div class="absolute-bottom-right p-2 pr-3 flex items-center gap-2 text-positive">
        <span class="font-600">OK</span>
        <q-icon name="i-hugeicons-checkmark-circle-04" class="text-xl"></q-icon>
      </div>
    </div>
  </q-img>
</div>
</template>

<script setup lang="ts">
import type { Vehicle } from '@/types';
import { useRouter } from 'vue-router';

const router = useRouter()
defineProps<{
  vehicle: Vehicle
}>()
</script>

<style lang="scss" scoped></style>
