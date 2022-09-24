import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from "primevue/config"
import { router } from './plugins/router'
import { createPinia } from "pinia";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "@fontsource/roboto";
// import './samples/node-api'

let pinia = createPinia();

createApp(App)
  .use(PrimeVue)
  .use(router)
  .use(pinia)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
