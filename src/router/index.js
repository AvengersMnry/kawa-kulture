import { createRouter, createWebHistory } from "@ionic/vue-router";
import { getAuth } from "firebase/auth";

const auth = getAuth();

// Auth guard
const requireAuth = (to, from, next) => {
  let user = auth.currentUser;
  if (!user) {
    next({ name: "LandingView" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "LandingView",
      component: () => import("@/views/LandingView.vue"),
    },
    {
      path: "/signup",
      name: "SignUpView",
      component: () => import("@/views/SignUpView.vue"),
    },
    {
      path: "/login",
      name: "LoginView",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/home",
      redirect: "/tabs/tab1",
      beforeEnter: requireAuth,
    },
    {
      path: "/tabs/",
      component: () => import("@/views/TabsPage.vue"),
      beforeEnter: requireAuth,
      children: [
        {
          path: "",
          redirect: "tab1",
        },
        {
          path: "tab1",
          component: () => import("@/views/RecipesView.vue"),
        },
        {
          path: "tab2",
          component: () => import("@/views/CoffeesView.vue"),
        },
        {
          path: "tab3",
          component: () => import("@/views/CounterView.vue"),
        },
        {
          path: "tab4",
          component: () => import("@/views/Profil/ProfilView.vue"),
        },
        {
          path: "tab4/favorite",
          component: () => import("@/views/Profil/FavoriteRecipeView.vue"),
        },
      ],
    },
  ],
});

export default router;
