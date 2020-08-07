import { VueConstructor } from 'vue';

import Navbar from '@/components/layout/Navbar.vue';
import EmptyList from '@/components/layout/EmptyList.vue';

import Input from '@/components/form/Input.vue';
import Form from '@/components/form/Form.vue';

import VehicleForm from '@/components/forms/VehicleForm.vue';
import SignupForm from '@/components/forms/SingupForm.vue';

import ServicesPlugin from '@/services';

export default class VueConfig {

    public static setup(Vue: VueConstructor<Vue>) {
        Vue.config.productionTip = false;
        VueConfig.registerComponents(Vue);
        VueConfig.registerPlugins(Vue);
        // VueConfig.registerFilters(Vue);
    }

    public static registerComponents(Vue: VueConstructor<Vue>) {
        Vue.component('navbar', Navbar);
        Vue.component('empty-list', EmptyList);
        Vue.component('vehicle-form', VehicleForm);
        Vue.component('custom-form', Form);
        Vue.component('custom-form', Form);
        Vue.component('signup-form', SignupForm);
    }

    private static registerPlugins(Vue: VueConstructor<Vue>) {
        Vue.use(ServicesPlugin);
    }

    // private static registerFilters(Vue: VueConstructor<Vue>) {
    // }
}
