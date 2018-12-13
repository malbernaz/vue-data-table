import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = process.env.NODE_ENV === "production";

new Vue({ render: h => h(App) }).$mount("#app");
