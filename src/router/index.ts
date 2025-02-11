import { createRouter, createWebHistory } from 'vue-router'
import VehicleHomeView from '@/views/vehicle/VehicleHomeView.vue'
import VehiclesGridView from '@/views/VehiclesGridView.vue'
import VehicleFuelView from '@/views/vehicle/VehicleFuelView.vue'
import VehicleMaintenanceView from '@/views/vehicle/VehicleMaintenanceView.vue'
import Root from '@/views/Root.vue'
import VehicleSettingsView from '@/views/vehicle/VehicleSettingsView.vue'
import VehicleRefuelCreateView from '@/views/fuel/VehicleRefuelCreateView.vue'
import VehicleRefuelDetailView from '@/views/fuel/VehicleRefuelDetailView.vue'
import VehicleRefuelEditView from '@/views/fuel/VehicleRefuelEditView.vue'
import VehicleCalculatorView from '@/views/vehicle/VehicleCalculatorView.vue'
import VehicleMaintenanceCreateView from '@/views/maintenance/VehicleMaintenanceCreateView.vue'
import VehicleMaintenanceDetailView from '@/views/maintenance/VehicleMaintenanceDetailView.vue'
import { useTitle } from '@vueuse/core'
import VehicleMaintenanceEditView from '@/views/maintenance/VehicleMaintenanceEditView.vue'
import VehicleBaseView from '@/views/vehicle/VehicleBaseView.vue'

const pageTitle = useTitle()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Root,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: VehiclesGridView,
      meta: {
        title: 'Vehicles'
      }
    },
    {
      path: '/vehicles/:id',
      component: VehicleBaseView,
      props: true,
      children: [
        {
          path: '',
          name: 'vehicle-home',
          component: VehicleHomeView,
          meta: {
            title: 'Home'
          }
        },
        {
          path: '/vehicles/:id/fuel',
          name: 'vehicle-fuel',
          component: VehicleFuelView,
          meta: {
            title: 'Fuel'
          }
        },
        {
          path: '/vehicles/:id/maintenance',
          name: 'vehicle-maintenance',
          component: VehicleMaintenanceView,
          meta: {
            title: 'Maintenance'
          }
        },
        {
          path: '/vehicles/:id/edit',
          name: 'vehicle-edit',
          component: VehicleSettingsView,
          meta: {
            title: 'Edit'
          }
        },
        {
          path: '/vehicles/:id/calculator',
          name: 'vehicle-calculator',
          component: VehicleCalculatorView,
          meta: {
            title: 'Calculator'
          }
        }
      ]
    },
    {
      path: '/vehicles/:id/fuel/:refuelId',
      name: 'vehicle-fuel-detail',
      component: VehicleRefuelDetailView,
      meta: {
        title: 'Fuel Detail'
      }
    },
    {
      path: '/vehicles/:id/fuel/create',
      name: 'vehicle-refuel',
      component: VehicleRefuelCreateView,
      meta: {
        title: 'Refuel'
      }
    },
    {
      path: '/vehicles/:id/fuel/:refuelId/edit',
      name: 'vehicle-refuel-edit',
      component: VehicleRefuelEditView,
      meta: {
        title: 'Fuel Edit'
      }
    },
    {
      path: '/vehicles/:id/maintenance/create',
      name: 'vehicle-maintenance-create',
      component: VehicleMaintenanceCreateView,
      meta: {
        title: 'New Maintenance'
      }
    },
    {
      path: '/vehicles/:id/maintenance/:maintenanceId',
      name: 'vehicle-maintenance-detail',
      component: VehicleMaintenanceDetailView,
      meta: {
        title: 'Maintenance Detail'
      }
    },
    {
      path: '/vehicles/:id/maintenance/:maintenanceId/edit',
      name: 'vehicle-maintenance-edit',
      component: VehicleMaintenanceEditView,
      meta: {
        title: 'Maintenance Edit'
      }
    }
  ]
})

router.afterEach((to, from) => {
  let title = 'Wheels'
  if (to.meta.title) {
    title += ` | ${to.meta.title}`
  }

  pageTitle.value = title
})

export default router
