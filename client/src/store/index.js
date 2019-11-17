import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allProduct: [],
    myCart: [],
    isLogin: false,
    name : '',
    back : false
  },
  mutations: {
    // UBAH KE STATE KESINI DULU
    SETTER_PRODUCTS(state,payload){
      state.allProduct = payload
    },
    SET_LOGIN(state){
      if(localStorage.getItem('token')){
        state.isLogin = true
        state.name = localStorage.getItem('name')
      } else {
        state.isLogin = false
        state.name = ''
        state.myCart = []
      }
    },
    SET_CART(state,payload){
      state.myCart = payload
    },
    SET_BACK(state){
      if (state.back === true) {
        state.back = false
      } else {
        state.back = true
      }
    }
  },
  actions: {
    // AXIOS DISINI
    // DARI SINI LANGSUNG JUGA BISA
    getProducts({ commit }){
      axios({
        method: 'GET',
        url: 'http://localhost:3000/product',
      })
      .then(({ data }) => {
        commit('SETTER_PRODUCTS', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    createUser(context,payload){
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/user/signup',
        data : payload
      })
    },
    loginUser(context,payload){
      return axios({
        method: 'POST',
        url:'http://localhost:3000/user/signin',
        data: payload
      })
    },
    getMyCart(context){
      axios({
        method: 'GET',
        url:'http://localhost:3000/cart/mycarts',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        context.commit('SET_CART',data)
      })
      .catch(err=>{
        console.log(err);
      })
    },
    AddCart(context, payload){
      return axios({
        method: 'POST',
        url:'http://localhost:3000/cart',
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    updateCart(context, payload){
      return axios({
        method: 'PATCH',
        url:'http://localhost:3000/product',
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteCart(context, payload){
      return axios({
        method: 'DELETE',
        url:'http://localhost:3000/cart',
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    createProduct(context, payload){
      return axios({
        method: 'POST',
        url:'http://localhost:3000/product',
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  modules: {
  }
})
