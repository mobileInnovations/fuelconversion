import AuthLayout from "@/layouts/AuthLayout.vue";

const AuthRoutes = {
  path: "/auth",
  component: AuthLayout,
  meta: {
    requiresAuth: false,
  },
  children: [
    {
      path: "login",
      component: () => import("@/pages/LoginPage.vue"),
    },
    {
      path: "pages/error",
      component: () => import("@/pages/404Page.vue"),
    },
  ],
};

export default AuthRoutes;
