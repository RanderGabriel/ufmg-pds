import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import SignUp from '@/views/SignUp.vue';
import Login from '@/views/Login.vue';

import Profile from '@/views/profile/Profile.vue';
import ProfileVehicles from '@/views/profile/ProfileVehicles.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/login',
        component: Login,
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
    '/signup',
];

const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
};

router.beforeEach((to, from, next) => {
    if(!publicRoutes.find(p => p === to.path) && !isAuthenticated()) {
        next('/login');
    } else {
        next();
    }
});

export default router;
