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
    loggedUser: {
      cart: []
    },
    transactions: [],
    isLogin : false,
    login: {
      email: '',
      password: ''
    },
    register: {
      email: '',
      password: '',
      username: ''
    },
    adminTransactions: [],
    admin: false,
    addProduct: {
      name: '',
      description: '',
      file: null,
      stock: 0,
      price: 0,
      gender: 'men'
    },
    editProduct: {
      name: '',
      description: '',
      stock: 0,
      price: 0,
      gender: 'men'
    }
  },
  mutations: {
    CHANGE_LOGIN_EMAIL(state, payload){
      state.login.email = payload
    },
    CHANGE_LOGIN_PASSWORD(state, payload){
      state.login.password = payload
    },
    CHANGE_REGISTER_EMAIL(state, payload){
      state.register.email = payload
    },
    CHANGE_REGISTER_PASSWORD(state, payload){
      state.register.password = payload
    },
    CHANGE_REGISTER_USERNAME(state, payload){
      state.register.username = payload
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
    },
    CHANGE_ADMIN_TRANSACTION(state, payload){
      state.adminTransactions = payload
    },
    CHANGE_ADMIN_STATUS(state, payload){
      state.admin = payload
    },
    CHANGE_ADD_NAME(state, payload){
      state.addProduct.name = payload
    },
    CHANGE_ADD_PRICE(state, payload){
      state.addProduct.price = payload
    },
    CHANGE_ADD_STOCK(state, payload){
      state.addProduct.stock = payload
    },
    CHANGE_ADD_DESCRIPTION(state, payload){
      state.addProduct.description = payload
    },
    CHANGE_ADD_FILE(state, payload){
      state.addProduct.file = payload
    },
    CHANGE_ADD_GENDER(state, payload){
      state.addProduct.gender = payload
    },
    CHANGE_EDIT_NAME(state, payload){
      state.editProduct.name = payload
    },
    CHANGE_EDIT_PRICE(state, payload){
      state.editProduct.price = payload
    },
    CHANGE_EDIT_STOCK(state, payload){
      state.editProduct.stock = payload
    },
    CHANGE_EDIT_DESCRIPTION(state, payload){
      state.editProduct.description = payload
    },
    CHANGE_EDIT_FILE(state, payload){
      state.editProduct.file = payload
    },
    CHANGE_EDIT_GENDER(state, payload){
      state.editProduct.gender = payload
    },
    CHANGE_TRANSACTIONS(state, payload){
      state.transactions = payload
    }
  },
  actions: {
    login({state, commit}){
      console.log(state.login.email)
      axiosConnect({
        method: 'post',
        url: '/users/login',
        data: {
          email: state.login.email,
          password: state.login.password,
        }
      })
        .then(({ data })=>{
          localStorage.setItem('token', data.token)
          commit('LOGIN_CHECKER', true)
          if(data.admin){
            commit('CHANGE_ADMIN_STATUS', true)
          }
          Swal.fire({
            icon: 'success',
            title: 'Login Success'
          })
          router.push('/')
        })
        .catch(err=>{
          console.log(err)
        })
    },
    logout({state, commit}){
      router.push('/login')
      localStorage.removeItem('token')
      commit('LOGIN_CHECKER', false)
      Swal.fire({
        icon: 'success',
        title: 'Logout Success'
      })
    },
    register({state, commit, dispatch}){
      const email = state.register.email
      const password = state.register.password
      const username = state.register.username

      if(!email || !password || !username){
        Swal.fire({
          icon: 'error',
          title: 'Empty input detected',
          text: 'Please insert needed input'
        })
      }
      else{
        axiosConnect({
          url: '/users/register',
          method: 'post',
          data: {
            email,
            password,
            username
          }
        })
          .then(({ data })=>{
            console.log(data)
            commit('CHANGE_LOGIN_EMAIL', email)
            commit('CHANGE_LOGIN_PASSWORD', password)
            dispatch('login')
          })
          .catch(err=>{
            console.log(err)
          })
      }
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
          commit('LOGIN_CHECKER', true)
          if(data.admin){
            commit('CHANGE_ADMIN_STATUS', true)
          }
        })
        .catch(err=>{
          console.log(err)
          Swal.fire({
            title: 'something happend',
            icon: 'error'
          })
        })
    },
    fetchTransactions({commit}){
      axiosConnect({
        url: '/transactions',
        method: 'get'
      })
        .then(({ data })=>{
          console.log(data)
          commit('CHANGE_TRANSACTIONS', data)
        })
        .catch(err=>{
          console.log(err)
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
          router.push('/')
          Swal.fire({
            title: 'Checkout Success',
            text:'Please confirm the transaction when item delivered',
            icon: 'success'
          })
        })
    },
    fetchAdminTransaction({commit}){
      axiosConnect({
        method: 'get',
        url: '/transactions/admin'
      })
        .then(({ data })=>{
          console.log(data)
          commit('CHANGE_ADMIN_TRANSACTION', data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    addProduct({state}){
      if(!state.addProduct.file || !state.addProduct.name || !state.addProduct.description || !state.addProduct.price || !state.addProduct.stock){
        Swal.fire({
          icon: 'error',
          title: 'Error input detected',
          text: 'Please inser empty input'
        })
      }
      else{
        const bodyFormData = new FormData()
        bodyFormData.append('file', state.addProduct.file)
        bodyFormData.append('name', state.addProduct.name)
        bodyFormData.append('description', state.addProduct.description)
        bodyFormData.append('price', state.addProduct.price)
        bodyFormData.append('stock', state.addProduct.stock)
        bodyFormData.append('gender', state.addProduct.gender)

        axiosConnect({
          url: '/products',
          data: bodyFormData,
          method: 'post'
        })
          .then(({ data })=>{
            console.log(data)
            router.push('/')
            Swal.fire({
              icon: 'success',
              title: 'Success add product'
            })
          })
          .catch(err=>{
            console.log(err.response.data)
          })
      }
    },
    transactionDone({commit, dispatch}, payload){
      axiosConnect({
        url: `/transactions/${payload}`,
        method: 'patch'
      })
        .then(({ data })=>{
          console.log(data)
          dispatch('fetchTransactions')
        })
          .catch(err=>{
            console.log(err)
          })
    }
  },
  modules: {
  }
})
