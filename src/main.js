import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Routes from "./routes";
import { store } from "./store/store";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";
import Animate from "animate.css";

Vue.use(VueRouter);
Vue.use(require("vue-moment"));
Vue.use(Chartkick.use(Chart));
Vue.use(Animate);

const router = new VueRouter({
  routes: Routes,
  mode: "history",
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router: router,
  store: store,
}).$mount("#app");
