import axios from '../../../config/axios'

export const Transaction = {
  namespaced: true,
  state: {
    userTransactions: [],
    userPending: 0,
    userDone: 0,
    allTransactions: [],
    allPending: 0,
    allDone: 0
  },
  mutations: {
    SET_USER_TRANSACTIONS (state, payload) {
      state.userTransactions = payload
      state.userPending = 0
      state.userDone = 0
      payload.forEach(element => {
        if (element.status === 'Done') {
          state.userDone += 1
        } else {
          state.userPending += 1
        }
      })
    },
    SET_ALL_TRANSACTIONS (state, payload) {
      state.allTransactions = payload
      state.allPending = 0
      state.allDone = 0
      payload.forEach(element => {
        if (element.status === 'Done') {
          state.allDone += 1
        } else {
          state.allPending += 1
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
    },
    allTransactions (context, payload) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios({
          url: '/transactions/all',
          method: 'get',
          headers: {
            token
          }
        })
          .then(({ data }) => {
            console.log(data)
            context.commit('SET_ALL_TRANSACTIONS', data.transactions)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updateTransactions (context, payload) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios({
          url: `/transactions/${payload.transactionId}`,
          method: 'patch',
          headers: {
            token
          },
          data: {
            status: payload.status
          }
        })
          .then(({ data }) => {
            console.log(data)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    deleteTransactions (context, payload) {
      let token = localStorage.getItem('token')
      return new Promise((resolve, reject) => {
        axios({
          url: `/transactions/${payload}`,
          method: 'delete',
          headers: {
            token
          }
        })
          .then(({ data }) => {
            console.log(data)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
