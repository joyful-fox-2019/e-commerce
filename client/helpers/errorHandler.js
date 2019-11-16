import store from '../src/store/index'

export default err => {
  store.commit('SET_LOADING', false)
  console.log(err.response)
  let strMessages = ''
  if (err.response) {
    err.response.data.messages.forEach(message => {
      strMessages += message + ' '
    })
  } else {
    strMessages = 'Something went wrong with the server'
  }
  let alert = {
    status: true,
    color: '#E6252A',
    message: strMessages
  }
  store.commit('SET_ALERT', alert)
}
