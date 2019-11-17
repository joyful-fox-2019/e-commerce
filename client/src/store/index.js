import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../../config/axios'
import { Product } from './modules/product'
import { User } from './modules/user'
import { Transaction } from './modules/transaction'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products: Product,
    users: User,
    transactions: Transaction
  },
  state: {
    login: false,
    username: '',
    admin: false,
    userId: '',
    state: false
  },
  mutations: {
    LOGIN (state, payload) {
      state.login = payload
    },
    USERNAME (state, payload) {
      state.username = payload
    },
    SET_ADMIN (state, payload) {
      state.admin = payload
    },
    SET_ID (state, payload) {
      state.userId = payload
    },
    SET_STATE (state, payload) {
      state.state = payload
    }
  },
  actions: {
    login (context, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          url: '/users/login',
          method: 'post',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            context.commit('LOGIN', true)
            context.commit('USERNAME', data.username)
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            resolve()
          })
          .catch((err) => {
            reject(err.response)
          })
      })
    },
    register (context, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          url: '/users/register',
          method: 'post',
          data: {
            username: payload.username,
            password: payload.password,
            email: payload.email
          }
        })
          .then(({ data }) => {
            context.commit('LOGIN', true)
            context.commit('USERNAME', data.username)
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            resolve()
          })
          .catch((err) => {
            reject(err.response)
          })
      })
    },
    google (context, payload) {
      return new Promise((resolve, reject) => {
        Axios({
          url: '/users/login/google',
          method: 'post',
          data: {
            id_token: payload
          }
        })
          .then(({ data }) => {
            context.commit('LOGIN', true)
            context.commit('USERNAME', data.username)
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            resolve()
          })
          .catch((err) => {
            reject(err.response)
          })
      })
    }
  }
})
