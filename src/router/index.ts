import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home";
import layoutHeaderAside from "@/layout";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: layoutHeaderAside,
    children: [
      {
        path: "index",
        name: "index",
        component: Home
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
