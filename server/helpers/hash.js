const bcr = require('bcryptjs')

function hashPass (payload) {
    let salt = bcr.genSaltSync(10)
    return bcr.hashSync(payload, salt)
}

function checkPass (pass, hashPassword) {
    return bcr.compareSync(pass,hashPassword)
}

module.exports = {
    hashPass,
    checkPass
}