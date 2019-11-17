const User = require('../models/user')
const { comparePassword } = require('../helpers/bcryptjs')
const { tokenGenerate } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const { username, email, password } = req.body
    User.create({ username, email, password })
      .then(user => {
        let payload = {
          id: user._id
        }
        let token = tokenGenerate(payload)
        res.status(201).json({ token: token, username: user.username, role: user.role })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if (user && comparePassword(password, user.password)) {
          let payload = {
              id: user._id
          }
          let token = tokenGenerate(payload)
          res.status(200).json({ token: token, username: user.username, role: user.role })
        } else {
            next({
              status: 400,
              message: `Invalid Email/Password`
            })
          }
        })
        .catch(next)
  }

  static registerAdmin(req, res, next){
    const { username, password, email } = req.body
    const role = 'admin'
    User.create({ username, password, email, role })
      .then(user => {
        let payload = {
          id: user._id
        }
        let token = tokenGenerate(payload)
        res.status(201).json({ username, password, role, email, token})
      })
      .catch(next)
  }
}

module.exports = UserController