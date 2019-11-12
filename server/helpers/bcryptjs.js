const bcryptjs = require('bcryptjs')

module.exports = {
  hashPassword: (password) => {
    return bcryptjs.hashSync(password)
  },
  comparePassword: (password, hashedPassword) => {
    return bcryptjs.compareSync(password, hashedPassword)
  }
}