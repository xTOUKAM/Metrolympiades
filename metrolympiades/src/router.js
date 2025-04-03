import { createRouter, createWebHistory } from 'vue-router';
import RegisterPage from './pages/RegisterPage.vue';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import LeaderboardPage from './pages/LeaderboardPage.vue';

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/register", name: "register", component: RegisterPage },
  { path: "/login", name: "login", component: LoginPage },
  { path: "/leaderboard", name: "leaderboard", component: LeaderboardPage },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;