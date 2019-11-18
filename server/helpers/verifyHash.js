const bcrypt = require('bcryptjs')

function verifyHash(password, hash) {
  return bcrypt.compareSync(password, hash)
}

module.exports = verifyHash