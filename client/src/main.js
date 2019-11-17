import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../public/style.scss'
import { LoaderPlugin } from 'vue-google-login'
import GSignInButton from 'vue-google-signin-button'

Vue.use(BootstrapVue)
Vue.use(LoaderPlugin, {
  client_id: '472366340893-1d0sajo3etaeietgu9c3f7t28iq6a4cb.apps.googleusercontent.com'
})
Vue.use(GSignInButton)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
