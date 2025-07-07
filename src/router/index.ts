import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      meta: { middleware: "auth" },
      children: [
        {
          path: "/",
          name: "Beranda",
          component: () => import('@/views/Main/Home/HomeView.vue'),
          meta: { pageTitle: "Beranda" },
        },
        {
          path: "/search",
          name: "Search",
          component: () => import('@/views/Main/Search/SearchView.vue'),
          meta: { pageTitle: "Search" },
        },
        {
          path: "/:username",
          name: "UserProfile",
          component: () => import('@/views/Main/User/UserProfile.vue'),
          meta: { pageTitle: "Profile" },
        },
      ]
    },
    {
      path: '/',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: "/signin",
          name: "signin",
          component: () => import('@/views/Auth/SignInView.vue'),
          meta: { pageTitle: "Sign In" },
        },
        {
          path: "/signup",
          name: "signup",
          component: () => import('@/views/Auth/SignUpView.vue'),
          meta: { pageTitle: "Sign In" },
        },
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  const authStore   = useAuthStore();
  authStore.verifyAuth();
  if (to.meta.middleware == "auth") {
    if   (authStore.isAuthenticated) next();
    else next({ name: "signin" });
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router
