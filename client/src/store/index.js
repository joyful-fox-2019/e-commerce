import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/api'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    isAdmin: false,
    products: [],
    cart: []
  },
  mutations: {
    LOGIN(state, payload) {
      state.isLogin = true
      state.username = payload.username
      state.isAdmin = payload.isAdmin
      console.log(payload);
    },
    FETCH_PRODUCTS(state, payload) {
      state.products = payload
    },
    VIEW_CART(state, payload) {
      state.cart = payload
    },
    setDataGonnaBeUpdated(state, payload) {
      state.dataGonnaBeUpdated = payload
      router.push('/admin/updateProduct')
    }
  },
  actions: {
    login(context, payload) {
      console.log(payload, "ini dari store")
      return new Promise(function (resolve, reject) {
        axios({
          method: 'POST',
          url: `/user/login`,
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            console.log('asas', data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("isAdmin", data.user.isAdmin);
            // Swal.fire("Logged in", "Have a nice day", "success")
            context.commit("LOGIN", data);
            resolve()
          })
          .catch(err => {
            console.log(`err`, err.response);
            reject(err)
          })
      })
    },
    register(context, payload) {
      console.log(payload)
      return new Promise(function (resolve, reject) {
        axios({
          method: 'POST',
          url: `/user/register`,
          data: {
            username: payload.username,
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            resolve()
            console.log(`masuk yeay store`);
          })
          .catch(err => {
            console.log(`err store`, err.response);
            reject(err)
          })
      })
    },
    fetchProducts(context) {
      axios({
        url: `/products`,
        method: 'GET'
      })
        .then(({ data }) => {
          context.commit('FETCH_PRODUCTS', data)
        })
    },
    singleProduct(context, payload) {
      console.log(payload)
      return new Promise(function (resolve, reject) {
        axios({
          url: `/products/${payload}`,
          method: 'GET'
        })
          .then(({ data }) => {
            console.log(data, "views");
            resolve(data);
          })
          .catch(err => {
            console.log(err.response, "=================");
            reject(err)
          });
      })
    },
    addToCart(context, payload) {
      return new Promise(function (resolve, reject) {
        console.log(payload, "index store")
        axios({
          url: `/user/cart`,
          method: 'PATCH',
          data: {
            product_id: payload._id,
            product_name: payload.name,
            product_price: payload.price,
            product_stock: payload.stock,
            product_image: payload.image,
            quantity: payload.quantity
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    viewCart(context, payload) {
      return new Promise(function (resolve, reject) {
        axios({
          url: `/user/cart`,
          method: 'GET',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            console.log(data, " ====== ini cart dari store")
            context.commit('VIEW_CART', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })

    },
    removeFromCart({ commit }, payload) {
      let id = payload
      return new Promise(function (resolve, reject) {
        axios({
          url: `/user/cart/${id}`,
          method: 'delete',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    addProduct(context, payload) {
      console.log(payload, '------------ index store')
      return new Promise(function (resolve, reject) {
        axios({
          method: 'POST',
          url: `/products/`,
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data"
          },
          data: payload
        })
          .then(({ data }) => {
            console.log('asas', data);
            resolve()
          })
          .catch(err => {
            console.log(`err`, err.response);
            reject(err)
          })
      })
    },
  },
  deleteProduct(context, payload) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'DELETE',
        url: `/products/${payload}/`,
        headers: {
          token: localStorage.getItem("token")
        }
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(data)
          })
      })
    })
  },
  setUpdateData({ commit }, payload) {
    commit('setDataGonnaBeUpdated', payload)
  },
  updateProduct({ commit }, payload) {
    console.log(payload, '------------ index store')
    return new Promise(function (resolve, reject) {
      axios({
        method: 'PATCH',
        url: `/products/${payload.id}`,
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data"
        },
        data: payload
      })
        .then(({ data }) => {
          resolve()
          Swal.fire({
            icon: 'success',
            title: 'Product Updated',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push('/admin')
        })
        .catch(err => {
          reject(err)
          console.log(err)
          Swal.fire('Errors', `Something went wrong`, `error`)
        })
    })
  },
  modules: {
  }
})
