const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

function getHash(password){
  return bcrypt.hashSync(password,salt)
}

function compareHash(password,hash){
  return bcrypt.compareSync(password,hash)
}

module.exports = {getHash,compareHash}