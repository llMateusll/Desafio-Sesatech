import "bootstrap"; // Importa o JavaScript do Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"; // Importa o CSS do Bootstrap
import { createApp } from "vue"; // Para Vue 3
import App from "./App.vue";
import router from "./router/router"; // Importa o router

createApp(App).use(router).mount("#app"); // Usa o router na aplicação
