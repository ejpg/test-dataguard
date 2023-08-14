import { createRouter, createWebHistory } from 'vue-router'
import PluginsView from '../views/PluginsView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:tab',
      name: 'tab',
      component: PluginsView
    }
  ]
})

export default router
