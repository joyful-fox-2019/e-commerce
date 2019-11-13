const validate = require('mongoose-validator')

let emailValidator = [
  validate({
    validator : 'isEmail',
    message : 'invalid email format'
  })
]

let passwordValidator = [
  validate({
    validator : 'isLength',
    arguments : 5,
    message : `password has to contain at least 5 character length`
  })
]

module.exports = {
  emailValidator,
  passwordValidator
}