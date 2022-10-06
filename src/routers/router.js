import { createRouter, createWebHistory } from "vue-router";
import routerAsset from "./routerAsset";

const routes = [
  {
    path: "",
    component: () => import("@/components/layouts/MainLayout.vue"),
    children: [...routerAsset],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
