// src/router/router.js
import { createRouter, createWebHistory } from "vue-router"; // Importa o createRouter e createWebHistory
import Login from "@/components/LoginForm.vue"; // Importa o componente Login
import Dashboard from "@/components/UserDashboard.vue"; // Importa o componente Dashboard

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    mode: "history", // Adicione isso se ainda não estiver
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
  history: createWebHistory(), // Cria o histórico para o router
  routes,
});

export default router; // Exporta o router
