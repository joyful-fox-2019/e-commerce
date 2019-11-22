import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3001',
    userlogin: 'user',
    products: [],
    cart: [],
    totalItem: 0,
    totalCost: 0,
    currentProduct: {}
  },
  mutations: {
    CHANGE_USER_LOGIN (state, payload) {
      state.userlogin = payload
    },
    ADD_PRODUCT (state, payload) {
      state.products.push(payload)
    },
    SET_PRODUCT (state, payload) {
      state.products = payload
    },
    SET_CART (state, payload) {
      state.cart = payload.data
      state.totalItem = payload.item
      state.totalCost = payload.cost
    },
    SET_CURRENT_PRODUCT (state, payload) {
      state.currentProduct = payload
    }
  },
  actions: {
    register ({ state }, payload) {
      return axios({
        url: `${state.baseUrl}/user/register`,
        method: 'POST',
        data: payload
      })
    },
    login ({ state, commit }, payload) {
      return axios({
        url: `${state.baseUrl}/user/login`,
        method: 'POST',
        data: payload
      })
    },
    uploadGCS ({ state, commit }, payload) {
      let data = payload.data
      return axios({
        url: `${state.baseUrl}/image/uploadgcs`,
        method: 'POST',
        data,
        headers: {
          access_token: payload.token
        }
      })
    },
    createProduct ({ state, commit }, payload) {
      axios({
        url: `${state.baseUrl}/product`,
        method: 'POST',
        data: payload.productData,
        headers: {
          access_token: payload.token
        }
      })
        .then(response => {
          commit('ADD_PRODUCT', response.data)
          console.log(response.data)
          Swal.fire({
            icon: 'success',
            title: 'Create Product',
            text: 'Create product success !'
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Create product error'
          })
        })
    },
    fetchingProduct ({ state, commit }) {
      axios({
        url: `${state.baseUrl}/product`,
        method: 'GET'
      })
        .then(response => {
          commit('SET_PRODUCT', response.data)
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Fetch data error'
          })
        })
    },
    deleteProduct ({ state, dispatch }, payload) {
      axios({
        url: `${state.baseUrl}/product/${payload.id}`,
        method: 'DELETE',
        headers: {
          access_token: payload.token
        }
      })
        .then(response => {
          console.log(response)
          dispatch('fetchingProduct')
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Delete Product',
            text: 'Delete product failed!'
          })
        })
    },
    editProduct ({ state, commit }, payload) {
      return axios({
        url: `${state.baseUrl}/product/${payload.id}`,
        method: 'PUT',
        headers: {
          access_token: payload.token
        }
      })
    },
    getOneProduct ({ state, commit }, payload) {
      return axios({
        url: `${state.baseUrl}/product/${payload.id}`,
        method: 'GET',
        headers: {
          access_token: payload.token
        }
      })
    },
    addCart ({ state, dispatch }, payload) {
      axios({
        url: `${state.baseUrl}/product/${payload}`,
        method: 'GET'
      })
        .then(response => {
          console.log(response, 'ini get product')
          let data = {
            productId: response.data._id,
            productName: response.data.productName,
            imageUrl: response.data.imageUrl,
            quantity: 1,
            price: response.data.price
          }
          dispatch('createCart', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    createCart ({ state }, payload) {
      axios({
        url: `${state.baseUrl}/cart`,
        method: 'POST',
        data: payload
      })
        .then(response => {
          console.log(response)
          Swal.fire({
            icon: 'success',
            title: 'Add to cart',
            text: 'Add to your cart success!'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchingCart ({ state, commit }) {
      axios({
        url: `${state.baseUrl}/cart`,
        method: 'GET'
      })
        .then(response => {
          let item = response.data.length
          let cost = 0
          for (let i = 0; i < response.data.length; i++) {
            cost += response.data[i].price
          }
          let payload = {
            data: response.data,
            item,
            cost
          }
          commit('SET_CART', payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProductFromCart ({ state, dispatch }, payload) {
      axios({
        url: `${state.baseUrl}/cart/${payload}`,
        method: 'DELETE'
      })
        .then(response => {
          dispatch('fetchingCart')
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
