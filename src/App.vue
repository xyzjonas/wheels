<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white p-2">
      <q-toolbar>
        <q-toolbar-title>
          <div class="flex gap-3 items-center">
            <q-avatar>
              <img alt="logo" class="logo bg-white p-1" src="/logo.svg" />
            </q-avatar>
            <div v-if="selectedVehicle">
              <div class="line-height-[1em] uppercase">{{ selectedVehicle.name }}</div>
              <div class="text-xs ml-1 uppercase">{{ routeLabel }}</div>
            </div>
          </div>
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
      <drawer-content></drawer-content>
    </q-drawer>

    <q-page-container class="overflow-auto">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition mode="out-in">
            <KeepAlive>
              <Suspense>
                <!-- main content -->
                <component :is="Component"></component>

                <!-- loading state -->
                <template #fallback> Loading... </template>
              </Suspense>
            </KeepAlive>
          </Transition>
        </template>
      </RouterView>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import { useQuasar } from 'quasar'
import { useDark } from '@/composables/dark'

import DrawerContent from '@/components/layout/DrawerContent.vue'
import { useVehicles } from './composables/vehicles'


const { currentRoute } = useRouter()
const { selectedVehicle } = useVehicles()

const routeLabel = computed(() => {
  if (currentRoute.value.name === 'vehicle-home') {
    return 'home'
  }

  if (currentRoute.value.name === 'vehicle-fuel') {
    return 'fuel'
  }

  if (currentRoute.value.name === 'vehicle-maintenance') {
    return 'maintenance'
  }
})

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
