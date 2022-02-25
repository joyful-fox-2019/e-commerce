import Swal from 'sweetalert2'

function next (err) {
  console.log('masuk dari notif')
  if (typeof err === 'string') {
    return Swal.fire({
      title: 'Error!',
      text: err,
      icon: 'error'
    })
  } else {
    console.log(JSON.stringify(err, null, 2))
    if (Array.isArray(err)) {
      err.message = err.join('<br/>')
      console.log(err, 'array errot type')
    }
    return Swal.fire({
      title: 'Error!',
      text: err.message,
      icon: 'error'
    })
  }
}

function successToast (message) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    icon: 'success',
    title: message
  })
}

function showLoading () {
  return Swal.showLoading()
}

function closeLoading () {
  return Swal.close()
}

export { next, successToast, showLoading, closeLoading }
