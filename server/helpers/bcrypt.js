const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

module.exports = {
  genHash (pass) {
    return bcrypt.hashSync(pass, salt)
  },
  comparePass (password, hashed) {
    return bcrypt.compareSync(password, hashed)
  }
}