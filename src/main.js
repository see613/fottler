import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './css/styles.css'
import SocialSharing from 'vue-social-sharing';

//todo
Vue.config.productionTip = true;

Vue.use(SocialSharing);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
