const validate = require('mongoose-validator')

let isEmailValidation = [
    validate({
        validator: 'isEmail',
        message: 'invalid email format'
    })
]

let passwordValidation = [
    validate({
        validator: 'matches',
        arguments: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/,
        message: 'password shold contain at least one digit, one lower case , one upper case , minumum 5 char'
    })
]


module.exports = { isEmailValidation,passwordValidation }