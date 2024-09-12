import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthServer.vue";
import AdminView from "../views/AdminView.vue";
import StudentView from "../views/StudentView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
    },
    {
      path: "/student/:id",
      name: "student",
      component: StudentView,
      props: true,
    },
  ],
});

// 全局導航守衛
router.beforeEach((to, from, next) => {
  const storedToken = localStorage.getItem("token");
  if (!storedToken && to.name !== "auth") {
    next({ name: "auth" });
  } else {
    next();
  }
});

export default router;
