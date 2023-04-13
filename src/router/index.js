import { createRouter, createWebHistory } from '@ionic/vue-router'
// import { auth } from 'firebase/auth';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingView',
      component: () => import('@/views/LandingView.vue')
    },
    {
      path: '/signup',
      name: 'SignUpView',
      component: () => import('@/views/SignUpView.vue')
    },
    {
      path: '/login',
      name: 'LoginView',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/home',
      redirect: '/tabs/tab1',
    },
    {
      path: '/tabs/',
      component: () => import('@/views/TabsPage.vue'),
      children: [
        {
          path: '',
          redirect: 'tab1'
        },
        {
          path: 'tab1',
          component: () => import('@/views/ReceipesView.vue')
        },
        {
          path: 'tab2',
          component: () => import('@/views/CoffeesView.vue')
        },
        {
          path: 'tab3',
          component: () => import('@/views/CounterView.vue')
        },
        {
          path: 'tab4',
          component: () => import('@/views/ProfilView.vue')
        }
      ]
    },
  ]
})

export default router
