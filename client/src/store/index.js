import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import axiosConnect from '../configs/axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defaultAmount: 1,
    products: [],
    product: '',
    loggedUser: '',
    isLogin : false,
    login: {
      email: '',
      password: ''
    },
    register: {
      email: '',
      password: '',
      username: ''
    }
  },
  mutations: {
    CHANGE_LOGIN_EMAIL(state, payload){
      state.login.email = payload
    },
    CHANGE_LOGIN_PASSWORD(state, payload){
      state.login.password = payload
    },
    LOGIN_CHECKER(state, payload){
      state.isLogin = payload
    },
    CHANGE_AMOUNT(state, payload){
      state.defaultAmount = payload
    },
    CHANGE_PRODUCTS(state, payload){
      state.products = payload
    },
    CHANGE_PRODUCT(state, payload){
      state.product = payload
    },
    CHANGE_LOGGED_USER(state, payload){
      state.loggedUser = payload
    }
  },
  actions: {
    login(state){
      axiosConnect({
        method: 'post',
        url: '/users/login',
        data: {
          email: state.login.email,
          password: state.login.password,
        }
      })
        .then(({ data })=>{
          console.log(data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    fetchProducts({commit}){
      axiosConnect({
        method: 'get',
        url: '/products'
      })
        .then(({ data })=>{
          commit('CHANGE_PRODUCTS', data)
        })
        .catch(err=>{
          console.log(err, '----------')
          Swal.fire({
            title: 'Something Happend',
            icon: 'error'
          })
        })
    },
    fetchProduct({commit}, payload){
      axiosConnect({
        method: 'get',
        url: `/products/${payload}`
      })
        .then(({ data })=>{
          commit('CHANGE_PRODUCT', data)
        })
        .catch(err=>{
          console.log(err)
          Swal.fire({
            title: 'something happend',
            icon: 'error'
          })
        })
    },
    fetchLoggedUser({commit}){
      axiosConnect({
        method: 'get',
        url: '/users'
      })
        .then(({ data })=>{
          commit('CHANGE_LOGGED_USER', data)
        })
        .catch(err=>{
          console.log(err)
          Swal.fire({
            title: 'something happend',
            icon: 'error'
          })
        })
    },
    addToCart({dispatch, state}, payload){
      if(localStorage.getItem('token')){
        const amount = payload.amount || state.defaultAmount
        axiosConnect({
          method: 'patch',
          url: 'users/cart',
          data: {
            product_id: payload.product_id,
            amount
          }
        })
          .then(({ data })=>{
            dispatch('fetchLoggedUser')
            console.log(data)
          })
          .catch(err=>{
            console.log(err)
          })
      }
      else{
        Swal.fire({
          title: 'Please login first',
          icon: 'error'
        })
      }
    },
    subtractCart({dispatch}, payload){
      axiosConnect({
        method: 'patch',
        url: 'users/cart/subtract',
        data: {
          product_id: payload,
        }
      })
        .then(({ data })=>{
          dispatch('fetchLoggedUser')
          console.log(data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    checkout(){
      axiosConnect({
        method: 'post',
        url: '/transactions'
      })
        .then(({ data })=>{
          console.log(data)
        })
    }
  },
  modules: {
  }
})
