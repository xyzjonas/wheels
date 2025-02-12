<template>
  <card class="py-5 px-8 card flex flex-col">
    <div class="title uppercase text-nowrap">{{ title }}</div>
    <div class="flex items-center flex-1">
      <div class="flex items-baseline gap-1 flex-nowrap">
        <div class="self-center text-xl">
          <q-icon :name="icon" class="self-baseline"></q-icon>
        </div>
        <div class="value self-start text-nowrap">{{ formattedValue }}</div>
        <span v-if="unit" class="unit uppercase self-center">{{ unit }}</span>
      </div>
    </div>
    <div v-if="subtitle" class="uppercase text-xs text-gray">{{ subtitle }}</div>
  </card>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue'
import { round } from '@/utils/math';
import { computed } from 'vue';

const props = defineProps<{
  title: string
  value: number | string | number
  icon: string
  unit?: string
  subtitle?: string
}>()

const formattedValue = computed((): number | string => {
  if (typeof props.value === "number") {
    return props.value >= 0 ? round(props.value, 2).toLocaleString() : 'N/A'
  }
  return props.value
})
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
