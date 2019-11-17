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
    loading: false,
    products: [],
    product: {
      name: '',
      description: '',
      image: '',
      price: 0,
      stock: 0,
      published: new Date(),
      writer: '',
      penciler: ''
    },
    addCartDialog: false
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_ALERT (state, payload) {
      state.alert = payload
    },
    SET_LOADING (state, payload) {
      state.loading = payload
    },
    SET_AUTH_DIALOG (state, payload) {
      state.authDialog = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_ADD_CART_DIALOG (state, payload) {
      state.addCartDialog = payload
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
          alertSuccess('You are logged in!')
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
    logout ({ commit }, payload) {
      let user = {
        _id: '',
        name: '',
        isAdmin: false
      }
      commit('SET_USER', user)
      localStorage.removeItem('_id')
      localStorage.removeItem('name')
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('access_token')
      router.push('/')
      alertSuccess('You are logged out!')
    },
    addProduct ({ commit }, payload) {
      commit('SET_LOADING', true)
      axios.post('/products', payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          console.log('harusnya tutup loading')
          commit('SET_LOADING', false)
          router.push('/')
          alertSuccess('New comic added!')
        })
        .catch(alert)
    },
    updateProduct ({ commit }, payload) {
      commit('SET_LOADING', true)
      console.log('masukssss')
      console.log(payload)
      axios.patch(`/products/${payload._id}`, payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_LOADING', false)
          router.push('/')
          alertSuccess('Comic updated!')
        })
        .catch(alert)
    },
    deleteProduct ({ commit }, payload) {
      commit('SET_LOADING', true)
      axios.delete(`/products/${payload}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_LOADING', false)
          router.push('/')
          alertSuccess('Comic deleted!')
        })
        .catch(alert)
    },
    getProducts ({ commit }, payload) {
      console.log('masuk get products')
      // commit('SET_LOADING', true)
      axios.get('/products')
        .then(({ data }) => {
          console.log(data)
          commit('SET_PRODUCTS', data)
          // commit('SET_LOADING', false)
        })
        .catch(alert)
    },
    getProduct ({ commit }, payload) {
      console.log('masuk get product')
      // commit('SET_LOADING', true)
      axios.get(`/products/${payload}`)
        .then(({ data }) => {
          console.log(data)
          commit('SET_PRODUCT', data)
          // commit('SET_LOADING', false)
        })
        .catch(alert)
    },
    addToCart ({ commit }, payload) {
      axios.post(`/carts`, payload, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_ADD_CART_DIALOG', true)
          // commit('SET_LOADING', false)
        })
        .catch(alert)
    }
  },
  modules: {
  }
})
