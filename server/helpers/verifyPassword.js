const bcryptjs = require('bcryptjs')

function verifyPassword(password, hashedPassword) {
    let passwordIsTrue = bcryptjs.compareSync(password, hashedPassword)
    return passwordIsTrue
}

module.exports = verifyPassword