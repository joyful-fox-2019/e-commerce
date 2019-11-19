module.exports = (err, req, res, next) => {
  // console.log(JSON.stringify(err, null, 2))

  let message = err.message || 'Internal Server Error'
  let status = err.status || 500

  if(err.name === 'ValidationError'){
    let errors = []
    for(let key in err.errors){
      errors.push(err.errors[key].message)
    }
    message = { message: 'Validation Error', errors}
    status = 400
  } else if(err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    status = 401
    message = { message: 'You must login first'}
  } else if(err.name === 'CastError') {
    status = 404
    message = { message: 'Not found'}
  }

  // console.log(JSON.stringify({status, message}));

  res.status(status).json(message)
}