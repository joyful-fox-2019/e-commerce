import Vue from 'vue'
import Vuex from 'vuex'

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
      email: ''
    }
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
    CHANGEFORM (state, payload) {
      state.formLogin = payload
    },
    SETNEWUSER (state, payload) {
      state.newUser.name = payload.name
      state.newUser.email = payload.email
      state.newUser.password = payload.password
    },
    CLEARNEWUSER (state, payload) {
      state.newUser.name = ''
      state.newUser.email = ''
      state.newUser.password = ''
    },
    SETUSERLOGIN (state, payload) {
      state.localStorage.name = payload.name
      state.localStorage.email = payload.email
    },
    CLEARUSERLOGIN (state, payload) {
      state.localStorage.name = ''
      state.localStorage.email = ''
    }
  },
  actions: {
    changeFormAsync ({ commit }, payload) { // change form
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('CHANGEFORM', payload)
          resolve(payload)
        }, 300)
      })
    },
    setNewUserAsync ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('SETNEWUSER', payload)
          resolve(payload)
        }, 300)
      })
    },
    clearNewUser (context) {
      context.commit('CLEARNEWUSER')
    },
    setUserLoginAsync ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('SETUSERLOGIN', payload)
          resolve()
        }, 300)
      })
    },
    clearUserLogin (context) {
      context.commit('CLEARUSERLOGIN')
    }
  },
  modules: {
  }
})
