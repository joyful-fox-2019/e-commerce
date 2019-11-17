import axios from '../../../config/axios'

export const Transaction = {
  namespaced: true,
  state: {
    userTransactions: [],
    userPending: 0,
    userDone: 0
  },
  mutations: {
    SET_USER_TRANSACTIONS (state, payload) {
      state.userTransactions = payload
      state.userPending = 0
      state.userDone = 0
      payload.forEach(element => {
        if (element.status === 'done') {
          state.userDone += 1
        } else {
          state.userPending += 1
        }
      })
    }
  },
  actions: {
    checkout (context, payload) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios({
          url: '/transactions/new',
          method: 'post',
          headers: {
            token
          },
          data: {
            cartPrice: payload
          }
        })
          .then(({ data }) => {
            console.log(data)
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    userTransactions (context, payload) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios({
          url: '/transactions/user',
          method: 'get',
          headers: {
            token
          }
        })
          .then(({ data }) => {
            context.commit('SET_USER_TRANSACTIONS', data)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
