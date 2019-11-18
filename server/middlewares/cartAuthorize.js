const Cart = require('../models/cart')

module.exports = (req, res, next) => {
  Cart.findOne({ _id: req.params.id})
    .then(result => {
      if(!result) {
        let err = new Error('Bad Request')
        err.status = 404
        next(err)
      } else {
        if(result.UserId == req.payload.id) {
          next()
        } else {
          let err = new Error ('You are not authorized')
          err.status = 403
          next(err)
        }
      }
    })
    .catch(err => {
      next (err)
    })
}