import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

const AuthRoutes = {
  path: "/auth",
  component: AuthLayout,
  meta: {
    requiresAuth: false,
  },
  children: [
    {
      name: "Login",
      path: "/login",
      component: () => import("@/pages/LoginPage.vue"),
    },
    {
      name: "Error 404",
      path: "/pages/error",
      component: () => import("@/pages/404Page.vue"),
    },
  ],
};

export default AuthRoutes;
