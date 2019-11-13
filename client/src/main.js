import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    showAlert (err) {
      console.log('masuk mixin')
      console.log(err)
    }
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
