const User = require('../models/user')
const { decodeToken } = require('../helpers/jwt')

const authentication = (req, res, next) => {
  console.log(req.headers)
  User.findById(decodeToken(req.headers.token).id) //mengambil id obj yg telah di decode
    .then(user => {
      console.log(user, "dr middlewareeeeeeee")
      if (!user) {
        throw {status : 401, message : `you have to login first`}
      } else {
        req.loggedUser = user
        next()
      }
    })
    .catch(next)
}

const adminAuthorization = (req, res, next) => {
console.log(req.loggedUser)

    if (req.loggedUser.role === `admin`) {
      next()
    } else {
      throw {status : 403, message : `you are not authorized to perform this task`}
    }
}

const customerAuthorization = (req, res, next) => {
  console.log(req.loggedUser, "authhh");
  
  if (req.loggedUser.role === `customer`) {
    next()
  } else {
    throw {status : 403, message : `you are not authorized to perform this task`}
  }
}

module.exports = {
  authentication,
  adminAuthorization,
  customerAuthorization
}