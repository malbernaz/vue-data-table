import Vue from "vue";
import App from "./App.vue";
import createStore from "./store";
import client from "./api";

const store = createStore(client);

Vue.config.productionTip = process.env.NODE_ENV === "production";

new Vue({ store, render: h => h(App) }).$mount("#app");
