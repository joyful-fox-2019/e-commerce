import Vue from 'vue'
import Vuex from 'vuex'
import axios from './config/axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    role: '',
    products: [],
    favProducts: [],
    cart: [],
    transactions: []
  },
  mutations: {
    SET_LOGIN_STATUS (state, payload) {
      state.isLogin = payload
    },
    SET_ROLE (state, payload) {
      state.role = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_FAV_PRODUCTS (state, payload) {
      state.favProducts = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    },
    SET_TRANSACTIONS (state, payload) {
      state.transactions = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      console.log(payload)
      return axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    register () {

    },
    fetchProducts ({ commit }, payload) {
      return axios({
        method: 'GET',
        url: '/products'
      })
    },
    fetchProductById ({ commit }, payload) {
      return axios({
        method: 'GET',
        url: `/products/${payload.id}`
      })
    },
    fetchFav () {

    },
    fetchCart () {

    },
    updateCart () {

    },
    deleteFromCart () {

    },
    checkout () {

    },
    updateTransaction () {

    },
    addProduct () {

    },
    updateProduct () {

    },
    deleteProduct () {

    }
  }
})
