import { createApp } from "vue";
import App from "./../App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import vi from "element-plus/es/locale/lang/vi";
import contextmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
const app = createApp(App);

//Style SCSS
import "@/assets/scss/font.scss";
import "@/assets/scss/icon.scss";
import "@/assets/scss/app.scss";
//Khai báo router
import router from "@/assets/js/routers/router.js";

app.use(ElementPlus, {
  locale: vi,
});
app.config.globalProperties.hostname = "http://localhost:8080/"
app.use(router);
app.use(contextmenu)
app.use(ElementPlus);
app.mount("#app");
