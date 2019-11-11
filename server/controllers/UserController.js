const User = require('../models/user')
const comparePassword = require('../helpers/passwordEncryptor').comparePassword
const generateToken = require('../helpers/tokenMaker').generateToken

class UserController {
    static register(req, res, next) {
        let objUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(objUser)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body
        if(!email || !password) {
            res.status(400).json({ message: 'bad request' })
        } else {
            const invalidLoginError = {
                status: 404,
                message: 'Invalid Email or Password'
            }
            User.findOne({ email })
                .then(user => {
                    if(user && comparePassword(password, user.password)) {
                        let payload = {
                            id: user._id,
                            email: user.email
                        }
                        let token = generateToken(payload)
                        res.status(200).json({ token })
                    } else {
                        next(invalidLoginError)
                    }
                })
                .catch(next)
        }
    }
}

module.exports = UserController