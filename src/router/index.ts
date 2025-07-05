import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/layouts/MainLayout.vue'),
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
          path: "/profile",
          name: "Profile",
          component: () => import('@/views/Main/Profile/ProfileView.vue'),
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

export default router
