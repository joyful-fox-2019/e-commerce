const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT_ROUNDS))

function generateHash(password) {
  return bcrypt.hashSync(password, salt)
}

module.exports = generateHash