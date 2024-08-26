<template>
  <card class="bg-primary text-secondary p-5">
    <div class="text-[4rem] uppercase font-500 tracking-tighter w-fit line-height-[3.5rem] mb-5">{{ title }}</div>
    <slot></slot>
  </card>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue';

defineProps<{ title: string }>()
</script>
