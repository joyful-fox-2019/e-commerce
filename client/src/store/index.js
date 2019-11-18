import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config/myaxios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      email: ''
    },
    loginStatus: false,
    isAdmin: false,
    Toast: Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  },
  mutations: {
    CHANGE_LOGIN (state, payload) {
      state.loginStatus = payload
    },
    SET_ADMIN (state, payload) {
      state.isAdmin = payload
    },
    SET_USER (state) {
      state.user.name = localStorage.getItem('name')
      state.user.email = localStorage.getItem('email')
    }
  },
  actions: {
    login ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/users/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    register ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/users/register',
          data: {
            name: payload.name,
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    addProduct ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const newProduct = new FormData()
        newProduct.append('name', payload.name)
        newProduct.append('price', payload.price)
        newProduct.append('stock', payload.stock)
        newProduct.append('category', payload.category)
        payload.images.forEach(image => {
          newProduct.append('images', image)
        })
        axios({
          method: 'POST',
          url: '/products',
          headers: {
            token: localStorage.getItem('token')
          },
          data: newProduct
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    getProducts ({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/products'
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    },
    getProductId ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: `/products/${payload.id}`
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(({ response }) => {
            reject(response)
          })
      })
    }
  },
  modules: {
  }
})
