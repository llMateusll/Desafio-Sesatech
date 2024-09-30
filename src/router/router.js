import { createRouter, createWebHistory } from "vue-router"; 
import Login from "@/components/LoginForm.vue"; 
import Dashboard from "@/components/UserDashboard.vue"; 

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    mode: "history", 
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        next();
      } else {
        next("/login");
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router; 
