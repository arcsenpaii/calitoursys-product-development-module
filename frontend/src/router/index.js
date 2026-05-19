import { createRouter, createWebHistory } from 'vue-router'

import DevelopmentPlanList from '@/modules/product/views/DevelopmentPlanList.vue'
import ImprovementMonitoring from '@/modules/product/views/ImprovementMonitoring.vue'
import ProductDashboard from '@/modules/product/views/ProductDashboard.vue'
import ProductList from '@/modules/product/views/ProductList.vue'
import TourismActivityList from '@/modules/product/views/TourismActivityList.vue'
import TourismPackageList from '@/modules/product/views/TourismPackageList.vue'
import { useAuthStore } from '@/stores/auth'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { public: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/product',
      name: 'product-dashboard',
      component: ProductDashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/product/assets',
      name: 'product-assets',
      component: ProductList,
      meta: { requiresAuth: true },
    },
    {
      path: '/product/development-plans',
      name: 'product-development-plans',
      component: DevelopmentPlanList,
      meta: { requiresAuth: true },
    },
    {
      path: '/product/improvements',
      name: 'product-improvements',
      component: ImprovementMonitoring,
      meta: { requiresAuth: true },
    },
    {
      path: '/product/activities',
      name: 'product-activities',
      component: TourismActivityList,
      meta: { requiresAuth: true },
    },
    {
      path: '/product/packages',
      name: 'product-packages',
      component: TourismPackageList,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login' }
  }

  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
