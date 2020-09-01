import Vue from "vue";
import App from "./App";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

// 设置路由菜单
import router from "./router";
import { menuHeader, menuAside } from "@/menu";

Vue.use(Antd);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.commit("menu/headerSet", menuHeader);
    // 设置侧边栏菜单
    this.$store.commit("menu/asideSet", menuAside);
  }
}).$mount("#app");
