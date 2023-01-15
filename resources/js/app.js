require('./bootstrap');
import Vue from 'vue'
import VueToast from 'vue-toast-notification';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'vue-toast-notification/dist/theme-sugar.css';

import { HasError, AlertError } from 'vform/src/components/bootstrap5';
import router from './router/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueToast,{
    position: 'top-right',
    duration: 3000
});
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.component('app-header', require('./components/Header.vue').default);

const app = new Vue({
    el: '#app',
    router: router
});
