import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../apis/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    user: {},
    products: [],
    snackbarHome: false,
    snackbarHomeMessage: '',
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_USER_BALANCE(state, balance) {
      state.user.balance = Number(state.user.balance) + Number(balance)
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_SNACKBAR_HOME(state, flag) {
      state.snackbarHome = flag
    },
    SET_SNACKBAR_HOME_MESSAGE(state, message) {
      state.snackbarHomeMessage = message
    },
  },
  actions: {
  },
  modules: {
  },
});
