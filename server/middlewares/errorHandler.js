module.exports = (err, req, res, next) => {
  console.log(err)
  let messages = []
  if(err.name === 'ValidationError') {
    err.status = 400
    for(let field in err.errors) {
      messages.push(err.errors[field].message)
    }
  } else if(err.name === 'JsonWebTokenError') {
    err.status = 401
    messages.push('You have to login first')
  } else if(err.code === 11000) {
    err.status = 400
    let field = Object.keys(err.keyPattern)[0]
    field = field.substring(0, 1).toUpperCase() + field.substring(1)
    if(field === 'Email') {
      messages.push(`${field} is already registered`)
    } else {
      messages.push(`${field} is already exist`)
    }
  } else if(err.status) {
    messages.push(err.msg)
  } else if(err.message === `Cannot read property 'originalname' of undefined`) {
    err.status = 400
    messages.push('You have to upload an image')
  } else {
    err.status = 500
    messages.push('Something went wrong with server')
  }
  res.status(err.status).json({ messages })
}