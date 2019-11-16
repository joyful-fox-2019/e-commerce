import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import db from "../apis/firestore"
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    cart: []
  },
  mutations: {
    setLogin (state, payload) {
      state.isLogin = payload
    },
    setProducts (state, payload) {
      state.products = payload
    },
    setCart (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    getAllProducts ({ commit }) {
      axios({
        url: `http://localhost:3000/products`,
        method: 'GET'
      })
        .then(({ data }) => {
          commit('setProducts', data)
        })
    },
    addToCart ({ commit }, payload) {
      axios({
        url: `http://localhost:3000/users/cart`,
        method: 'PATCH',
        data: {
          product_id: payload.product_id,
          product_name: payload.product_name,
          product_image: payload.product_image,
          quantity: 1
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Added to cart',
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    viewCart ({ commit }, payload) {
      axios({
        url: `http://localhost:3000/users/cart`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setCart', data)
        })
    }
  },
  modules: {
  }
})
