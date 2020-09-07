import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import SignUp from '@/views/SignUp.vue';

import Login from '@/views/login/Login.vue';
import LoginForgot from '@/views/login/LoginForgot.vue';
import LoginReset from '@/views/login/LoginReset.vue';

import Profile from '@/views/profile/Profile.vue';
import ProfileVehicles from '@/views/profile/ProfileVehicles.vue';
import { userService } from '@/services/UserService';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/login/forgot',
        component: LoginForgot,
    },
    {
        path: '/login/reset',
        component: LoginReset,
    },
    {
        path: '/signup',
        component: SignUp,
    },
    {
        path: '/profile',
        component: Profile,
        children: [
            {
                path: '/profile/vehicles',
                component: ProfileVehicles,
            },
        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

const publicRoutes = [
    '/login',
    '/login/forgot',
    '/login/reset',
    '/signup',
];

const isAuthenticated = () => {
    return !!userService.getCurrentUser();
};

router.beforeEach((to, from, next) => {
    if(!publicRoutes.find(p => p === to.path) && !isAuthenticated()) {
        next('/login');
    } 
    else if(to.path === '/') {
        next('/profile');
    }
    else {
        next();
    }
});

export default router;
