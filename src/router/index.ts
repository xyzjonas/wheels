import { createRouter, createWebHistory } from 'vue-router'
import VehicleHomeView from '../views/VehicleHomeView.vue'
import VehiclesGridView from '@/views/VehiclesGridView.vue'
import VehicleFuelView from '@/views/VehicleFuelView.vue'
import VehicleMaintenanceView from '@/views/VehicleMaintenanceView.vue'
import VehicleRefuelView from '@/views/VehicleRefuelView.vue'
import Root from '@/views/Root.vue'
import VehicleEditView from '@/views/VehicleEditView.vue'
import VehicleRefuelEditView from '@/views/VehicleRefuelEditView.vue'
import VehicleFuelEntryView from '@/views/VehicleFuelEntryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Root,
    },
    {
      path: '/vehicles',
      name: 'vehicles',
      component: VehiclesGridView,
    },
    {
      path: '/vehicles/:id/fuel',
      name: 'vehicle-fuel',
      component: VehicleFuelView,
    },
    {
      path: '/vehicles/:id/fuel/:refuelId',
      name: 'vehicle-fuel-detail',
      component: VehicleFuelEntryView,
    },
    {
      path: '/vehicles/:id/fuel/add',
      name: 'vehicle-refuel',
      component: VehicleRefuelView,
    },
    {
      path: '/vehicles/:id/fuel/:refuelId/edit',
      name: 'vehicle-refuel-edit',
      component: VehicleRefuelEditView,
    },
    {
      path: '/vehicles/:id/edit',
      name: 'vehicle-edit',
      component: VehicleEditView,
    },
    {
      path: '/vehicles/:id/maintenance',
      name: 'vehicle-maintenance',
      component: VehicleMaintenanceView,
    },
    {
      path: '/vehicles/:id',
      name: 'vehicle-home',
      component: VehicleHomeView,
    },
  ]
})

export default router
