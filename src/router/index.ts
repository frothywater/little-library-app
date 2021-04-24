import auth from "@/store/auth";
import Books from "@/views/Books.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

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

router.beforeEach((to, _from, next) => {
  if (to.path === "/adminLogin") {
    if (!auth.managerAuthenticated) next();
    else next("/managerLogin");
  } else if (to.path === "/managerLogin") {
    if (!auth.adminAuthenticated) next("/adminLogin");
    else if (!auth.managerAuthenticated) next();
    else next("/");
  } else {
    if (auth.adminAuthenticated) {
      if (auth.managerAuthenticated) next();
      else next("/managerLogin");
    } else next("/adminLogin");
  }
});

export default router;
