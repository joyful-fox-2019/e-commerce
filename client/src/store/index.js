import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    products: {
      macarons: [],
      cakes: []
    },
    currentCart: {},
    user: {},
    cartSubTotal: 0
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      let macarons = []
      let cakes = []

      for (let item in payload) {
        if (payload[item].category === 'Macaron') {
          macarons.push(payload[item])
        } else if (payload[item].category === 'Cake') {
          cakes.push(payload[item])
        }
      }

      state.products.macarons = macarons
      state.products.cakes = cakes
    },
    SET_SESSION (state, payload) {
      state.isLoggedIn = payload
    },
    SET_CART (state, payload) {
      let macarons = state.products.macarons
      let cakes = state.products.cakes
      let allProducts = macarons.concat(cakes)
      let productIds = payload.ProductId
      let subtotal = 0
      let result = {}

      for (let product in allProducts) {
        for (let id in productIds) {
          if (allProducts[product]._id == productIds[id]) {
            if (result[productIds[id]]) {
              result[productIds[id]].quantity++
            } else {
              result[productIds[id]] = {
                detail: allProducts[product],
                quantity: 1
              }
            }
            subtotal += allProducts[product].price
          }
        }
      }
      let cartId = payload._id
      let cart = {
        detail: result,
        subtotal,
        cartId
      }
      state.currentCart = cart
    },
    SET_USER (state, payload) {
      state.user = payload
    }
  },
  actions: {
    addToCart ({ commit, state }, payload) {
      if (!state.currentCart.cartId) {
        return new Promise((resolve, reject) => {
          axios({
            method: 'post',
            url: '/carts',
            headers: {
              Authorization: localStorage.getItem('token')
            },
            data: {
              product: payload
            }
          })
            .then(({ data }) => {
              commit('SET_CART', data)
              resolve(data)
            })
            .catch(err => {
              reject(err.response.data)
            })
        })
      } else {
        return new Promise((resolve, reject) => {
          axios({
            method: 'post',
            url: `/carts/${state.currentCart.cartId}`,
            headers: {
              Authorization: localStorage.getItem('token')
            },
            data: {
              product: payload
            }
          })
            .then(({ data }) => {
              commit('SET_CART', data)
              resolve(data)
            })
            .catch(err => {
              reject(err.response.data)
            })
        })
      }
    },
    fetchProducts ({ commit }) {
      axios({
        method: 'get',
        url: `/products`
      })
        .then(({ data }) => {
          commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProductDetail ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `/products/${payload}`
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchLatestCart ({ commit }, payload) {
      axios({
        method: 'get',
        url: `/carts/latest`,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_CART', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    signIn ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/users/signin',
          data: payload
        })
          .then(({ data }) => {
            let user = {
              name: data.name,
              email: data.email
            }
            commit('SET_USER', user)
            resolve(data.token)
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    signUp ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/users/signup',
          data: payload
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err.response.data)
          })
      })
    },
    signOut ({ commit }, payload) {
      localStorage.removeItem('token')
      commit('SET_SESSION', false)
    },
    removeFromCart ({ commit, state }, payload) {
      axios({
        method: 'post',
        url: `/carts/remove/${state.currentCart.cartId}`,
        headers: {
          Authorization: localStorage.getItem('token')
        },
        data: {
          ProductId: payload
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_CART', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
