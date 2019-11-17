import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/getdata'
import { next, successToast } from '../helpers/notif'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    admin: false,
    gameList: []
  },
  mutations: {
    CHANGE_LOGIN (state, payload) {
      state.login = payload
    },
    CHANGE_ADMIN (state, payload) {
      state.admin = payload
    },
    CHANGE_GAMELIST (state, payload) {
      state.gameList = payload
    }
  },
  actions: {
    thisLogin ({ commit, state }, payload) {
      axios({
        method: 'post',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('role', data.role)
          localStorage.setItem('name', data.name)
          commit('CHANGE_LOGIN', true)
          console.log(data)
          if (data.role === 'admin') {
            commit('CHANGE_ADMIN', true)
          }
          successToast(data.message)
          router.push({ path: '/' })
        })
        .catch(err => {
          console.log(err.response.data)
          next(err.response.data)
        })
    },
    thisRegister ({ commit, state }, payload) {
      return axios({
        method: 'post',
        url: '/users/register',
        data: {
          email: payload.email,
          name: payload.name,
          password: payload.password
        }
      })
    },
    fetchGameData ({ commit, state }, payload) {
      axios({
        method: 'get',
        url: '/products'
      })
        .then(({ data }) => {
          console.log(data)
          commit('CHANGE_GAMELIST', data)
        })
        .catch(err => {
          console.log(err.response.data)
          next(err.response.data)
        })
    },
    getOneData ({ commit, state }, payload) {
      return axios({
        method: 'get',
        url: `/products/detail/${payload}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }
  },
  modules: {
  }
})
