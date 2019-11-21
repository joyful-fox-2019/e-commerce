import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const baseUrl = "http://localhost:3000"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formLogin: true, // form
    newUser: { // data user
      name: '',
      email: '',
      password: ''
    },
    userLogin: {
      name: '',
      password: ''
    },
    localStorage: {
      name: '',
      email: '',
      statusLogin: false
    },
    page: 'news',
    title: 'Announcements & News',
    bestItem: [],
    newItem: [],
    rpsNow: 0,
    detailItem: null,
    cartNow: null,
    totalRpsNow: 0,
    detailCart: []
  },
  getters: {
    formNowIn: (state) => {
      return state.formLogin
    },
    infoUserLogin: (state) => {
      return state.localStorage
    }
  },
  mutations: {
    CHANGEFORM(state, payload) {
      state.formLogin = payload
    },
    SETNEWUSER(state, payload) {
      state.newUser.name = payload.name
      state.newUser.email = payload.email
      state.newUser.password = payload.password
    },
    CLEARNEWUSER(state, payload) {
      state.newUser.name = ''
      state.newUser.email = ''
      state.newUser.password = ''
    },
    SETUSERLOGIN(state, payload) {
      state.localStorage.name = payload.name
      state.localStorage.email = payload.email
      state.localStorage.statusLogin = payload.statusLogin
    },
    CLEARUSERLOGIN(state, payload) {
      state.localStorage.name = ''
      state.localStorage.email = ''
      state.localStorage.statusLogin = false
    },
    FETCHBESTITEM(state, payload) {
      state.bestItem = payload
    },
    FETCHNEWITEM(state, payload) {
      state.newItem = payload
    },
    ADDRPSNOW(state, payload) {
      state.rpsNow = payload
    },
    GETDETAILITEM(state, payload) {
      state.detailItem = payload
    },
    ADDITEMTOCART(state, payload) {
      state.cartNow = payload
    },
    GETDETAILCART(state, payload) {
      state.detailCart = payload
    }
  },
  actions: {
    checkOut({
      commit,
      dispatch
    }) {
      return new Promise((resolve, reject) => {
        dispatch('addRps')
        // dispatch('clearCart')
        resolve()
      })
    },
    clearCart({
      commit
    }) {
      console.log('masuk clear caart')
      axios({
          url: baseUrl + `/carts/delete/cart`,
          method: "DELETE",
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteItemInCart({
      commit,
      dispatch
    }, payload) {
      axios({
          url: baseUrl + `/carts/${payload}`,
          method: "DELETE",
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          console.log(data)
          dispatch('getDetailCart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDetailCart({
      commit
    }) {
      axios({
          url: baseUrl + `/carts/`,
          method: "GET",
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          console.log(data)
          commit('GETDETAILCART', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart({
      commit
    }, payload) {
      axios({
          url: baseUrl + `/carts`,
          method: "POST",
          data: payload,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          console.log(data)
          commit('ADDITEMTOCART', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDetailItem({
      commit
    }, id) {
      axios({
          url: baseUrl + `/items/detail/${id}`,
          method: "GET",
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          commit('GETDETAILITEM', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addRps({
      commit
    }) {
      axios({
          url: baseUrl + `/users/getrps/${localStorage.getItem("email")}`,
          method: "GET"
        })
        .then(({
          data
        }) => {
          // console.log(data)
          commit('ADDRPSNOW', data.rps)
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchBestItem({
      commit
    }) {
      axios({
          url: baseUrl + '/items/bestitem',
          method: "GET",
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          commit('FETCHBESTITEM', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchNewItem({
      commit
    }) {
      axios({
          url: baseUrl + '/items/newitem',
          method: "GET",
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({
          data
        }) => {
          commit('FETCHNEWITEM', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    changeFormAsync({
      commit
    }, payload) { // change form
      return new Promise((resolve, reject) => {
        commit('CHANGEFORM', payload)
        resolve(payload)
      })
    },
    setNewUserAsync({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        commit('SETNEWUSER', payload)
        resolve(payload)
      })
    },
    clearNewUser(context) {
      context.commit('CLEARNEWUSER')
    },
    setUserLoginAsync({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        commit('SETUSERLOGIN', payload)
        resolve()
      })
    },
    clearUserLogin(context) {
      context.commit('CLEARUSERLOGIN')
    }
  },
  modules: {}
})
