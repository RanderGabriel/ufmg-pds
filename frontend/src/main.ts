import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/styles/index.scss';

import VueSetup from './VueSetup';
VueSetup.setup(Vue);

const app = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});

