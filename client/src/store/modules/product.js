import axios from '../../../config/axios'

export const Product = {
  namespaced: true,
  state: {
    products: [],
    thisProduct: {}
  },
  mutations: {
    SET_PRODUCT (state, payload) {
      state.products = payload
    },
    SET_THIS_PRODUCT (state, payload) {
      console.log(payload, 'ini payload set this product')
      state.thisProduct = payload
    }
  },
  actions: {
    getProduct (context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/products',
          methods: 'get'
        })
          .then(({ data }) => {
            console.log(data.products, 'ini data di product')
            context.commit('SET_PRODUCT', data.products)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    addProduct (context, payload) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios({
          url: '/products/add',
          method: 'post',
          headers: {
            token,
            'Content-Type': 'multipart/form-data'
          },
          data: payload
        })
          .then(({ data }) => {
            resolve()
          })
          .catch((err) => {
            reject(err.response.data.arr)
          })
      })
    },
    updateProduct (context, payload) {
      let token = localStorage.getItem('token')
      let productId = payload._id
      return new Promise((resolve, reject) => {
        axios({
          url: `/products/${productId}`,
          method: 'patch',
          headers: {
            token,
            'Content-Type': 'multipart/form-data'
          },
          data: payload.formData
        })
          .then(({ data }) => {
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    removeProduct (context, payload) {
      let token = localStorage.getItem('token')
      let productId = payload._id
      return new Promise((resolve, reject) => {
        axios({
          url: `/products/${productId}`,
          method: 'delete',
          headers: {
            token
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
    findProduct (context, payload) {
      let productId = payload
      return new Promise((resolve, reject) => {
        axios({
          url: `/products/${productId}`,
          method: 'get'
        })
          .then(({ data }) => {
            console.log('masuk ke findProduct')
            context.commit('SET_THIS_PRODUCT', data.product)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}
