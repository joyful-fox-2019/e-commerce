import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';

Vue.use(VueSweetalert2);

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: localStorage.getItem('token') ? true : false,
    admin: localStorage.getItem('role') ? true : false,
    showDesc: false,
    descData: null,
    showCart: false,
    myCart: [],
    allProduct: []
  },
  mutations: {
    USER_LOGIN(state, payload) {
      state.login = payload
    },
    CHECK_ADMIN(state, payload) {
      state.admin = payload
    },
    SHOW_DESC(state, payload) {
      state.showDesc = true
      state.descData = payload
    },
    BACK_HOME(state) {
      state.showDesc = false
    },
    TO_CART(state) {
      state.showCart = true
    },
    SHOW_PRODUCT(state, payload) {
      state.allProduct = payload
    },
    SHOW_CART(state, payload) {
      state.myCart = payload
    }
  },
  actions: {
    ADD_CART(context, payload) {
      axios({
          url: 'http://localhost:3000/transactions',
          method: 'POST',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            productId: payload.id,
            quantity: payload.qty
          }
        })
        .then(({
          data
        }) => {
          console.log('successfull transaction')
        })
        .catch(err => {
          console.log(err)
        })
    },
    GET_PRODUCT(context) {
      axios({
          url: "http://localhost:3000/products",
          method: "GET",
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({
          data
        }) => {
          context.commit('SHOW_PRODUCT', data)
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        });
    },
    GET_CART(context) {
      axios({
          url: "http://localhost:3000/transactions",
          method: "GET",
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({
          data
        }) => {
          context.commit('SHOW_CART', data)
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        });
    }
  },
  modules: {}
})
