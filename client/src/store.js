import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const host = `http://localhost:3000`
// const host = `https://e-commerce-api.sigitariprasetyo.xyz`

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    dataProduct: {},
    isAdmin: false,
    detailProduct: {},
    username: '',
    searchProduct: {},
    carts: [],
    totalPrice: 0,
    transactions: []
  },
  mutations: {
    IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    IS_ADMIN (state, payload) {
      state.isAdmin = payload
    },
    USERNAME (state, payload) {
      state.username = payload
    },
    ALL_PRODUCT (state, payload) {
      state.dataProduct = payload
    },
    DETAIL_PRODUCT (state, payload) {
      state.detailProduct = payload
    },
    SEARCH_PRODUCT (state, payload) {
      state.searchProduct = payload
    },
    CARTS (state, payload) {
      state.carts = payload
    },
    TOTAL_PRICE (state, payload) {
      state.totalPrice = payload
    },
    GET_TRANSACTION (state, payload) {
      state.transactions = payload
    }
  },
  actions: {
    auth ({ commit }) {
      if (localStorage.getItem('role')) {
        if (localStorage.getItem('role') === 'admin') {
          commit('IS_LOGIN', true)
          commit('IS_ADMIN', true)
        } else {
          commit('IS_LOGIN', true)
          commit('IS_ADMIN', false)
        }
      } else {
        commit('IS_LOGIN', false)
        commit('IS_ADMIN', false)
      }
    },
    getUsername ({ commit }) {
      let theUsername = localStorage.getItem('username')
      commit('USERNAME', theUsername)
    },
    getProduct ({ commit }) {
      axios({
        method: 'get',
        url: `${host}/product`
      })
        .then(({ data }) => {
          let products = []
          data.forEach((el, i) => {
            products.push(el)
          })
          commit('ALL_PRODUCT', products)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    findOne ({ commit }, payload) {
      axios({
        method: 'get',
        url: `${host}/product/${payload}`
      })
        .then(({ data }) => {
          commit('DETAIL_PRODUCT', data)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    handleSearch ({ commit }, payload) {
      axios({
        method: 'get',
        url: `${host}/product/search?product=${payload}`
      })
        .then(({ data }) => {
          commit('SEARCH_PRODUCT', data)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    editProduct ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'patch',
          url: `${host}/product/${payload.id}/edit`,
          data: payload.data,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    deleteProduct ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'delete',
          url: `${host}/product/${payload}/delete`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    addToCart ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: `${host}/carts/${payload.id}/add-to-cart`,
          data: {
            qty: payload.qty
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getCart ({ commit }, payload) {
      axios({
        method: 'get',
        url: `${host}/carts`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          let total = 0
          data.forEach(el => {
            total += (el.idProduct.price * el.qty)
          })
          commit('CARTS', data)
          commit('TOTAL_PRICE', total)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    deleteCart ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'delete',
          url: `${host}/carts/${payload}/delete`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    register ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: `${host}/users/register`,
          data: {
            username: payload.username,
            email: payload.email,
            password: payload.password,
            address: payload.address
          }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('role', data.role)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    countTotal ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'patch',
          url: `${host}/carts/${payload.id}/update`,
          data: {
            qty: payload.qty
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    checkout ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: `${host}/transaction/checkout`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getTransaction ({ commit }, payload) {
      axios({
        method: 'get',
        url: `${host}/transaction`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('GET_TRANSACTION', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getTransactionAdm ({ commit }, payload) {
      axios({
        method: 'get',
        url: `${host}/transaction/adm`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('GET_TRANSACTION', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    payment ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'patch',
          url: `${host}/transaction/${payload.id}/update`,
          data: {
            status: `On Proccess`
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    shipping ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'patch',
          url: `${host}/transaction/${payload.id}/update`,
          data: {
            status: `Shipped`
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    delivered ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'patch',
          url: `${host}/transaction/${payload.id}/update`,
          data: {
            status: `Delivered`
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    deleteHistory ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'delete',
          url: `${host}/transaction/${payload.id}/delete`,
          data: {
            status: `Delivered`
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {
  }
})
