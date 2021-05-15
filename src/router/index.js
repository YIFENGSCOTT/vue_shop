import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome.vue";
import Events from "../components/staff/Events.vue";
import Resources from "../components/staff/Resources.vue";
import ResourcePlace from "../components/staff/ResourcePlace.vue";
import Company from "../components/staff/Company.vue";
import Flow from "../components/staff/Flow.vue"
import CityInfo from "../components/staff/CityInfo.vue"

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
      { path: "/1-3", component: ResourcePlace},
      { path: "/1-4", component: Flow},
      { path: "/1-5", component: Company},
      { path: "/1-6", component: CityInfo}
      ],
    },
  ],
});
