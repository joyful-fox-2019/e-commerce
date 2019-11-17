import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    cart: [],
    image: null,
    name: '',
    price: '',
    stock: '',
    dataGonnaBeUpdated: null
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
    },
    setDataGonnaBeUpdated (state, payload) {
      state.dataGonnaBeUpdated = payload
      router.push('/admin/updateProduct')
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
        .catch(err => [
          console.log(err)
        ])
    },
    addToCart ({ commit }, payload) {
      axios({
        url: `http://localhost:3000/users/cart`,
        method: 'PATCH',
        data: {
          product_id: payload.product_id,
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
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong`, `error`)
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
          console.log(data)
          commit('setCart', data)
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong`, `error`)
        })
    },
    removeFromCart ({ commit }, payload) {
      axios({
        url: `http://localhost:3000/users/cart/remove`,
        method: 'PATCH',
        data: {
          cart_id: payload
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Removed from cart',
            showConfirmButton: false,
            timer: 1500
          })
          this.dispatch('viewCart') // untuk panggil halaman cart lagi biar ga ke refresh
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong`, `error`)
        })
    },
    addProduct ({ commit }, payload) {
      const formData = new FormData()
      formData.set('name', payload.productName)
      formData.set('price', payload.productPrice)
      formData.set('stock', payload.productStock)
      formData.append('image', payload.productImage)

      axios({
        url: `http://localhost:3000/products`,
        method: 'POST',
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Added a new product',
            showConfirmButton: false,
            timer: 1500
          })
          router.push('/admin')
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong`, `error`)
        })
    },
    deleteProduct ({ commit }, payload) {
      axios.delete(`http://localhost:3000/products/${payload}`,
        { headers: { token: localStorage.getItem('token') } })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Product Deleted',
            showConfirmButton: false,
            timer: 1500
          })
          this.dispatch('getAllProducts')
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong`, `error`)
        })
    },
    setUpdateData ({ commit }, payload) {
      commit('setDataGonnaBeUpdated', payload)
    },
    updateProduct ({ commit }, payload) {
      console.log(payload)
      const formData = new FormData()
      formData.set('name', payload.name)
      formData.set('price', payload.price)
      formData.set('stock', payload.stock)
      formData.append('image', payload.image)
      axios({
        url: `http://localhost:3000/products/${payload.id}`,
        method: 'PUT',
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Product Updated',
            showConfirmButton: false,
            timer: 1500
          })
          router.push('/admin')
        })
        .catch(err => {
          console.log(err)
          Swal.fire('Errors', `Something went wrong`, `error`)
        })
    }
  },
  modules: {
  }
})
