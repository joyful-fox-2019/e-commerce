import Swal from 'sweetalert2'
import store from '@/store'
function axiosErrorHandler (error) {
  // console.log(error)
  if (error.response) {
    let errorData = error.response.data
    let statusCode = error.response.status
    console.log(errorData)
    if (statusCode === 403) {
      localStorage.removeItem('token')
      // jangan lupa disini atur isLogin dari storeState
      store.commit('setLogin', false)
    }
    Swal.fire({
      type: 'error',
      title: 'Oops',
      text: `${statusCode}: ${errorData.message}`
    })
    // handle error base on status code
  } else if (error.request) {
    // request aman tapi tidak ada respon dari server seharusnya tidak di perlihatkan ke pengguna
    console.log('No response from server')
    console.log(error.request)
    Swal.fire({
      type: 'error',
      title: 'Oops',
      text: `Request time out`
    })
  } else {
    // something error with request
    console.log('Error', error.message)
  }
}

export default axiosErrorHandler
