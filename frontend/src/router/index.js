import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("@/pages/MainPage.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/pages/SignupPage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/LoginPage.vue"),
    },
    {
      path: "/record",
      name: "record",
      component: () => import("@/pages/RecordPage.vue"),
    },
    {
      path: "/stats",
      name: "stats",
      component: () => import("@/pages/StaticsPage.vue"),
    },
    {
      path: "/expense",
      name: "expense",
      component: () => import("@/pages/ExpensePage.vue"),
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("@/pages/DetailPage.vue"),
    },
  ],
});

export default router;
