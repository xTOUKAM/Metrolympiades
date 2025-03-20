import { createRouter,  createWebHistory } from 'vue-router';
import RegisterPage from './pages/RegisterPage.vue';
import HomePage from './pages/HomePage.vue';

const routes = [
    {
        path: "/",
        name: "home",
        component: HomePage,
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
