const User = require('../models/User')
const generateToken = require('../helpers/generateToken')
const verifyHash = require('../helpers/verifyHash')

class ControllerUser {
  static register(req, res, next) {
    // console.log('masuk ke register', req.body);
    const { name, email, password } = req.body
    User
      .create({ name, email, password, role: 'customer' })
      .then(user => {
        // console.log('ini user yang diregister', user);
        const payload = { id: user._id, name, email }
        const access_token = generateToken(payload)

        res.status(201).json({
          message: 'Successfully registered!',
          access_token, user
        })
      })
      .catch(next)
  }

  static login(req, res, next) {
    // console.log("ini req body di log in", req.body);
    const { email, password } = req.body
    User
      .findOne({ email })
      .then(user => {
        // console.log("ini user found di login", user);
        if (!user) throw {
          name: 'NotFound',
          status: 404,
          message: 'Wrong email/password!',
        }

        if (user.role === 'customer' && !verifyHash(password, user.password)) throw {
          name: 'NotFound',
          status: 404,
          message: 'Wrong email/password!',
        }

        const payload = { id: user._id, name: user.name, email: user.email, role: user.role }
        const access_token = generateToken(payload)

        res.status(200).json({
          message: 'Successfully logged in!',
          access_token, user
        })
      })
      .catch(next)
  }

  static googleSignIn(req, res, next) {
    const { googleidtoken } = req.headers
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    let payload, name, email, password, picture

    client
      .verifyIdToken({
        idToken: googleidtoken,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload()
        // console.log("ini payload dari google sign in", payload);
        name = payload.name
        email = payload.email
        password = process.env.DEFAULT_USER_PASSWORD
        picture = payload.picture

        return User
          .findOne({ email })
      })
      .then(user => {
        if (!user) {
          // console.log("ga ada user pas google sign in, maka create", password);
          User
            .create({
              name, email, password, picture
            })
            .then(user => {
              const id = user.id
              const payload = { email, id }
              const access_token = generateToken(payload)

              res.status(201).json({
                message: 'Successfully registered!',
                access_token, user
              })
            })
            .catch(next)
        }
        else {
          // console.log("ada user pas google sign in", user);
          payload = {
            email: payload.email,
            id: user.id
          }
          const access_token = generateToken(payload)

          res.status(200).json({
            message: 'Successfully logged in!',
            access_token, user
          })
        }
      })
      .catch(next)
  }

  static findById(req, res, next) {
    // console.log("masuk user findbyid");
    User
      .findById(req.user.id)
      .populate('user.cart')
      .then(user => {
        console.log("ini user di findbyid", user);
        if (!user) throw {
          name: 'NotFound',
          status: 404,
          message: 'Cannot find a user!'
        }
        res.status(200).json({ user })
      })
      .catch(next)
  }
}

module.exports = ControllerUser