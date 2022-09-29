import Settings from "../pages/Settings.vue";
import CountdownSimple from "../pages/CountdownSimple.vue";
import CountdownPdf from "../pages/CountdownPdf.vue";
import CountdownText from "../pages/CountdownText.vue";
import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
  { path: "/", component: Settings },
  { path: "/countdown", component: CountdownSimple },
  { path: "/countdown-pdf", component: CountdownPdf },
  { path: "/countdown-text", component: CountdownText },
];

export let router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory("/"),
  routes, // short for `routes: routes`
});
