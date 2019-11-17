import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  Swal,
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
