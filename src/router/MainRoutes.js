import DefaultLayout from "@/layouts/DefaultLayout.vue";

const MainRoutes = {
  path: "/main",
  meta: {
    requiresAuth: true,
  },
  redirect: "/main/dashboard/default",
  component: () => DefaultLayout,
  children: [
    {
      name: "Default",
      path: "/",
      component: () => import("@/pages/ConversionPage.vue"),
    },
  ],
};

export default MainRoutes;
