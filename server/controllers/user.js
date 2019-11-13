const User = require('../models/User')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcryptjs')

module.exports = {
  register: (req, res, next) => {
    const { name, email, password, adminPassword } = req.body
    let isAdmin = undefined
    if(adminPassword) {
      if(adminPassword !== process.env.ADMIN_PASSWORD) {
        throw { status: 401, msg: 'Wrong admin password' }
      } else {
        isAdmin = true
      }
    }
    User.create({ name, email, password, isAdmin })
      .then(user => {
        const { _id, password, isAdmin } = user
        const access_token = generateToken({ _id, email })
        res.status(201).json({ _id, name, email, password, isAdmin, access_token })
      })
      .catch(next)
  },
  login: (req, res, next) => {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if(!user || !comparePassword(password, user.password)) {
          throw { status: 400, msg: 'Wrong email/password'}
        } else {
          const { _id, name, isAdmin } = user
          const access_token = generateToken({ _id, email, name })
          res.status(200).json({ _id, name, email, isAdmin, access_token })
        }
      })
      .catch(next)
  }
}