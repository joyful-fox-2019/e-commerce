import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store/index'
import GSignInButton from 'vue-google-signin-button'


import { VueperSlides, VueperSlide } from 'vueperslides'

Vue.use(GSignInButton)

Vue.use(VueperSlides)
Vue.use(VueperSlide)

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
