import { createApp } from 'vue';
import App from './App.vue';
import router from "@/routes/index.js";
import store from "@/store/index.js";
import i18n from "@/i18n/index.js";

let app = createApp(App);
app.use(i18n).use(store).use(router).mount("#app");
