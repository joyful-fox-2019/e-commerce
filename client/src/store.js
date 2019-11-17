import Vue from 'vue'
import Vuex from 'vuex'
import axios from './config/axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: false,
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
    ADD_TO_CART (state, payload) {
      state.cart.push(payload)
    },
    DELETE_FROM_FAV (state, payload) {
      let updatedCart = state.cart.filter(item => {
        return item.product._id !== payload.id
      })
      state.cart = updatedCart
    },
    SET_TRANSACTIONS (state, payload) {
      state.transactions = payload
    },
    SET_ADMIN (state, payload) {
      state.isAdmin = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      return axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
    },
    googleLogin ({ commit }, payload) {
      return axios({
        method: 'POST',
        url: '/users/glogin',
        data: {
          id_token: payload.id_token
        }
      })
    },
    register ({ commit }, payload) {
      return axios({
        method: 'POST',
        url: '/users/register',
        data: {
          email: payload.email,
          password: payload.password,
          username: payload.username
        }
      })
    },
    verify ({ commit }) {
      axios({
        method: 'GET',
        url: '/users/verify',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Vue.notify({ type: 'info', title: data.message })
          commit('SET_LOGIN_STATUS', true)
        })
        .catch(({ response }) => {
          console.log(response.data.message)
        })
    },
    verifyAdmin ({ commit }) {
      axios({
        method: 'GET',
        url: '/users/admin/verify',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Vue.notify({ type: 'success', title: data.message })
          commit('SET_ADMIN', true)
        })
        .catch(({ response }) => {
          console.log(response.data.message)
        })
    },
    fetchProducts ({ commit }, payload) {
      let query = '?'
      if (payload.sort) query += `sort=${payload.sort}`
      if (payload.keyword) query += `keyword=${payload.keyword}`
      if (payload.whose) query += `whose=${payload.whose}`
      return axios({
        method: 'GET',
        url: `/products${query}`
      })
    },
    fetchProductById ({ commit }, payload) {
      return axios({
        method: 'GET',
        url: `/products/${payload.id}`
      })
    },
    favourite ({ commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `/products/fav/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    fetchFav ({ commit }) {
      axios({
        method: 'GET',
        url: `/products/fav`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_FAV_PRODUCTS', data)
        })
        .catch(({ response }) => [
          Vue.notify({ type: 'error', title: response.data.message })
        ])
    },
    fetchCart ({ commit }) {
      axios({
        method: 'GET',
        url: '/users/cart',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_CART', data.cart)
        })
        .catch(({ response }) => {
          Vue.notify({ type: 'error', title: response.data.message })
        })
    },
    updateCart ({ commit }, payload) {
      return axios({
        method: 'PATCH',
        url: '/users/cart',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          cart: payload.cart
        }
      })
    },
    deleteFromCart ({ commit, dispatch }, payload) {
      return axios({
        method: 'DELETE',
        url: `/users/cart/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    checkout ({ commit }, payload) {
      return axios({
        method: 'POST',
        url: '/transactions',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          items: payload.items,
          price: payload.price
        }
      })
    },
    fetchTrx ({ commit }, payload) {
      axios({
        method: 'GET',
        url: '/transactions',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_TRANSACTIONS', data)
        })
        .catch(({ response }) => {
          Vue.notify({ type: 'error', title: response.data.message })
        })
    },
    updateTransaction ({ dispatch }, payload) {
      return axios({
        method: 'PATCH',
        url: `/transactions/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          status: payload.status
        }
      })
    },
    addProduct ({ commit }, payload) {
      return axios({
        method: 'POST',
        url: '/products',
        headers: {
          token: localStorage.getItem('token')
        },
        data: payload.data // form data
      })
    },
    updateProduct ({ commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `/products/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: payload.data
      })
    },
    deleteProduct ({ commit }, payload) {
      return axios({
        method: 'DELETE',
        url: `/products/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  }
})
