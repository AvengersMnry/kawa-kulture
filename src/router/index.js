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
      path: '/profil',
      redirect: '/tabs/tab4',
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
          component: () => import('@/views/Tab1Page.vue')
        },
        {
          path: 'tab2',
          component: () => import('@/views/Tab2Page.vue')
        },
        {
          path: 'tab3',
          component: () => import('@/views/Tab3Page.vue')
        },
        {
          path: 'tab4',
          component: () => import('@/views/ProfilView.vue')
        }
      ]
    },
  ]
})


// router.beforeEach((to, from, next) => {
//   if (to.path === '/login' && auth.currentUser) {
//     next('/')
//     console.log("Déja connecté");
//     return;
//   }

//   if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
//     console.log("Pas connecté !");
//     next('/login')
//     return;
//   }
//   next();
// })

export default router
