import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Books from "../views/Books.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/books",
  },
  {
    path: "/books",
    name: "Books",
    component: Books,
  },
  {
    path: "/cards",
    name: "Cards",
    component: () => import("../views/Cards.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/Settings.vue"),
  },
  {
    path: "/adminLogin",
    name: "Admin Login",
    component: () => import("../views/AdminLogin.vue"),
  },
  {
    path: "/managerLogin",
    name: "Manager Login",
    component: () => import("../views/ManagerLogin.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
