import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../helpers/axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    games: [],
    selectedGame: {},
    cart: [],
    isLogin: false
  },
  mutations: {
    loginTrue (state) {
      state.isLogin = true
    },
    loginFalse (state) {
      state.isLogin = false
    },
    getAllGame (state) {
      axios({
        method: 'get',
        url: '/products'
      })
        .then(({ data }) => {
          state.games = data
        })
        .catch(err => {
          Swal.fire('Error', err, 'error')
        })
    },
    getMyGame (state) {
      axios({
        method: 'get',
        url: '/products/user',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          state.games = data
        })
        .catch(err => {
          Swal.fire('Error', err, 'error')
        })
    },
    getCart (state) {
      axios({
        method: 'get',
        url: '/cart',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          state.cart = data
        })
    }
  },
  actions: {
    getSelectedGame (state, payload) {
      axios({
        method: 'get',
        url: `/products/${payload}`
      })
        .then(({ data }) => {
          state.selectedGame = data
        })
        .catch(err => {
          Swal.fire('Error', err, 'error')
        })
    }
  },
  modules: {
  }
})
