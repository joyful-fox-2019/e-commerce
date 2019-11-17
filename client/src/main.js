import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Swal from 'sweetalert2'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
// Vue.use(Swal)
Vue.config.productionTip = false


Vue.prototype.swal = Swal

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
