import Vue from 'vue'
import Vuex from 'vuex'
import server from '@/api/server'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: false,
    carts: [],
    products: []
  },
  mutations: {
    IS_ADMIN (state, payload) {
      state.isAdmin = true
    },
    IS_LOGIN (state, payload) {
      state.isLogin = true
    },
    IS_LOGOUT (state, payload) {
      state.isLogin = false
      state.isAdmin = false
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    EMPTY_CARTS (state, payload) {
      state.carts = []
    }
  },
  actions: {
    registerUser (context, payload) {
      return server({
        method: 'post',
        url: '/users/register',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          city: payload.city,
          isAdmin: false
        }
      })
        .then(({ data }) => {
          Swal.fire('Success', 'Succesfully registered, please login')
          return 'Register Success'
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    loginUser (context, payload) {
      return server({
        method: 'post',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('name', data.name)
          if (data.secret === 'ecommerce-hacktiv8-phase-2') {
            localStorage.setItem('privilege', 'ADMIN')
          }
          context.commit('IS_LOGIN')
          return 'Login Success'
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${err.response.data.message}`
          })
        })
    },
    getProducts (context, payload) {
      server({
        method: 'get',
        url: '/products'
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data)
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    },
    addToCart (context, payload) {
      return server({
        method: 'post',
        url: '/carts',
        data: {
          product: payload.productId,
          quantity: 1
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getCarts')
          return 'Succesfully Added Item to Cart'
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    },
    getCarts (context, payload) {
      server({
        method: 'get',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_CARTS', data)
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    },
    updateCart (context, payload) {
      server({
        method: 'put',
        url: `carts/${payload.cartId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          product: payload.productId,
          quantity: payload.quantity,
          isCheckedOut: false
        }
      })
        .then(({ data }) => {
          context.dispatch('getCarts')
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    },
    removeCart (context, payload) {
      server({
        method: 'delete',
        url: `carts/${payload.cartId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.dispatch('getCarts')
        })
        .catch((err) => {
          console.log(err.response.data.message)
        })
    },
    checkOut (context, payload) {
      let promises = []
      let productsList = []
      let totalCost = 0
      for (let i = 0; i < context.state.carts.length; i++) {
        promises.push(server({
          method: 'patch',
          url: `/products/${context.state.carts[i].product._id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            stock: context.state.carts[i].product.stock - context.state.carts[i].quantity
          }
        }))
        promises.push(server({
          method: 'put',
          url: `/carts/${context.state.carts[i]._id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            product: context.state.carts[i].product._id,
            quantity: context.state.carts[i].quantity,
            isCheckedOut: true
          }
        }))
        productsList.push(context.state.carts[i]._id)
        totalCost += context.state.carts[i].quantity * context.state.carts[i].product.price
      }
      let transactionData = {
        productsList,
        totalCost,
        status: 'booked'
      }
      promises.push(server({
        method: 'post',
        url: '/transactions',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: transactionData
      }))
      return Promise.all(promises)
        .then(({ data }) => {
          context.commit('EMPTY_CARTS')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    userSignout (context, payload) {
      localStorage.clear()
      context.commit('IS_LOGOUT')
    }
  },
  modules: {}
})
