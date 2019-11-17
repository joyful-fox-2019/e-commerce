import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../apis/server'
import router from '../router/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fruits: [],
    vegetables: [],
    proteins: [],
    grains: [],
    filterTag: {
      isVegetable: true,
      isFruit: true,
      isProtein: true,
      isGrain: true
    },
    detailProduct: null,
    isLogin: false,
    carts: [],
    isCart: false,
    userTransaction: [],
    adminTransaction: []
  },
  mutations: {
    ADMIN_TRANS (state, payload) {
      state.adminTransaction = payload
    },
    CHECKOUT (state, payload) {
      state.userTransaction = payload
    },
    IS_CART (state, payload) {
      state.isCart = payload
    },
    ADD_CART (state, payload) {
      state.carts = payload
    },
    addFruits (state, payload) {
      state.fruits = payload
    },
    addVegetables (state, payload) {
      state.vegetables = payload
    },
    addProteins (state, payload) {
      state.proteins = payload
    },
    addGrains (state, payload) {
      state.grains = payload
    },
    filterProduct (state, payload) {
      state.filterTag = payload
    },
    getDetail (state, payload) {
      state.detailProduct = payload
    },
    setLogin (state) {
      state.isLogin = true
    },
    setLogout (state) {
      state.isLogin = false
    }
  },
  actions: {
    getAdminTrans ({ commit }) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'get',
          url: '/transactions',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('ADMIN_TRANS', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getUserTrans ({ commit }) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'get',
          url: '/transactions/customer',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('CHECKOUT', data)
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
          method: 'patch',
          url: '/transactions',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            router.push(`/user/transaction`)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getCart ({ commit }) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'get',
          url: '/carts',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('ADD_CART', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    addCart ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'patch',
          url: `/carts/${payload}`,
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
    login ({ commit }, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          method: 'post',
          url: '/users/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            if (data.role === 'admin') {
              localStorage.setItem('token', data.token)
              localStorage.setItem('name', data.name)
              localStorage.setItem('email', data.email)
              localStorage.setItem('setting', true)
              router.push(`/admin`)
            } else {
              localStorage.setItem('token', data.token)
              localStorage.setItem('name', data.name)
              localStorage.setItem('email', data.email)
              router.push(`/`)
              commit('setLogin')
            }
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
          url: '/users/register',
          data: {
            email: payload.email,
            password: payload.password,
            name: payload.name
          }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('name', data.name)
            localStorage.setItem('email', data.email)
            router.push(`/`)
            commit('setLogin')
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getDetailProduct ({ commit }, payload) {
      axios({
        method: 'get',
        url: `/products/${payload}`
      })
        .then(({ data }) => {
          commit('getDetail', data)
          router.push(`/detail/${payload}`)
        })
    },
    getFruits ({ commit }) {
      axios({
        method: 'get',
        url: '/products?tag=buah'
      })
        .then(({ data }) => {
          commit('addFruits', data)
        })
    },
    getVegetables ({ commit }) {
      axios({
        method: 'get',
        url: '/products?tag=sayur'
      })
        .then(({ data }) => {
          commit('addVegetables', data)
        })
    },
    getProteins ({ commit }) {
      axios({
        method: 'get',
        url: '/products?tag=protein'
      })
        .then(({ data }) => {
          commit('addProteins', data)
        })
    },
    getGrains ({ commit }) {
      axios({
        method: 'get',
        url: '/products?tag=grain'
      })
        .then(({ data }) => {
          commit('addGrains', data)
        })
    }
  },
  modules: {
  }
})
