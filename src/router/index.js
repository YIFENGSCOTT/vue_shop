import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome.vue";
import Events from "../components/staff/Events.vue";
import Resources from "../components/staff/Resources.vue";
import Test from "../components/staff/Test.vue"

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    {
      path: "/home",
      component: Home,
      redirect: "/welcome",
      children: [{ path: "/welcome", component: Welcome }, 
      { path: "/1-1", component: Events},
      { path: "/1-2", component: Resources},
      { path: "/1-3", component: Test}
      ],
    },
  ],
});
