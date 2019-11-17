import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{

  },
  state: {
    isLogin: false,
    isAdmin: false,
    products: [],
    dataCart: [],
    dataTransactions: [],
    dataPending: [],
    dataApproved: []
  },
  mutations: {
    SET_LOGIN(state, payload){
      state.isLogin = payload
    },
    SET_ADMIN(state, payload){
      state.isAdmin = payload
    },
    FETCH_PRODUCTS(state, payload){
      state.products = payload
    },
    FETCH_CART(state, payload){
      state.dataCart = payload
    },
    FETCH_TRANSACTIONS(state, payload){
      state.dataTransactions = payload
    },
    FETCH_PENDING(state, payload){
      state.dataPending = payload
    },
    FETCH_APPROVED(state, payload){
      state.dataApproved = payload
    }
  },
  actions: {
    auth(context, payload){
      if(localStorage.getItem('token')){
        context.commit('SET_LOGIN', true)
        if(localStorage.getItem('role') == 'admin'){
          context.commit('SET_ADMIN', true)
        } else {
          context.commit('SET_ADMIN', false)
        }
      } else {
        context.commit('SET_LOGIN', false)
      }
    },
    login(context, payload){
      return new Promise((resolve, reject) => {
        axios({
          method:'POST',
          url: '/user/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({data}) =>{
            resolve(data)
            console.log(data, 'bbbbbbbbb')
          })
          .catch(({response}) => {
            // console.log(err, 'aaaaaaaaaaaaaaaaaaaaa')
            reject(response)
        })
      })
    },
    register(context, payload){
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios({
          method:'POST',
          url: '/user/register',
          data: {
            email: payload.email,
            password: payload.password,
            username: payload.username
          }
        })
          .then(({data})=>{
            resolve(data)
          })
          .catch(({response}) => {
            console.log(response)
            reject(response)
          })
      })
    },
    product({commit}){
      axios({
        method: "GET",
        url: "/product",
      })
      .then(({data}) => {
        console.log(data)
        commit('FETCH_PRODUCTS', data)
      })
      .catch(({response}) => {
        this.next(response.data)
      }) 
    },
    addtocart({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url:`/cart/${payload.id}`,
          data: {
            quantity: payload.quantity
          }
        })
        .then(({data}) => {
          resolve()
        })
        .catch(({response} ) => {
          reject(response.data)
        })
      })    
    },
    cart({commit}){
      axios({
        method:'GET',
        url:'/cart'
      })
      .then(({data}) => {
        commit('FETCH_CART', data)
      })
      .catch(({response}) => {
        this.next(response.data)
      })
    },
    deleteCart({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method: 'DELETE',
          url: `/cart/${payload}`
        })
        .then(({data}) => {
          resolve()
        })
        .catch(({response}) => {
          reject(response)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        localStorage.clear('')
        commit('SET_LOGIN', false)
        commit('SET_ADMIN', false)
        resolve()
      })
    },
    addProducts({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method:"POST",
          url: '/product',
          data: payload,
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        .then(data => {
          resolve()
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    },
    deleteProducts({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method:'DELETE',
          url: `/product/${payload}`
        })
        .then(data => {
          resolve()
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    },
    updateProducts({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method: "PUT",
          url: `product/${payload.idProduct}`,
          data: payload.data,
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        .then( data => {
          resolve()
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    },
    registerAdmin({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: `user/register/admin`,
          data: {
            email: payload.email,
            password: payload.password,
            role: payload.role,
            username: payload.username
          }
        })
        .then( data => {
          resolve()
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    },
    checkout({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/transactions'
        })
        .then( data => {
          resolve()
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    },
    transactions({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method: "GET",
          url: '/transactions'
        })
        .then(({data}) => {
          commit('FETCH_TRANSACTIONS', data)
        })
        .catch(({ response }) => {
          this.next(response.data)
        })
      })
    },
    pending({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method:'GET',
          url: '/transactions/pending'
        })
        .then(({data}) => {
          commit('FETCH_PENDING', data)
        })
        .catch(({response}) => {
          this.next(response.data)
        })
      })
    },
    approved({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method: 'GET',
          url: '/transactions/approve'
        })
        .then(({data}) => {
          commit('FETCH_APPROVED', data)
        })
        .catch(({response}) => {
          this.next(response.data)
        })
      })
    },
    approvedTransactions({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method: 'PATCH',
          url:`/transactions/approve/${payload}`
        })
        .then(({data}) => {
          resolve()
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    },
    deliveredTransactions({commit}, payload){
      return new Promise((resolve, reject) => {
        axios({
          method: 'PATCH',
          url: `/transactions/delivered/${payload}`
        })
        .then(({data}) => {
          resolve()
        })
        .catch(({response}) => {
          reject(response.data)
        })
      })
    },
    search({commit}, payload){
      axios({
        method: 'GET',
        url: `/product/search?q=${payload}`,
      })
      .then(({data}) => {
        commit('FETCH_PRODUCTS', data)
      })
      .catch(({response}) => {
        this.next(response.data)
      })
    }
  }
  
})
