import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueAWN from "vue-awesome-notifications"

import 'vue-awesome-notifications/dist/styles/style.css'
import feather from 'vue-icon'
import Textra from 'vue-textra'
import InputTag from 'vue-input-tag'

Vue.component('input-tag', InputTag)
Vue.use(Textra);
Vue.use(feather, 'v-icon')
// Your custom options
let options = {
  durations: {
    global: 3000
  }
}

Vue.use(VueAWN, options)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
