import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import SignUp from '@/views/SignUp.vue';

import Profile from '@/views/profile/Profile.vue';
import ProfileVehicles from '@/views/profile/ProfileVehicles.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
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

export default router;
