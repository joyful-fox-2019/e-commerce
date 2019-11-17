import axios from '../../../config/axios'
import { Promise } from 'q'

export const User = {
  namespaced: true,
  state: {
    user: {},
    wishlist: []
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
    },
    EMPTY_USER (state, payload) {
      console.log('masuk empty user')
      state.user = {}
    },
    SET_WISHLIST (state, payload) {
      this.wishlist = payload
    }
  },
  actions: {
    getProfile (context, payload) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios({
          url: '/users/my-detail',
          headers: {
            token
          }
        })
          .then(({ data }) => {
            console.log(data.user, 'ini data hasil axios user')
            context.commit('SET_USER', data.user)
            context.commit('SET_WISHLIST', data.user.wishlist)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    addToCart (context, payload) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios({
          url: '/users/add-cart',
          method: 'post',
          headers: {
            token
          },
          data: {
            product: payload.productId,
            qty: payload.qty
          }
        })
          .then(({ data }) => {
            console.log(data)
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    topup (context, payload) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios({
          url: '/users/topup',
          method: 'patch',
          headers: {
            token
          },
          data: {
            topup: payload
          }
        })
          .then(({ data }) => {
            console.log(data)
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    removeCart (context, productName) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios({
          url: '/users/remove-item',
          method: 'patch',
          headers: {
            token
          },
          data: {
            productName
          }
        })
          .then(({ data }) => {
            console.log(data)
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    addToWishlist (context, payload) {
      // let token = localStorage.getItem('token')
      // return new Promise((resolve, reject) => {
      //   axios({
      //     url: `/products/addwishlist/${payload}`,
      //     method: 'patch',
      //     headers: {
      //       token
      //     }
      //   })
      //     .then(({ data }) => {
      //       console.log(data)
      //       resolve()
      //     })
      //     .catch((err) => {
      //       console.log(err)
      //       reject(err)
      //     })
      // })
    }
  }
}
