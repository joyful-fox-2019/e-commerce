const { user } = require('../models')
const { comparePassword } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body
    user
      .create({
        name,
        email,
        password
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static login(req, res, next) {
    const { email, password } = req.body
    user.findOne({ email }).then(result => {
      if (result && comparePassword(password, result.password)) {
        const payload = {
          _id: result._id,
          name: result.name,
          email: result.email
        }
        const token = generateToken(payload)
        res.status(200).json({
          token,
          name: result.name,
          email: result.email
        })
      } else {
        next({
          status: 401,
          message: 'Invalid email/password'
        })
      }
    })
  }
}

module.exports = UserController
