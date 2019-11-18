import Vue from 'vue'
import Vuex from 'vuex'
import PortalVue from 'portal-vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios' 

Vue.use(axios)
Vue.use(BootstrapVue)
Vue.use(PortalVue)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products:[]
  },
  mutations: {
    FETCH_PRODUCT(state,payload){
      state.products = payload
    }
  },
  actions: {
    fetchProduct(context){
      axios({
        method: 'get',
        url : 'http://localhost:3000/products',
        headers : {
            token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        context.commit('FETCH_PRODUCT',data)
      })
      .catch(({response}) => {
        console.log(response)
      })
    }
  },
  modules: {
  }
})
