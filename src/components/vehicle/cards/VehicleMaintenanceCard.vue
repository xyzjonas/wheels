<template>
  <div>
    <q-img
    @click="router.push({ name: 'vehicle-maintenance', params: { id: vehicle.id } })"
    fit="cover"
    height="100%"
    class="border-rd-[4px] hover:cursor-pointer saturate-[0.4]"
    src="@/assets/maintenance.png"
    >
    <div class="p-2 w-full h-full">
      <q-icon name="checklist" class="text-xl"></q-icon>
      <div class="text-xl uppercase">maintenance</div>
      <div class="absolute-bottom-right p-2 pr-3 flex items-center gap-2 text-positive">
        <span class="font-600">OK</span>
        <q-icon name="check_circle_outline" class="text-xl"></q-icon>
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
