import store from '../src/store'

export default (message) => {
  let alert = {
    status: true,
    color: '#0282F9',
    message
  }
  store.commit('SET_ALERT', alert)
}
