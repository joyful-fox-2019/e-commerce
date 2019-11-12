const bcrypt = require('bcryptjs')

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function checkPassword(passwordInput, passwordDb) {
    return bcrypt.compareSync(passwordInput, passwordDb)
}

module.exports = {hashPassword, checkPassword}