import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import axios from '../../apis/server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allProduct: [],
    allMyProduct: [],
    myCart: [],
    dataUpdate : {},
    isLogin: false,
    name : '',
    back : false,
    lagiRegister : false
  },
  mutations: {
    // UBAH KE STATE KESINI DULU
    SETTER_LOGINREGIST(state){
      if (state.lagiRegister === false) {
        state.lagiRegister = true
      } else {
        state.lagiRegister = false
      }
    },
    SETTER_PRODUCTS(state,payload){
      state.allProduct = payload
    },
    SETTER_MY_PRODUCTS(state,payload){
      state.allMyProduct = payload
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
    SET_UPDATE_DATA(state, payload){
      state.dataUpdate = payload
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
    getMyProduct({ commit }){
      axios({
        method: 'GET',
        url: '/product/myproducts',
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        console.log(data);
        commit('SETTER_MY_PRODUCTS', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getProducts({ commit }){
      axios({
        method: 'GET',
        url: '/product',
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
        url: '/user/signup',
        data : payload
      })
    },
    loginUser(context,payload){
      return axios({
        method: 'POST',
        url:'/user/signin',
        data: payload
      })
    },
    getMyCart(context){
      axios({
        method: 'GET',
        url:'/cart/mycarts',
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
        url:'/cart',
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    updateCart(context, payload){      
      return axios({
        method: 'PATCH',
        url:'/product/'+payload.id,
        data: {
          quantities : payload.quantities ,
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    updateProduct(context, payload){
      return axios({
        method: 'PATCH',
        url:'/cart/'+payload.id+'/status',
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    updateMyProduct(context, payload){
      console.log(payload.formData);
      return axios({
        method: 'PUT',
        url:'/product/'+payload.id,
        data : payload.formData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteCart(context, payload){
      return axios({
        method: 'DELETE',
        url:'/cart/'+payload.id,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    createProduct(context, payload){
      return axios({
        method: 'POST',
        url:'/product',
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteProduct(context, payload){
      return axios({
        method: 'DELETE',
        url:'/product/'+payload.id,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
  },
  modules: {
  }
})
