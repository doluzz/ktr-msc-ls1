import { createWebHistory, createRouter } from "vue-router";
import Inscription from "@/views/Inscription.vue";
import Connexion from "@/views/Connexion.vue";
import Home from "@/views/Home.vue";
import Carte from "@/views/Carte.vue";

const routes = [
  { 
    name: 'Inscription',
    path: '/Inscription', 
    component: Inscription,
  },
  { 
    name: 'Connexion',
    path: '/Connexion', 
    component: Connexion,
  },
  { 
    name: 'Home',
    path: '/', 
    component: Home,
  },  { 
    name: 'Carte',
    path: '/Carte', 
    component: Carte,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;