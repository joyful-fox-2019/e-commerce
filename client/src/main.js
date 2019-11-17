import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GAuth from 'vue-google-oauth2'
import './quasar'

Vue.config.productionTip = false
const gauthOption = {
  clientId: `610380898759-elua76cepmkhv0sc707dtu60b9coidk4.apps.googleusercontent.com`,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
