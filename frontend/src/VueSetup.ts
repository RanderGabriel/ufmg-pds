import { App, Component, createApp } from 'vue';
import router from './router';

import Navbar from '@/components/Navbar.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add( faStar)

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
        this.app.component('font-awesome-icon', FontAwesomeIcon);
        return;
    }

    static registerPlugins() {
        return;
    }

    static registerFilters() {
        return;
    }
}
