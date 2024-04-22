import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import Login from "../views/Login.vue";
import TaskList from "../views/TaskList.vue";
import userContext from "../contexts/userContext";

const routes = [
  {
    path: "",
    component: Login,
  },
  {
    path: "/task-list",
    component: TaskList,
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (userContext.state.user) {
        next();
      } else {
        next("");
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
