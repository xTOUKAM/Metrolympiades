import { createRouter, createWebHistory } from 'vue-router';
import RegisterPage from './pages/RegisterPage.vue';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import LeaderboardPage from './pages/LeaderboardPage.vue';
import TeamPage from './pages/TeamPage.vue';
import GamesPage from './pages/GamesPage.vue';
import GamePage from './pages/GamePage.vue';
import AddActivityPage from './pages/AddActivityPage.vue';

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/register", name: "register", component: RegisterPage },
  { path: "/login", name: "login", component: LoginPage },
  { path: "/leaderboard", name: "leaderboard", component: LeaderboardPage },
  { path: "/team", name:"team", component: TeamPage },
  { path: "/games", name: "games", component: GamesPage },
  { path: "/game", name: "game", component: GamePage },
  { path: "/add", name: "add", component: AddActivityPage }
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;