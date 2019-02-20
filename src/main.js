import Vue from 'vue';
import App from './app.vue';
import router from './router';
import axios from './config/ajax';
import ui from './global-ui';

import 'Assets/css/index.less';

import './directives/load.js';

Vue.prototype.$ajax = axios;
Vue.prototype.$tip = ui;

new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app')
