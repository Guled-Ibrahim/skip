import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./routes";
import { store } from "./store/store";
import VueApexCharts from "vue-apexcharts";

Vue.use(VueRouter);
Vue.use(require("vue-moment"));
Vue.use(VueApexCharts);

const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

Vue.config.productionTip = false;

Vue.component("apexchart", VueApexCharts);

new Vue({
  render: (h) => h(App),
  router: router,
  store: store,
}).$mount("#app");
