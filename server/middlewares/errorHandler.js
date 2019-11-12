module.exports = (err, req, res, next) => {
  // console.log(err)

  let message = err.message || 'Internal Server Error'
  let status = err.status || 500

  if(err.name === 'ValidationError'){
    let errors = []
    for(let key in err.errors){
      errors.push(err.errors[key].message)
    }
    message = { message: 'Validation Error', errors}
    status = 400
  } else if(err.name === 'JsonWebToken' || err.name === 'TokenExpiredError') {
    status = 401
    message = { message: 'You must login first'}
  }

  res.status(status).json(message)
}