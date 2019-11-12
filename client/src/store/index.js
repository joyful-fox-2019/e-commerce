import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/apis/server.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userSignin: {},
    userStore: {},
    userCart: {},
    isSignin: false
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
      state.userSignin.profile_image = payload
    }
  },
  actions: {
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
            resolve({msg: data.msg})
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
      console.log('kepanggil')
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
    }
  },
  modules: {
  }
})
