import { createApp } from "vue";
import App from "./../App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import clickOutside from "@/directives/eventClickOutSide.js";
import vi from "element-plus/es/locale/lang/vi";
const app = createApp(App);

//Style SCSS
import "@/assets/scss/font.scss";
import "@/assets/scss/icon.scss";
import "@/assets/scss/app.scss";
import "@/assets/scss/button.scss";
//Khai báo router
import router from "@/routers/router";

// app.directive("clickoutside", {
//   beforeMount: (el, binding) => {
//     el.style.fontSize = binding.value + "px";
//   },
// });
app.use(ElementPlus, {
  locale: vi,
});
app.use(router);

app.use(ElementPlus);
app.use(clickOutside);

app.mount("#app");
