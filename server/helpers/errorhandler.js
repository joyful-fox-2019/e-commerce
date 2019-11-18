function errorHandler (err, req, res, next) {

  if (err.name == "JsonWebTokenError") {
    res.status(401).json({ message : "invalidToken" })
  } else if (err.name=="ValidationError"){

    let message = err.message 
    res.status(400).json({ message : message })
  } else {
    let message = err.message || "internal server error"
    let status = err.status || 500

    res.status(status).json({
      message : message
    })
  }
}

module.exports = errorHandler
