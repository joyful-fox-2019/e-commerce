const User = require('../models/user')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class UserController {

  static register(req, res, next) {
    let { name, email, password, isAdmin, city } = req.body
    let userData = { name, email, password, isAdmin, city }
    let emailSplit = email.split('@')
    if (emailSplit[0] === 'toko46' && emailSplit[1] === 'admin.com' && password === 'ecommercetoko46') {
      User.create({name, email, password, isAdmin: true, city})
        .then(user => {
          res.status(201).json(user);
        })
        .catch(next)
    } else {
      User.create(userData)
        .then(user => {
          res.status(201).json(user);
        })
        .catch(next)
    }
  }

  static login(req, res, next) {
    if (!req.body.email || !req.body.password) {
      let err = new Error('Email or Password must be inputted')
      err.status = 400
      throw err
    }
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user && bcrypt.compare(req.body.password, user.password)) {
          let access_token = jwt.generate({ id: user._id });
          if (!user.isAdmin) {
            res.status(200).json({
              access_token,
              name: user.name,
            });
          } else {
            res.status(200).json({
              access_token,
              secret: 'ecommerce-hacktiv8-phase-2',
              name: 'admin_ecommerce_toko46',
            });
          }
        } else {
          let err = new Error('Email or Password is incorrect')
          err.status = 401
          throw err
        }
      })
      .catch(next);
  }


}

module.exports = UserController