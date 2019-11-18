const User = require('../models/User')

module.exports = (req, res, next) => {
  try {
    // console.log("masuk authorize");
    // const _id = req.params.id
    const userId = req.user.id
    // console.log("ini id, userId", _id, userId);
    User
      .findOne({ _id: userId })
      .then(user => {
        // console.log("ini user di authorize", user);
        if (!user || user.role !== 'admin') throw {
          name: 'Unauthorized',
          status: 401,
          message: 'Unauthorized access!'
        }
        next()
      })
      .catch(next)
  }
  catch (next) {
  }
}