const User = require('../models/user');
const jwt = require('../helpers/tokenHandler');
const Password = require('../helpers/hashPassword')

class UserController {
    static register(req, res, next) {
        console.log('masuk disini')
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    throw ({
                        code: 400,
                        message: "Your email is already register"
                    })
                } else {
                    return User.create({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    })
                }
            })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    let valid = Password.compare(req.body.password, user.password)
                    console.log(valid)
                    if (valid) {
                        let token = jwt.generateToken({
                            id: user._id
                        })
                        res.status(200).json({
                            token,
                            username: user.username
                        })
                    } else {
                        throw ({
                            code: 400,
                            message: "Your password is wrong"
                        })
                    }
                } else {
                    throw ({
                        code: 400,
                        message: "Your email is not registered"
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static getUser(req, res, next) {
        User.find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController