import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../helpers/axios'
import alert from '../../helpers/errorHandler'
import alertSuccess from '../../helpers/alertSuccess'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      _id: '',
      name: '',
      isAdmin: false
    },
    alert: {
      status: false,
      color: '#E6252A',
      message: ''
    },
    authDialog: false,
    products: []
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_ALERT (state, payload) {
      state.alert = payload
    },
    SET_AUTH_DIALOG (state, payload) {
      state.authDialog = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    register ({ commit }, payload) {
      console.log('register')
      axios.post('/users/register', payload)
        .then(({ data }) => {
          console.log(data)
          let user = {
            _id: data._id,
            name: data.name,
            isAdmin: data.isAdmin || false
          }
          commit('SET_USER', user)
          localStorage.setItem('_id', user._id)
          localStorage.setItem('name', user.name)
          localStorage.setItem('isAdmin', user.isAdmin)
          localStorage.setItem('access_token', data.access_token)
          commit('SET_AUTH_DIALOG', false)
        })
        .catch(alert)
    },
    login ({ commit }, payload) {
      console.log('login')
      axios.post('/users/login', payload)
        .then(({ data }) => {
          console.log(data)
          let user = {
            _id: data._id,
            name: data.name,
            isAdmin: data.isAdmin || false
          }
          commit('SET_USER', user)
          localStorage.setItem('_id', user._id)
          localStorage.setItem('name', user.name)
          localStorage.setItem('isAdmin', user.isAdmin)
          localStorage.setItem('access_token', data.access_token)
          commit('SET_AUTH_DIALOG', false)
          alertSuccess('You are logged in!')
        })
        .catch(alert)
    },
    addProduct ({ commit }, payload) {
      axios.post('/products', payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          router.push('/')
          alertSuccess('New comic added!')
        })
        .catch(alert)
    },
    getProducts ({ commit }, payload) {
      console.log('masuk get products')
      axios.get('/products', {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_PRODUCTS', data)
        })
        .catch(alert)
    }
  },
  modules: {
  }
})
