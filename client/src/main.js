import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import '../tailwind.css'
import Dialog from 'vue-dialog-loading'
import GSignInButton from 'vue-google-signin-button'

Vue.config.productionTip = false

Vue.use(Notifications)
Vue.use(Dialog, {
  dialogBtnColor: '#0f0'
})
Vue.use(GSignInButton)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
