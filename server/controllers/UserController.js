const User = require('../models/User')
const { generateToken } = require("../helpers/jwt")
const { compare } = require("../helpers/bcrypt")

class UserController {
    static create (req, res, next) {
        let { email, password, role } = req.body
        console.log(req.body)
        User.create({
            email,
            password,
            role
        })
        .then (result => {
            res.status(201).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static findOne(req, res, next) {
        User.findOne({
            email: req.loggedUser.email
        })
        .then (result => {
            res.status(200).json(result)
        })
        .catch (err => {
            next(err)
        })
    }

    static login(req, res, next) {
        let { email, password } = req.body
        User.findOne({
            email
        })
        .then (result => {
            if (compare(password, result.password)) {
                let token = generateToken({
                    id: result._id,
                    email: result.email,
                    role: result.role
                })
                res.status(200).json(token)
            } else {
                let err = new Error("Wrong Password")
                err.name = "PasswordError"
                next(err)
            }
        })
        .catch (err => {
            next(err)
        })
    }
}

module.exports = UserController