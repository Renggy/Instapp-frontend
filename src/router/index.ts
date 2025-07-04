// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

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
          component: () => import('@/views/Main/Home/HomeIndex.vue'),
          meta: { pageTitle: "Beranda" },
        },
        {
          path: "/search",
          name: "Search",
          component: () => import('@/views/Main/Search/SearchIndex.vue'),
          meta: { pageTitle: "Search" },
        },
        {
          path: "/profile",
          name: "Profile",
          component: () => import('@/views/Main/Profile/ProfileIndex.vue'),
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
          component: () => import('@/views/Auth/SignIn.vue'),
          meta: { pageTitle: "Sign In" },
        },
        {
          path: "/signup",
          name: "signup",
          component: () => import('@/views/Auth/SignUp.vue'),
          meta: { pageTitle: "Sign In" },
        },
      ]
    },
  ]
});

export default router
