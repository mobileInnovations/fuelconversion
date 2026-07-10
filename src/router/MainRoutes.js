import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
  path: "/main",
  component: DefaultLayout,
  meta: {
    requiresAuth: true,
  },
  redirect: "/",
  children: [
    {
      path: "",
      name: "Default",
      component: () => import("@/pages/ConversionPage.vue"),
    },
  ],
};
