const bcrypt = require("bcryptjs")

let SALT = Number(process.env.SALT)
function hashPassword(password) {
    let hash = bcrypt.hashSync(password, SALT)
    return hash
}

function compare(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = {
    hashPassword,
    compare
}