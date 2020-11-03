import { App, Component, createApp } from 'vue';
import router from './router';
import * as store from './store';

import Navbar from '@/components/Navbar.vue';


export default class VueConfig {
    private static app: App;

    static setup(component: Component, root: string = '#app') {
        this.app = createApp(component);
        this.app.use(router);

        this.app.provide(store.stateSymbol, store.createState());
        this.app.provide(store.stateSymbol, store.createState());

        VueConfig.registerComponents();
        VueConfig.registerPlugins();
        this.app.mount(root);
    }

    static registerComponents() {
        this.app.component('navbar', Navbar);
        return;
    }

    static registerPlugins() {
        return;
    }

}
