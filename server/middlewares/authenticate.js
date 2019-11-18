const User = require('../models/User')
const verifyToken = require('../helpers/verifyToken')

module.exports = (req, res, next) => {
  try {
    const { access_token } = req.headers
    // console.log("ini access token di authenticate", access_token)
    const decoded = verifyToken(access_token, next)
    // console.log("ini decoded di authenticate", decoded);
    if (!access_token || !decoded) {
      // console.log('fail to decode user authentication');
      throw {
        name: 'Unauthorized',
        status: 401,
        message: 'Unauthorized access!'
      }
    }

    const payload = decoded

    User
      .findOne({ email: payload.email })
      .then(user => {
        // console.log("ini user", user);
        if (!user) {
          throw {
            name: 'Unauthorized',
            status: 401,
            message: 'Unauthorized access!'
          }
        }
        req.user = { id: user._id, email: payload.email, role: user.role }
        console.log("ini req user", req.user);
        next()
      })
      .catch(next)
  }
  catch (err) {
    next(err)
  }
}