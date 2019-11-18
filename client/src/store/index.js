import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config/myaxios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    login ({ comit }, payload) {
      axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    getProducts ({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/products'
        })
          .then(({ data }) => {
            console.log(data)
          })
          .catch(({ response }) => {
            console.log(response)
          })
      })
    }
  },
  modules: {
  }
})
