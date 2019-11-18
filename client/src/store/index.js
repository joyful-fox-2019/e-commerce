import Vue from 'vue'
import Vuex from 'vuex'
import instance from '../connection/axios'
import axiosErrorHandler from '../connection/axiosErrorHandler'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginUser: null,
    products: [],
    cart: [],
    orders: [],
    snackbar: {
      visible: false,
      text: null,
      timeout: 3000
    }
  },
  mutations: {
    SHOW_SNACKBAR (state, payload) {
      state.snackbar.text = payload.text
      state.snackbar.visible = true
    },
    CLOSE_SNACKBAR (state) {
      state.snackbar.visible = false
      // state.snackbar.multiline = false
      // state.snackbar.timeout = 4000
      // state.snackbar.text = null
    },
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_USER (state, payload) {
      state.loginUser = payload
    },
    SET_PRODUCT (state, payload) {
      state.products = payload
    },
    ADD_PRODUCT (state, payload) {
      state.products.push(payload)
    },
    SET_CARD (state, payload) {
      state.cart = payload
    },
    SET_CARD_COUNT (state, payload) {
      state.cart[payload.index].count = payload.count
    },
    ADD_CART (state, payload) {
      state.cart.push(payload)
    },
    SET_ORDERS (state, payload) {
      state.orders = payload
    },
    ADD_ORDER (state, payload) {
      state.orders.push(payload)
    }
  },
  actions: {
    getAllProducts ({ commit }) {
      instance({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          commit('SET_PRODUCT', data)
        })
        .catch(error => {
          axiosErrorHandler(error)
        })
    },
    getCart ({ commit }) {
      let itemCount = {}
      for (let data of this.state.cart) {
        itemCount[data.product._id] = data.count
      }
      instance({
        method: 'GET',
        url: '/carts',
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          let result = []
          for (let cartItem of data) {
            if (cartItem.product !== null) {
              cartItem.count = itemCount[cartItem.product._id] || 0
              result.push(cartItem)
            }
          }
          commit('SET_CARD', result)
        })
        .catch(error => {
          axiosErrorHandler(error)
        })
    },
    getOrders ({ commit }) {
      instance({
        method: 'GET',
        url: '/transactions',
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_ORDERS', data)
        })
        .catch(error => {
          axiosErrorHandler(error)
        })
    }
  }
})
