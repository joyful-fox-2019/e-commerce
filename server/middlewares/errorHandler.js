module.exports = (err, req, res, next) => {
  console.log("masuk error handler, ini err", req.body, err);
  let errStatus
  let messages = []

  if (err.name === 'CastError' && err.message.includes('Cast to ObjectId failed', 'Product')) {
    // console.log('masuk CastError');
    errStatus = 404
    messages.push('Product not found!')
  }
  else if (err.name === 'JsonWebTokenError') {
    errStatus = 401
    messages.push('Unauthorized access!')
  }
  else if (err.name === 'ValidationError') {
    errStatus = 400
    for (key in err.errors) {
      if (err.errors[key].message) {
        messages.push(err.errors[key].message)
      }
    }
  }
  else if (err.name === 'MongoError') {
    if (err.errmsg.includes('duplicate key error')) {
      errStatus = 400
      messages.push('Email has already been used!')
    }
  }
  else {
    // console.log('masuk else', err.status);
    errStatus = err.status
    messages.push(err.message)
  }
  // console.log("ini errStatus nya di error handler", errStatus);
  res.status(errStatus ? errStatus : 500).json({ messages })
  next()
}