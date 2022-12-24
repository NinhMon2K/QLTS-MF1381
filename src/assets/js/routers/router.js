import { createRouter, createWebHistory } from "vue-router";
import routerAsset from "./routerAsset";
import routerReport from "./routerReport";
import LoginView from "./routerLoginPartial";
import routerVoucher from "./routerVoucher";
const routes = [
  {
    path:"/login",
    children:[...LoginView]
},
  {
    path: "/",
    component: () => import("@/components/layouts/TheMain.vue"),
    children: [...routerAsset, ...routerReport,...routerVoucher],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
