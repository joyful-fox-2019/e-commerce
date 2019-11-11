const User = require('../models/user');
const { comparePassword } = require('../helpers/hash');
const { signToken } = require('../helpers/jwt');
const { hashCode, compareCode } = require('../helpers/hashCode');
const { sendMail } = require('../helpers/sendMail');
const Cart = require('../models/cart')


module.exports = {
  signup (req, res, next) {
    const { email, password, username } = req.body;
    let payload = {}
    let tempUser = null
    User.create({ email, password, username })
      .then(user => {
        tempUser = user
        payload = {
          id: user._id,
          email: user.email
        }
        const UserId = user._id
        return Cart.create({ UserId })
      })
      .then(() => {
        const serverToken = signToken(payload);
        res.status(201).json({user: tempUser, token: serverToken, msg: 'SignUp succesfully!'})
      })
      .catch(next)
  },
  signin (req, res, next) {
    const { request, password } = req.body;
    if(!request || !password) next({status:400, msg: 'bad request'})
    else {
      User.findOne({ $or: [{ username: request }, { email: request }]})
        .then(user => {
          if(user && comparePassword(password, user.password)) {
            let payload = {
              id: user._id,
              email: user.email
            }
            let serverToken = signToken(payload)
            res.status(200).json({user, token: serverToken, msg: 'Signin Success'})
          } else {
            next({ status:403, msg: 'your request wrong'})
          }
        })
        .catch(next)
    }
  },
  updateAddress (req, res, next) {
    const { address } = req.body;
    if(!address) next({status: 400, msg:'cannot send empty value address' })
    else {
      User.findByIdAndUpdate(req.loggedUser.id, { address }, {new: true})
        .then(user => {
          res.status(201).json({user})
        })
        .catch(next)
    }
  },
  verifyEmail (req, res, next) {
    const { code } = req.body;
    const id = req.loggedUser.id;
    User.findByIdAndUpdate(id, { verification: true})
      .then(user => {
        if(user && compareCode(user._id, code)) {
          res.status(201).json({user, msg: 'Your Account now Verified'})
        } else {
          next({ status: 400, msg: 'invalid code verify'})
        }
      })
      .catch(next)
  },
  sendCodeVerify (req, res, next) {
    const email = req.loggedUser.email
    if(!email) next({status: 400, msg: 'email is required'});
    else {
      User.findOne({ email }) 
        .then(user => {
          const code = hashCode(user._id.toString())
          return sendMail(email, {
            msg: `verification now , your code is => ${code}`
          }, {
            subject: 'Verification Account'
          })
        })
        .then(({msg}) => {
          res.status(200).json({ msg })
        })
        .catch(next)
    }
  },
  getLogin (req, res, next) {
    const id = req.loggedUser.id;
    User.findById(id)
      .then(user => {
        if(!user) next({status: 400, msg: 'bad request'})
        else {
          res.status(200).json({user, msg: 'Online'})
        }
      })
      .catch(next)
  }
}