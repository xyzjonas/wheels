<template>
  <card class="p-5 card">
    <div class="title uppercase">{{ title }}</div>
    <div class="grid content-center h-full w-full">
      <div class="flex items-baseline gap-1">
        <div class="self-center text-xl">
          <q-icon :name="icon" class="self-baseline"></q-icon>
        </div>
        <div class="value self-start">{{ value }}</div>
        <span v-if="unit" class="unit uppercase self-center">{{ unit }}</span>
      </div>
    </div>
  </card>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue'

defineProps<{
  title: string
  value: number
  icon: string
  unit?: string
}>()
</script>

<style lang="css" scoped>
.title, .unit {
  font-size: small;
}

.unit {
  opacity: .8;
}

.value {
  font-size: max(min(5vw, 4rem), 2rem);
}
</style>
