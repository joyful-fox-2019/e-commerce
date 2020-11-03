const User = require('../models/user')
const {
    compare
} = require('../helpers/bcrypt')
const {
    getToken
} = require('../helpers/jsonwebtoken')

class UserController {
    static register(req, res, next) {
        const {
            name,
            email,
            password,
            full_address,
            role
        } = req.body
        User.create({
            name,
            email,
            password,
            full_address,
            role
        })
            .then(user => {
                // console.log(user)
                res.status(201).json({
                    message: 'Successfull registration'
                })
            })
            .catch(next)
    }
    static login(req, res, next) {
        if (!req.body.password) {
            console.log(req.body)
            throw '404'
        }
        const {
            email,
            password
        } = req.body
        User.findOne({
            email
        })
            .then(user => {
                if (!user) {
                    throw 'UNF'
                } else {
                    let valid = compare(password, user.password)
                    if (valid) {
                        let payload = {
                            id: user._id
                        }
                        let token = getToken(payload)
                        res.status(200).json({
                            message: 'Successfull login',
                            token,
                            role: user.role
                        })
                    } else {
                        throw 'WRONG'
                    }
                }
            })
            .catch(next)
    }
}

module.exports = UserController