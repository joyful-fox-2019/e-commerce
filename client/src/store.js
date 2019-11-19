import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import swal from 'sweetalert2'
import router from './router'
var BASE_URL = 'http://e-commerce-server.panji-h8.online'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    product: {
      product: '',
      price: '',
      stock: '',
      _id: '',
      category: ''
    },
    arrProduct: [],
    arrProductAll: [],
    listItem: true,
    updateForm: false,
    userLogin: {
      token: ''
    },
    userRegister: {
      role: '',
      name: '',
      _id: ''
    },
    arrCart: [],
    cart: {
      countProduct: '',
      price: '',
      product: '',
      BuyerId: '',
      _id: '',
      productName: '',
      sold: 0,
      imageData: ''
    },
    totalPrice: 0,
    arrCheckout: [],
    arrTransaction: []
  },
  mutations: {
    setProduct (state, payload) {
      state.arrProduct = payload
    },
    setUserLogin (state, payload) {
      state.userLogin.token = payload
    },
    setUserRegister (state, payload) {
      state.userRegister.name = payload.name
      state.userRegister.role = payload.role
      state.userRegister._id = payload._id
    },
    setAllProduct (state, payload) {
      state.arrProductAll = payload
    },
    update (state, payload) {
      console.log(payload)
      state.product.product = payload.product
      state.product.price = payload.price
      state.product.stock = payload.stock
    },
    deleteProduct (state, payload) {
      state.product.product = payload.product
      state.product.price = payload.price
      state.product.stock = payload.stock
    },
    createProduct (state, payload) {
      state.product.product = payload.product
      state.product.price = payload.price
      state.product.stock = payload.stock
      state.product._id = payload._id
      state.product.imageData = payload.imageData
      state.product.sold = payload.sold
    },
    addToCart (state, payload) {
      state.cart.product = payload.product
      state.cart.countProduct = payload.countProduct
      state.cart.price = payload.price
      state.cart.BuyerId = payload.BuyerId
      state.cart._id = payload._id
    },
    checkCart (state, payload) {
      state.arrCart = payload
    },
    deleteCart (state, payload) {
      state.cart.product = payload.product
      state.cart.countProduct = payload.countProduct
      state.cart.price = payload.price
      state.cart.BuyerId = payload.BuyerId
      state.cart._id = payload._id
    },
    checkOut (state, payload) {
      state.totalPrice = payload.TotalPrice
      state.arrCheckout = payload.TotalProduct
    },
    setTransaction (state, payload) {
      state.arrTransaction = payload
    }
  },
  actions: {
    updateStatus ({ commit }, payload) {
      Axios({
        url: `${BASE_URL}/transaction/${payload}`,
        method: 'patch',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.dispatch('setTransaction')
        })
        .catch(err => [
          console.log(err)
        ])
    },
    setTransaction ({ commit }) {
      Axios({
        url: `${BASE_URL}/transaction`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('setTransaction', data)
          let payload = {
            TotalPrice: 0,
            TotalProduct: []
          }
          commit('checkOut', payload)
        })
    },
    checkOut ({ commit }) {
      let swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Prepare Your Money !',
        text: 'Do you want to checkout ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, i gotta ton of cash !',
        cancelButtonText: 'No, still waiting my wallet !',
        reverseButtons: true
      })
        .then((result) => {
          if (result.value) {
            Axios({
              url: `${BASE_URL}/cart/checkout`,
              method: 'get',
              headers: {
                token: localStorage.getItem('token')
              }
            })
              .then(({ data }) => {
                commit('checkOut', data)
                swalWithBootstrapButtons.fire(
                  'Done Checkout',
                  'Your Cart has been emptied.',
                  'success',
                  2000
                )
                this.dispatch('checkCart')
              })
              .catch((err) => {
                swal.fire({
                  icon: 'error',
                  title: `${err.response.data}`,
                  showConfirmButton: false,
                  timer: 2000
                })
              })
          } else if (
          /* Read more about handling dismissals below */
            result.dismiss === swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              "Don't have money ?",
              'error'
            )
          }
        })
        .catch(() => {
          swal.close()
          swal.fire({
            icon: 'error',
            title: 'Failed checkout',
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    deleteCart ({ commit }, payload) {
      let swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
        .then((result) => {
          if (result.value) {
            Axios({
              url: `${BASE_URL}/cart/${payload}`,
              method: 'DELETE',
              headers: {
                token: localStorage.getItem('token')
              }
            })
              .then(result => {
                commit('deleteCart', result)
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your Cart has been deleted.',
                  'success',
                  2000
                )
                this.dispatch('checkCart')
              })
              .catch(() => {
                swal.fire({
                  icon: 'error',
                  title: "You're unauthorize to delete this cart",
                  showConfirmButton: false,
                  timer: 2000
                })
              })
          } else if (
          /* Read more about handling dismissals below */
            result.dismiss === swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your cart is safe',
              'error'
            )
          }
        })
        .catch(() => {
          swal.close()
          swal.fire({
            icon: 'error',
            title: 'Failed deleting cart',
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    checkCart ({ commit }) {
      swal.fire({
        title: 'Loading Data',
        showConfirmButton: false
      })
      Axios({
        url: `${BASE_URL}/cart`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('checkCart', data)
          swal.close()
        })
        .catch(() => {
          swal.close()
        })
    },
    addToCart ({ commit }, payload) {
      let swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Adding to Cart ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, add to cart!',
        cancelButtonText: 'Dont have money',
        reverseButtons: true
      })
        .then((result) => {
          if (result.value) {
            Axios({
              url: `${BASE_URL}/cart`,
              method: 'post',
              headers: {
                token: localStorage.getItem('token')
              },
              data: {
                countProduct: payload.countProduct,
                _id: payload._id
              }
            })
              .then(result => {
                commit('addToCart', result)
                swalWithBootstrapButtons.fire(
                  'Created',
                  'You adding a product to cart !',
                  'success',
                  2000
                )
              })
              .catch(() => {
                swal.fire({
                  icon: 'error',
                  title: "You're can't buy more than the stock",
                  showConfirmButton: false,
                  timer: 2000
                })
              })
          } else if (
          /* Read more about handling dismissals below */
            result.dismiss === swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your product is safe',
              'error'
            )
          }
        })
        .catch(() => {
          swal.close()
          swal.fire({
            icon: 'error',
            title: 'Failed adding product to cart',
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    createProduct ({ commit }, payload) {
      if (!payload.pdf) {
        swal.fire({
          icon: 'error',
          title: 'failed to upload file ',
          text: 'Cannot be empty',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        swal.fire({
          title: 'wait a minute to upload data',
          allowOutsideClick: () => !this.$swal.isLoading(),
          showConfirmButton: false
        })
        // swal.showLoading('wait a minute ')
        let pdf = payload.pdf
        var bodyFormData = new FormData()
        bodyFormData.append('imageData', pdf)
        Axios({
          url: `${BASE_URL}/upload`,
          method: 'POST',
          data: bodyFormData
        })
          .then(({ data }) => {
            return Axios({
              url: `${BASE_URL}/product`,
              method: 'post',
              data: {
                product: payload.product,
                category: payload.category,
                stock: payload.stock,
                price: payload.price,
                imageData: data.imageData
              },
              headers: {
                token: localStorage.getItem('token')
              }
            })
          })
          .then(({ data }) => {
            swal.close()
            swal.fire({
              icon: 'success',
              title: 'success creating product',
              showConfirmButton: false,
              timer: 2000
            })
            commit('createProduct', data)
          })
          .catch((err) => {
            swal.close()
            swal.fire({
              icon: 'error',
              title: `${err.response.data}`,
              showConfirmButton: false,
              timer: 2000
            })
          })
      }
    },
    deleteProduct ({ commit }, payload) {
      let swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
        .then((result) => {
          if (result.value) {
            Axios({
              url: `${BASE_URL}/product/${payload}`,
              method: 'DELETE',
              headers: {
                token: localStorage.getItem('token')
              }
            })
              .then(result => {
                commit('deleteProduct', result)
                swalWithBootstrapButtons.fire(
                  'Deleted!',
                  'Your Product has been deleted.',
                  'success',
                  2000
                )
                this.dispatch('showProduct')
              })
              .catch(() => {
                swal.fire({
                  icon: 'error',
                  title: "You're unauthorize to delete this product",
                  showConfirmButton: false,
                  timer: 2000
                })
              })
          } else if (
          /* Read more about handling dismissals below */
            result.dismiss === swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your product is safe',
              'error'
            )
          }
        })
        .catch(() => {
          swal.close()
          swal.fire({
            icon: 'error',
            title: 'Failed deleting product',
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    showProduct ({ commit }) {
      swal.fire({
        title: 'Loading Data',
        showConfirmButton: false
      })
      Axios({
        url: `${BASE_URL}/product`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          let arr = []
          data.forEach(element => {
            arr.unshift(element)
          })
          commit('setProduct', arr)
          swal.close()
        })
        .catch(() => {
          swal.close()
        })
    },
    updateProduct ({ commit }, payload) {
      swal.fire({
        title: 'updating data',
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: `${BASE_URL}/product/${payload._id}`,
        method: 'patch',
        data: {
          product: payload.product,
          stock: payload.stock,
          price: payload.price
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          swal.close()
          swal.fire({
            icon: 'success',
            title: 'success to update data',
            showConfirmButton: false,
            timer: 2000
          })
          commit('update', data)
          this.dispatch('showProduct')
        })
        .catch(err => {
          swal.close()
          swal.fire({
            icon: 'error',
            title: 'Update Failed ',
            text: err.response.data,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    showUpdate ({ commit }, payload) {
      swal.fire({
        title: 'Loading data',
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: `${BASE_URL}/product/${payload}`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          swal.close()
          commit('update', data)
        })
        .catch(() => {
          swal.close()
        })
    },
    register ({ commit }, payload) {
      swal.fire({
        title: 'wait a minute to register',
        allowOutsideClick: () => swal.isLoading(),
        showConfirmButton: false
      })
      Axios({
        url: `${BASE_URL}/register`,
        method: 'POST',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          role: payload.role
        }
      })
        .then(({ data }) => {
          swal.close()
          commit('setUserRegister', data)
          swal.fire({
            icon: 'success',
            title: 'success to register',
            showConfirmButton: false,
            timer: 2000
          })
        })
        .catch(err => {
          swal.close()
          swal.fire({
            icon: 'error',
            title: 'REGISTER Failed ',
            text: err.response.data,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    login ({ commit }, payload) {
      swal.fire({
        title: 'wait a minute to login',
        allowOutsideClick: () => swal.isLoading()
      })
      Axios({
        url: `${BASE_URL}/login`,
        data: {
          email: payload.email,
          password: payload.password
        },
        method: 'POST'
      })
        .then(({ data }) => {
          swal.close()
          swal.fire({
            icon: 'success',
            title: 'success to login',
            showConfirmButton: false,
            timer: 2000
          })
          localStorage.setItem('token', data)
          commit('setUserLogin', data)
          return Axios({
            url: `${BASE_URL}/user`,
            method: 'get',
            headers: {
              token: localStorage.getItem('token')
            }
          })
        })
        .then(({ data }) => {
          if (data.role === 'Seller') {
            localStorage.setItem('role', data.role)
            router.push('/product')
          } else {
            localStorage.setItem('role', data.role)
            router.push('/customer')
          }
        })
        .catch(err => {
          swal.close()
          swal.fire({
            icon: 'error',
            title: 'login Failed ',
            text: err.response.data,
            showConfirmButton: false,
            timer: 2000
          })
        })
    },
    showAllProduct ({ commit }) {
      swal.fire({
        title: 'Loading Data',
        showConfirmButton: false
      })
      Axios({
        url: `${BASE_URL}/allProduct`,
        method: 'get'
      })
        .then(({ data }) => {
          let arr = []
          data.forEach(element => {
            arr.unshift(element)
          })
          commit('setAllProduct', arr)
          swal.close()
        })
        .catch(() => {
          swal.close()
          swal.fire({
            icon: 'error',
            timer: 2000,
            text: 'Database not connected',
            showConfirmButton: false
          })
        })
    }
  },
  modules: {
  },
  mount: {

  }
})
