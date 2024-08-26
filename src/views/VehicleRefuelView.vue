<template>
  <div>
    <refuel-form v-model="newEntry" @cancel="goBack"></refuel-form>
  </div>
</template>

<script setup lang="ts">
import RefuelForm from '@/components/vehicle/RefuelForm.vue';
import type { FuelEntry } from '@/types';
import { date } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const newEntry = ref<Partial<FuelEntry>>({
  full_tank: true,
  reset: false,
  refueled: date.formatDate(new Date(), "YYYY/MM/DD"),
})

const router = useRouter()
const goBack = () => {
  router.push({ name: 'vehicle-home', params: { id: router.currentRoute.value.params.id } })
}

</script>

<style lang="scss" scoped>

</style>