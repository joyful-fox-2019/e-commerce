const bcrypt = require("bcrypt");
const saltRound = 10;

function hash(pass){
    let salt = bcrypt.genSaltSync(saltRound);
    return bcrypt.hashSync(pass, salt);
}

function compare(pass, hash){
    return bcrypt.compareSync(pass, hash);
}

module.exports = { hash, compare }