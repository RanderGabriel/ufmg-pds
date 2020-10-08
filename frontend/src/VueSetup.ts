import { App, Component, createApp } from 'vue';
import router from './router';

import Navbar from '@/components/Navbar.vue';


export default class VueConfig {
    private static app: App;

    static setup(component: Component, root: string = '#app') {
        this.app = createApp(component);
        this.app.use(router);

        VueConfig.registerComponents();
        VueConfig.registerPlugins();
        VueConfig.registerFilters();

        this.app.mount(root);
    }

    static registerComponents() {
        this.app.component('navbar', Navbar);
        return;
    }

    static registerPlugins() {
        return;
    }

    static registerFilters() {
        return;
    }
}
