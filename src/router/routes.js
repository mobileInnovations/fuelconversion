import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

export const routes = [
  {
    path: "/auth/login",
    component: AuthLayout,
    children: [
      {
        path: "",
        component: () => import("@/pages/LoginPage.vue"),
      },
    ],
  },

  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        component: () => import("@/pages/ConversionPage.vue"),
      },
    ],
  },

  {
    path: "/404",
    component: EmptyLayout,
    children: [
      {
        path: "",
        component: () => import("@/pages/404Page.vue"),
      },
    ],
  },
];
