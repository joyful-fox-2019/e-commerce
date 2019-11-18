import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../config/axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token: localStorage.getItem('access_token') || '',
    isLoggedIn: false,
    currentUser: {},
    allProducts: [],
    myCart: []
  },
  mutations: {
    FETCH_ALL_PRODUCTS(state, payload) {
      state.allProducts = payload
    },
    FETCH_MY_CART(state, payload) {
      state.myCart = payload
      // console.log('cart fetched')
    },
    UPDATE_LOGIN_STATUS(state, payload) {
      state.isLoggedIn = payload
      // console.log('ini di update login status', state.isLoggedIn)
    },
    FETCH_CURRENT_USER(state, { _id, name, email, role }) {
      state.currentUser = { _id, name, email, role }
      console.log('fetch current user', state.currentUser);
    }
  },
  actions: {
    toast(message) {
      this.$buefy.toast.open(message);
    },
    success(message) {
      this.$buefy.toast.open({
        message: message,
        type: "is-success"
      });
    },
    danger(message) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message,
        position: "is-bottom",
        type: "is-danger"
      });
    },

    fetchAllProducts({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/products'
        })
          .then(({ data }) => {
            commit('FETCH_ALL_PRODUCTS', data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchMyCart({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/carts',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            // console.log('ini data di store/action/fetchMyCart', data);
            commit('FETCH_MY_CART', data.user)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    checkToken({ commit }) {
      // console.log('masuk checktoken');
      return new Promise((resolve, reject) => {
        try {
          let isLoggedIn
          if (localStorage.getItem('access_token')) {
            isLoggedIn = true
          }
          else {
            isLoggedIn = false
          }
          commit('UPDATE_LOGIN_STATUS', isLoggedIn)
          resolve()
        }
        catch (err) { reject(err) }
      })
    },
    fetchCurrentUser({ commit }) {
      // console.log('masuk fetch current user');
      return new Promise((resolve, reject) => {
        // console.log('ini access token pas fetch user', localStorage.getItem('access_token'));
        axios({
          method: 'GET',
          url: '/users/user',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            // console.log('ini data pas fetch user', data)
            commit('FETCH_CURRENT_USER', data.user)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  getters: {
  }
})