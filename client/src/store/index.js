import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

const url = 'http://localhost:3000'
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    role: 'customer',
    products: [],
    cart: [],
    history: []
  },
  mutations: {
    login (state, payload) {
      state.isLogin = true
      state.username = payload.username
      state.role = payload.role
    },
    fetchProduct (state, payload) {
      state.products = payload
    },
    fetchHistory (state, payload) {
      state.history = payload
    },
    fetchCart (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    register ({ state, commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: url + '/register',
          data: payload
        })
          .then(({ data }) => {
            commit('login', data)
            resolve(data)
            Toast.fire({
              icon: 'success',
              title: 'Register successfully'
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.errors.join(', ')
            })
          })
      })
    },
    login ({ state, commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: url + '/login',
          data: payload
        })
          .then(({ data }) => {
            commit('login', data)
            resolve(data)
            Toast.fire({
              icon: 'success',
              title: 'Sign in successfully'
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.errors.join(', ')
            })
          })
      })
    },
    fetchProduct ({ state, commit, dispatch }, payload) {
      Swal.showLoading()
      axios({
        method: 'get',
        url: url + `/product?tag=${payload.tag}&name=${payload.name}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('fetchProduct', data)
          Swal.close()
        })
        .catch(err => {
          Swal.close()
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    create ({ state, commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.set('name', payload.name)
        fd.set('description', payload.description)
        fd.set('price', payload.price)
        fd.set('stock', payload.stock)
        payload.tags.forEach(tag => {
          fd.append('tags', tag)
        })
        payload.imgUrl.forEach(img => {
          fd.append('imgUrl', img)
        })

        axios({
          method: 'post',
          url: url + '/product',
          data: fd,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            dispatch('fetchProduct', {
              name: '',
              tag: ''
            })
            resolve(data)
            Toast.fire({
              icon: 'success',
              title: 'Product added'
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.errors.join(', ')
            })
          })
      })
    },
    deleteProduct ({ state, commit, dispatch }, payload) {
      axios({
        method: 'delete',
        url: url + `/product/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('fetchProduct', {
            name: '',
            tag: ''
          })
          Toast.fire({
            icon: 'success',
            title: 'Delete success'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    findProduct ({ state, commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: url + `/product/${payload.id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.errors.join(', ')
            })
          })
      })
    },
    update ({ state, commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        let fd = new FormData()
        fd.set('name', payload.name)
        fd.set('description', payload.description)
        fd.set('price', payload.price)
        fd.set('stock', payload.stock)
        payload.tags.forEach(tag => {
          fd.append('tags', tag)
        })
        payload.remove.forEach(img => {
          fd.append('remove', img)
        })
        payload.imgUrl.forEach(img => {
          fd.append('imgUrl', img)
        })

        axios({
          method: 'put',
          url: url + `/product/${payload.id}`,
          data: fd,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            dispatch('fetchProduct', {
              name: '',
              tag: ''
            })
            resolve(data)
            Toast.fire({
              icon: 'success',
              title: 'Update success'
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.response.data.errors.join(', ')
            })
          })
      })
    },
    addcart ({ state, commit, dispatch }, payload) {
      axios({
        method: 'post',
        url: url + `/cart`,
        data: {
          productId: payload.id
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('fetchCart')
          Toast.fire({
            icon: 'success',
            title: 'Added to cart success'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    fetchCart ({ state, commit, dispatch }) {
      Swal.showLoading()
      axios({
        method: 'get',
        url: url + '/cart',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.close()
          commit('fetchCart', data)
        })
        .catch(err => {
          Swal.close()

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    deleteCart ({ state, commit, dispatch }, payload) {
      axios({
        method: 'delete',
        url: url + `/cart/${payload.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('fetchCart')
          Toast.fire({
            icon: 'success',
            title: 'Delete success'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    buy ({ state, commit, dispatch }, payload) {
      axios({
        method: 'post',
        url: url + '/transaction',
        data: {
          productList: payload.productList
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Toast.fire({
            icon: 'success',
            title: 'Buy success'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    fetchHistory ({ state, commit, dispatch }) {
      Swal.showLoading()      
      let urlHistory
      if (state.role === 'admin') {
        urlHistory = '/transaction/admin'
      } else {
        urlHistory = '/transaction'
      }
      axios({
        method: 'get',
        url: url + urlHistory,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.close()
          commit('fetchHistory', data)
        })
        .catch(err => {
          Swal.close()
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    },
    updateStatus ({ state, commit, dispatch }, payload) {
      axios({
        method: 'patch',
        url: url + `/transaction/${payload.id}`,
        data: {
          status: payload.status
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          dispatch('fetchHistory')
          Toast.fire({
            icon: 'success',
            title: 'Status updated'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors.join(', ')
          })
        })
    }
  },
  modules: {
  }
})
