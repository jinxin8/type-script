import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import layoutHeaderAside from "@/layout";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: { name: "indexPage" },
    component: layoutHeaderAside,
    children: [
      {
        path: "indexPage",
        name: "indexPage",
        component: () => import("@/views/indexPage")
      },
      {
        path: "quillPage",
        name: "quillPage",
        component: () => import("@/views/quillPage")
      },
      {
        path: "videoPage/photo",
        name: "videophoto",
        component: () => import("@/views/videoPage/videoPhoto")
      },
      {
        path: "videoPage/disfast",
        name: "videodisfast",
        component: () => import("@/views/videoPage/videodisFast")
      },
      {
        path: "zipPage",
        name: "zipPage",
        component: () => import("@/views/zipPage")
      },
      {
        path: "execComPage",
        name: "execComPage",
        component: () => import("@/views/execComPage")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
