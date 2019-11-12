const bcrypt = require('bcryptjs');
const saltRounds = 10;

function hash(password) {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function compare(password, hashedPassword) {
    let valid = bcrypt.compareSync(password, hashedPassword);
    return valid;
}

module.exports = {
    hash,
    compare
}