import Vue from 'vue'
import Vuex from 'vuex'
import myAxios from './configs/myAxios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: {},
    isAdmin: false,
    status: '',
    items: []
  },
  mutations: {
    auth_succes (state, payload) {
      state.token = payload.token
      state.user = payload.user
      console.log(state.user, '**********')
      if (payload.user.role === 'admin') state.isAdmin = true
    },
    logout (state) {
      state.token = ''
      state.isAdmin = false
    },
    addToItemsState (state, payload) {
      console.log(payload)
      state.items = payload
    }
  },
  actions: {
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        myAxios
          .post('/click/users/signup', user)
          .then(({ data }) => {
            console.log(data)
            resolve(data)
          })
          .catch(err => {
            reject(err.response.data.error)
          })
      })
    },
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        myAxios
          .post('/click/users/signin', user)
          .then(({ data }) => {
            const token = data.token
            const user = data.user.role
            localStorage.setItem('token', token)
            localStorage.setItem('user', user)
            myAxios.defaults.headers.token = token
            commit('auth_succes', { token, user })
            resolve(data)
          })
          .catch(err => {
            console.group('tag2')
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err.response.data.error)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete myAxios.defaults.headers.token
        resolve()
      })
    },
    fetchItems ({ commit }) {
      console.log('masuk fetch')
      myAxios({
        method: 'get',
        url: '/click/items',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('ini data', data.items)
          commit('addToItemsState', data.items)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
