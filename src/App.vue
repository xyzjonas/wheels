<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <drawer-content></drawer-content>
    </q-drawer>

    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <KeepAlive :exclude="['RefuelForm']">
            <Suspense>
              <q-page-container>
                <component :is="Component"></component>
              </q-page-container>
              <template #fallback> Loading... </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>

    <q-page-sticky position="bottom-left" :offset="[8, 8]">
      <q-btn color="primary" fab-mini @click="toggleRightDrawer" :icon="rightDrawerOpen ? 'close' : 'menu'" />
    </q-page-sticky>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterView } from 'vue-router'

import { Notify, useQuasar } from 'quasar'

import DrawerContent from '@/components/layout/DrawerContent.vue'
import { useVehicles } from './composables/vehicles'
import type { Vehicle } from './types'
import { useLocalStorage } from '@vueuse/core'

Notify.setDefaults({
  classes: 'w-full text-md font-bold',
  progress: true,
  icon: 'chat_bubble'
})

const { fetch } = useVehicles()

fetch()

const { selectedVehicle } = useVehicles()

const primaryColor = useLocalStorage('primary-color', '#5e44ff')
watch(selectedVehicle, (val: Vehicle | undefined) => {
  if (val && val.setting_color) {
    primaryColor.value = val.setting_color
    document.body.style.setProperty('--q-primary', `${val.setting_color}`)
  } else {
    primaryColor.value = '#5e44ff'
    document.body.style.setProperty('--q-primary', '#5e44ff')
  }
})

// const routeLabel = computed(() => {
//   if (currentRoute.value.name === 'vehicle-home') {
//     return 'home'
//   }

//   if (currentRoute.value.name === 'vehicle-fuel') {
//     return 'fuel'
//   }

//   if (currentRoute.value.name === 'vehicle-maintenance') {
//     return 'maintenance'
//   }
// })

const $q = useQuasar()
$q.iconMapFn = (iconName) => {
  if (iconName.startsWith('i-hugeicons')) {
    return {
      cls: iconName
    }
  }
}

const rightDrawerOpen = ref(false)
if ($q.screen.gt.sm) {
  rightDrawerOpen.value = true
}

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>

<style lang="css">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

body::-webkit-scrollbar {
  width: 0px;
}

body::-webkit-scrollbar-thumb {
  background-color: v-bind('primaryColor');
}
</style>
