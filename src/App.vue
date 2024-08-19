<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white p-2">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar class="mr-2">
            <img alt="Vue logo" class="logo bg-white p-2" src="@/assets/logo.svg" />
          </q-avatar>
          App
        </q-toolbar-title>

        <q-btn
          dense
          flat
          :icon="isDark ? 'i-hugeicons-moon-02' : 'i-hugeicons-sun-01'"
          @click="toggle"
          class="mr-3"
        />
        <q-btn dense flat icon="i-hugeicons-menu-07" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered overlay>
      <!-- drawer content -->
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import { useQuasar } from 'quasar'
import { useDark } from '@/composables/dark'

const { isDark, toggle } = useDark()

const $q = useQuasar()
$q.iconMapFn = (iconName) => {
  return {
    cls: iconName
  }
}

const rightDrawerOpen = ref(false)
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>
