<template>
  <q-layout ref="body" view="hHh lpR fFf">
    <!-- <q-header class="bg-primary text-white p-2 flex">
      <q-btn
        v-if="$q.screen.lt.md"
        flat
        size="10px"
        @click="toggleRightDrawer"
        class="ml-auto"
      >
      <div class="flex item-center gap-1">
        <q-icon name="i-hugeicons-arrow-left-double"></q-icon> MENU
      </div>
    </q-btn>
    </q-header> -->
    <!-- <q-header class="bg-primary text-white p-2">
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
        <q-btn
          dense
          flat
          :icon="rightDrawerOpen ? 'i-hugeicons-cancel-01' : 'i-hugeicons-menu-07'"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header> -->
    <!-- <div class="absolute-bottom-right p-2">
      <q-btn
        color="primary"
        fab-mini
        @click="toggleRightDrawer"
        icon="i-hugeicons-menu-01"
        style="right: 0px"
      />
    </div> -->

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <drawer-content></drawer-content>
      <!-- <div class="absolute-left lg:hidden" style="transform: translateX(-17px) translateY(50%)">
        <q-btn
          dense
          round
          unelevated
          color="primary"
          icon="i-hugeicons-arrow-right-01"
          @click="toggleRightDrawer"
        />
      </div> -->
    </q-drawer>

      <RouterView v-slot="{ Component }" class="h-full">
        <template v-if="Component">
          <Transition mode="out-in">
            <KeepAlive :exclude="['RefuelForm']">
              <Suspense>
                <!-- main content -->
                  <q-page-container class="page flex flex-col">
                   <component :is="Component"></component>
                </q-page-container>
                <!-- loading state -->
                <template #fallback> Loading... </template>
              </Suspense>
            </KeepAlive>
          </Transition>
        </template>
      </RouterView>

  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import { useQuasar } from 'quasar'
// import { useDark } from '@/composables/dark'

import DrawerContent from '@/components/layout/DrawerContent.vue'
import { useVehicles } from './composables/vehicles';
import type { Vehicle } from './types';
import { useLocalStorage, useSwipe } from '@vueuse/core';
// import { useVehicles } from './composables/vehicles'

const { fetch } = useVehicles()

fetch();


const { currentRoute } = useRouter()
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


const body = ref(null)
const { isSwiping, direction } = useSwipe(body)
watch(isSwiping, () => {
  if (direction.value === 'left') {
    rightDrawerOpen.value = true
  }
})

</script>

<style lang="css">

.page {
  min-height: 100dvh;
  position: relative;
}

.v-enter-active,
.v-leave-active {
  transition: opacity .5s ease;
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
