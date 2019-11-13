import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../helpers/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      name: '',
      isAdmin: false
    },
    alertStatus: false,
    errMessages: ''
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_ALERT_STATUS (state, payload) {
      state.alertStatus = payload
    },
    SET_ERR_MESSAGES (state, err) {
      console.log(err)
      console.log(err.response)
      let strMessages = ''
      if (err.response) {
        err.response.data.messages.forEach(message => {
          strMessages += message + ' '
        })
      } else {
        strMessages = 'Something went wrong with the server'
      }
      state.errMessages = strMessages
    }
  },
  actions: {
    login ({ commit }, payload) {
      console.log('login')
      axios.post('/users/login', payload)
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          commit('SET_ALERT_STATUS', true)
          commit('SET_ERR_MESSAGES', err)
        })
    }
  },
  modules: {
  }
})
