import Settings from "../pages/Settings.vue"
import Countdown from "../pages/Countdown.vue"
import { createRouter, createWebHashHistory } from 'vue-router'

let routes = [
  { path: "/", component: Settings },
  { path: "/countdown", component: Countdown },
];

export let router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory("/"),
  routes, // short for `routes: routes`
});