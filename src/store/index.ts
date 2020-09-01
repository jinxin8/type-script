import Vue from "vue";
import Vuex from "vuex";
import menu from "./modules/menu";

// const files = require.context("./modules", false, /\.ts$/);
// const modules: any = {};

// files.keys().forEach(key => {
//   modules[key.replace(/(\.\/|\.ts)/g, "")] = files(key).default;
// });

// const types: object = {
//   namespaced: true,
//   modules
// };

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    menu
  }
});
