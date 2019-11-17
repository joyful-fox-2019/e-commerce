import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import { config } from '../config'
import router from "../router";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: null,
    detailsProduct: null,
    editedProduct: null,
    cardInfo: null
  }, 
  mutations: {
    CHANGEISLOGIN (state, payload) {
      state.isLogin = payload;
    },
    SETPRODUCTS (state, payload) {
      state.products = payload
    },
    SETEDITEDPRODUCT (state, payload) {
      state.editedProduct = payload
    },
    SETDETAILSPRODUCT (state, payload) {
      state.detailsProduct = payload
    },
    CHANGECARDINFO (state, payload) {
      state.cardInfo = payload
    }
  },
  actions: {
    checkToken (context, payload) {
      const token = localStorage.getItem('token')
      const power = localStorage.getItem('power')

      if(token) {
        context.commit('CHANGEISLOGIN', true)
      } else if (!power || !token){
        if (router.history.current.name === 'adminhome' || router.history.current.name === 'addproduct' || router.history.current.name === 'editproduct' || router.history.current.name === 'adminTransactions') {
          context.commit('CHANGEISLOGIN', false)
          
        }
      }
    },
    getProducts ({commit}, payload) {
      axios({
        method: 'get',
        url: `${config.host}/products`
      })
        .then(({data}) => {
          commit('SETPRODUCTS', data.reverse())
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})

