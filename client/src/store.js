import Vue from 'vue'
import Vuex from 'vuex'
import axios from './components/apis/axios'
import router from './router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    isLogin: false,
    carts: [],
    buyerTransactions: [],
    user: {},
    sellerProducts: [],
    orders: [],
    wishlist: []
  },
  mutations: {
    get_seller_product (state, data) {
      state.sellerProducts = data
    },
    get_product (state, data) {
      state.products = data
    },
    get_one_product (state, data) {
      state.product = data
    },
    login (state, data) {
      localStorage.setItem('token', data.token)
      state.isLogin = true
    },
    is_login (state) {
      state.isLogin = true
    },
    logout (state) {
      localStorage.removeItem('token')
      state.isLogin = false
    },
    get_carts (state, data) {
      state.carts = data
    },
    get_buyer_transactions (state, data) {
      state.buyerTransactions = data
    },
    get_profile (state, data) {
      state.user = data
    },
    get_order (state, data) {
      state.orders = data
    },
    get_wishlist (state, data) {
      state.wishlist = data
    }
  },
  actions: {
    GET_WISHLIST (context) {
      Swal.showLoading()
      axios({
        method: 'get',
        url: '/wishlist',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.close()
          context.commit('get_wishlist', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    REMOVE_FROM_WISHLIST (context, id) {
      return axios({
        method: 'delete',
        url: `/wishlist/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          return data
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    IS_WISHLIST (context, id) {
      return axios({
        method: 'get',
        url: `/wishlist/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          return data
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    ADD_TO_WISHLIST (context, id) {
      axios({
        method: 'post',
        url: `/wishlist/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    SEARCH (context, keyword) {
      Swal.showLoading()
      axios({
        method: 'get',
        url: `products/search?keyword=${keyword}`
      })
        .then(({ data }) => {
          Swal.close()
          context.commit('get_product', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    CHANGE_STATUS (context, { id, status }) {
      Swal.showLoading()
      axios({
        method: 'patch',
        url: '/transactions/' + id,
        data: {
          status
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          if (status === 'Done') {
            context.dispatch('GET_BUYER_TRANSACTIONS')
          } else {
            context.dispatch('GET_ORDERS')
          }
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    GET_ORDERS (context) {
      Swal.showLoading()
      axios.get('/transactions/seller', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.close()
          context.commit('get_order', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    DELETE_PRODUCT (context, id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios.delete(`/products/${id}`, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(() => {
              return Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
                .then(() => {
                  router.push('/mystore/products')
                })
            })
            .catch(({ response }) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.message
              })
            })
        }
      })
    },
    CREATE_PRODUCT (context, fd) {
      Swal.showLoading()
      axios.post(`/products`, fd, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          Swal.close()
          router.push('/mystore/products')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    UPDATE_PRODUCT (context, { id, fd }) {
      Swal.showLoading()
      axios.patch(`/products/${id}`, fd, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          router.push('/mystore/products')
          context.dispatch('GET_ONE_PRODUCT', id)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    GET_SELLER_PRODUCT (context) {
      Swal.showLoading()
      axios.get('/products/seller', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.close()
          context.commit('get_seller_product', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    UPDATE_PROFILE (context, fd) {
      Swal.showLoading()
      axios.patch('/users', fd, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('GET_PROFILE')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    GET_PROFILE (context) {
      axios({
        method: 'get',
        url: '/users',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('get_profile', data)
        })
        .catch(({ response }) => {

        })
    },
    GET_BUYER_TRANSACTIONS (context) {
      Swal.showLoading()
      axios({
        method: 'get',
        url: '/transactions',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.close()
          context.commit('get_buyer_transactions', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    CREATE_TRASACTIONS (context, totalPrice) {
      Swal.showLoading()
      return axios({
        method: 'post',
        url: '/transactions',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          totalPrice
        }
      })
        .then(() => {

        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    REMOVE_ITEM (context, id) {
      Swal.showLoading()
      axios({
        method: 'patch',
        url: `/carts/removeitem/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          context.dispatch('GET_CARTS')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    IS_LOGIN (context) {
      context.commit('is_login')
    },
    CHANGE_QTY (context, { productId, qty }) {
      axios({
        method: 'patch',
        url: `/carts/changeqty`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          productId,
          qty
        }
      })
        .then(() => {
          console.log('success')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    GET_CARTS (context) {
      Swal.showLoading()
      return axios({
        method: 'get',
        url: '/carts',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.close()
          context.commit('get_carts', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    ADD_TO_CART (context, { productId, seller, qty }) {
      Swal.showLoading()
      axios({
        method: 'post',
        url: '/carts',
        data: {
          productId,
          seller,
          qty
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          router.push('/carts')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    LOGOUT (context) {
      context.commit('logout')
      router.push('/')
    },
    REGISTER (context, { email, password, address }) {
      Swal.showLoading()
      return axios({
        method: 'post',
        url: '/users/register',
        data: {
          email,
          password,
          address
        }
      })
        .then(({ data }) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          context.commit('login', data)
          context.dispatch('GET_PROFILE')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    LOGIN (context, { email, password }) {
      Swal.showLoading()
      return axios({
        method: 'post',
        url: '/users/login',
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          Swal.close()
          context.commit('login', data)
          context.dispatch('GET_PROFILE')
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    GET_PRODUCTS (context) {
      Swal.showLoading()
      axios({
        methods: 'get',
        url: '/products'
      })
        .then(({ data }) => {
          Swal.close()
          context.commit('get_product', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    },
    GET_ONE_PRODUCT (context, id) {
      Swal.showLoading()
      axios({
        methods: 'get',
        url: `/products/${id}`
      })
        .then(({ data }) => {
          Swal.close()
          context.commit('get_one_product', data)
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message
          })
        })
    }
  }
})
