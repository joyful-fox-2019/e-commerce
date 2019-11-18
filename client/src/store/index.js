import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import router from '../router/index'


Vue.use(Toast);

Vue.use(Vuex)

export default new Vuex.Store({
  ///////////---------------
  state: {
    baseUrl: 'http://localhost:3000',
    username: '',
    email: '',
    password: '',
    productList: [],
    userProductList: [],
    cartList: []
  },
  ///////////---------------
  mutations: {
    LoginState (state, payload) {
      state.username = payload.username
      state.password = payload.password
    },
    RegisterState (state, payload) {
      state.username = payload.username
      state.email = payload.email
      state.password = payload.password
    },

    LogoutState (state) {
      state.user = null
      localStorage.clear('token')
    },

    changeData(state, payload) {
      state.data = payload
    },

    cartChange(state, payload) {
      state.cartList = payload
    },

    userChange(state, payload) {
      state.username = payload
    }

  },
  ///////////---------------
  actions: {
    Login({commit, state}) {
      let {username,password} = state
      let url = state.baseUrl
      axios({
        url: `${url}/users/login`,
        method: 'POST',
        data: {
          username, password
        }
      })
      .then(({data}) => {
        Swal.close()
        localStorage.setItem('token', data.token)
        router.push({ path: "/mainpage" });
      })
      .catch((err) => {
        Swal.close()
      })
    },
    Register ({commit, state}) {
      let { username, password, email } = state
      let url = state.baseUrl
      Swal.showLoading
      axios({
        url: `${url}/users/`,
        method: 'POST',
        data: {
          username, password, email
        }
      })
      .then(({data}) => {
        alert(data.message)
        router.push({ path: '/login' })
      })
      .catch(err => {
        
      })

    },
    getProduct ({commit, state}) {
      let url = state.baseUrl
      axios({
        url: `${url}/products`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        commit('cartChange', data)
      })
      .catch((err) => {
        
      })  
    },

    CreateProduct({state}, payload) {
      let { name, description, stocks, price, image } = payload
      let url = state.baseUrl

      let fd = new FormData();
      fd.append('productName',name)
      fd.append('description',description)
      fd.append('amounts',stocks)
      fd.append('price',price)
      fd.append('file',image)

      axios({
        url: `${url}/products`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem('token')
        },
        data: fd
      })
      .then(({data}) => {
        console.log(data.message)
      })
      .catch((err) => {
        console.log(err.response)
      })
    }

  },

  ///////////---------------
  modules: {
  }
  ///////////---------------

})
