import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/apis/server.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userSignin: {},
    userStore: {},
    userCart: {},
    isSignin: false,
    allProduct: [],
    allCategory: []
  },
  mutations: {
    CHECK_SIGNIN (state, payload) {
      if(!payload) {
        state.userSignin = '';
        state.userStore = '';
        state.isSignin = false
      } else {
        state.userSignin = payload
        state.userStore = payload.StoreId
        state.isSignin = true
      }
    },
    CREATE_STORE (state, payload) {
      state.userStore = payload
    },
    GETTING_CART (state, payload) {
      state.userCart = payload
    },
    CHANGE_IMAGE (state, payload) {
      state.userSignin.profile_image = payload;
    },
    SIGN_OUT (state, payload) {
      state.userSignin = '';
      state.userCart = '';
      state.userStore = '';
      state.isSignin = false;
    },
    COMMIT_PRODUCT (state, payload) {
      state.allProduct = payload
    },
    COMMIT_CATEGORY (state, payload) {
      state.allCategory = payload
    },
    CREATE_PRODUCT (state, payload) {
      state.userStore = payload.store
      state.allProduct.unshift(payload.product);
    },
    REMOVE_CART (state, cart) {
      state.userCart = cart
    },
    CREATE_TRANSACTION (state, data) {
      state.userSignin = data.user;
      state.cart = data.cart
    }
  },
  actions: {
    fetchAllProduct (context, payload) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'get',
          url: '/products'
        })
          .then(({data}) => {
            context.commit('COMMIT_PRODUCT', data.products)
            resolve()
          })
          .catch(err => {
            reject(err.response.data.msg)
          })
      })
    },
    fetchCategory (context, payload) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'get',
          url: '/products/category'
        })
          .then(({data}) => {
            context.commit('COMMIT_CATEGORY', data.categories)
            resolve()
          })
          .catch(err => {
            reject(err.response.data.msg)
          })
      })
    },
    checkSignIn ( context, payload ) {
      let tempMsg
      return new Promise ((resolve, reject) => {
        axios({
          method: 'get',
          url: '/users',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            context.commit('CHECK_SIGNIN', data.user)
            tempMsg = data.msg
            return this.dispatch('getUserCart')
          })
          .then(() => {
            resolve({msg: tempMsg})
          })
          .catch(err => {
            context.commit('CHECK_SIGNIN', '')
            reject(err.response.data.msg)
          })
      })
    },
    createStoreAction (context, payload) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'post',
          url: '/stores',
          data: {
            name: payload.name,
            location: payload.city,
            link: payload.link
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            context.commit('CREATE_STORE', data.store)
            resolve(data.msg)
          })
          .catch(err => {
            reject(err.response.data.msg)
          })
      })
    },
    getUserCart (context, payload) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'get',
          url: '/carts',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            context.commit('GETTING_CART', data.cart)
            resolve()
          })
          .catch(err => {
            reject(err.response.dta.msg)
          })
      })
    },
    createProduct (context, payload) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'post',
          url: '/products',
          data: payload,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            context.commit('CREATE_PRODUCT', data)
            resolve(data.msg)
          })
          .catch(err => {
            reject(err.response.data.msg)
          })
      })
    },
    removeCart (context, name) {
      axios({
        method: 'put',
        url: `/carts/${name}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          context.commit('REMOVE_CART', data.cart)
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    createTransaction (context, paylaod) {
      return new Promise ((resolve, reject) => {
        axios({
          method: 'post',
          url: '/transactions',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            context.commit('CREATE_TRANSACTION', data)
            resolve(data.transaction)
            return this.dispatch('fetchAllProduct')
          })
          .catch(err => {
            reject(err.response.data.msg)
          })
      })
    }
  },
  modules: {
  }
})
