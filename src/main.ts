import { createApp } from "vue";

import "./assets/css/tailwind.css";
import "./assets/css/full-calendar.css";

import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import UiIcon from "./components/Ui/Icon.vue";
import { routes } from "./router";

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes,
});
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.component("Icon", UiIcon);

app.mount("#app");
