import { createRouter, createWebHistory } from "vue-router";

const loginPageRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/pages/Admin/login.vue"),
    },
  ],
});

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default loginPageRouter;
