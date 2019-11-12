const User = require('../models/User')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcryptjs')

module.exports = {
  register: (req, res, next) => {
    const { fullName, email, password, adminPassword } = req.body
    const isAdmin = adminPassword && adminPassword === process.env.ADMIN_PASSWORD
    User.create({ fullName, email, password, isAdmin })
      .then(user => {
        const { _id, password, isAdmin } = user
        const access_token = generateToken({ _id, email })
        res.status(201).json({ _id, fullName, email, password, isAdmin, access_token })
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
          const { _id, fullName, isAdmin } = user
          const access_token = generateToken({ _id, email, fullName })
          res.status(200).json({ _id, fullName, email, isAdmin, access_token })
        }
      })
      .catch(next)
  }
}