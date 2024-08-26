<template>
  <div class="flex items-center gap-4">
    <slot></slot>
    <span
      class="flex-1 border-amber bg-black opacity-[.12] dark:bg-white dark:opacity-[.25] transition-colors"
    ></span>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="css" scoped>
span {
  border-bottom: 1px solid;
  height: 1px;
}
</style>
