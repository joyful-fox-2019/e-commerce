import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueCharts from 'vue-chartjs'

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(VueCharts)

Vue.prototype.axios = axios.create({
  baseURL: 'http://localhost:3003'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
