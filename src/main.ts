import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from "primevue/config"
import { router } from './plugins/router'
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ToastService from "primevue/toastservice";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "@fontsource/roboto";
import { addAllIcons } from './plugins/fontawesome';

let pinia = createPinia();
addAllIcons()

createApp(App)
  .use(PrimeVue)
  .use(ToastService)
  .use(router)
  .use(pinia)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });
