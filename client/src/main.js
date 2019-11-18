import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import VueSweetalert2 from 'vue-sweetalert2';
Vue.config.productionTip = false
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

Vue.use(Toast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
