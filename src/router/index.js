import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'

import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import Home from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'LandingView',
    component: LandingView
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    console.log("Déja connecté");
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    console.log("Pas connecté !");
    next('/login')
    return;
  }
  next();
})

export default router
