import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Logon",
    component: () => import(/* webpackChunkName: "logon" */ "../views/Logon.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "Register" */ "../views/Register.vue")
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import(/* webpackChunkName: "Profile" */ "../views/Profile.vue")
  },
  {
    path: "/Incidents/new",
    name: "NewIncident",
    component: () => import(/* webpackChunkName: "Incidents" */ "../views/NewIncident.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;
