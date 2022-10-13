import { createRouter, createWebHistory } from "vue-router";
import routerAsset from "./routerAsset";
import routerReport from "./routerReport";
const routes = [
  {
    path: "",
    component: () => import("@/components/layouts/MainLayout.vue"),
    children: [...routerAsset,...routerReport],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
