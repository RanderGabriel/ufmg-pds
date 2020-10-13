import { createWebHistory, createRouter } from "vue-router";

import SignUp from "@/views/signup/index.vue";
import Login from "@/views/login/index.vue";
import LoginForgot from "@/views/login/LoginForgot.vue";
import Home from "@/views/home/index.vue";
import Historic from "@/views/historic/index.vue";
import Error404 from "@/views/error/404-not-found.vue";
import { authService } from '@/services/AuthService';

const routes = [
    {
        path: '/404-not-found',
        component: Error404
    },
    {
        path: '/home',
        component: Home,
        alias: ['/'],
    },
    {
        path: "/signup",
        component: SignUp,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/login/forgot",
        component: LoginForgot,   
    },
    {
        path: '/logoff',
        component: Login,
        alias: ['/'],
    },
    {
        path: "/historic",
        component: Historic,
    }
];

const publicRoutes = [
    '/404-not-found',
    '/signup',
    '/login',
    '/login/forgot'
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isPublicRoute = publicRoutes.some((route) => route === to.path);
    const isAuthenticaded = authService.isAuthenticated();

    if (isPublicRoute || isAuthenticaded) {
        next();
    } else {
        router.push('/login');
    }
});

export default router;
