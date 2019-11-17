const UserModel = require('../models/user')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

module.exports = {
    register(req, res, next) {
        const { name, password, email, imgUrl } = req.body
        UserModel.create({ name, password, email, imgUrl })
            .then(user => {
                let payload = { email: user.email, id: user._id, name : user.name }
                let token = generateToken(payload)
                res.status(201).json({ token , user })
            })
            .catch(next)
    },
    login(req, res, next) {
        const { email, password } = req.body
        UserModel.findOne({ email })
            .then(user => {
                if (user) {
                    if (comparePassword(password, user.password)) {
                        let payload = { email: user.email, id: user._id, name: user.name }
                        let token = generateToken(payload)
                        res.status(200).json({ token, name:user.name })
                    } else {
                        next({ status: 400, message: 'Wrong Password' })
                    }
                } else {
                    next({ status: 404, message: 'Email Not Found' })
                }
            })
            .catch(next)
    },
    findAll(req, res, next) {
        UserModel.find()
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    },
    delete(req, res, next) {
        UserModel.findOneAndDelete({
            _id : req.params.id
        })
        .then(user => {
            res.status(200).json({ user, message : 'Delete Success' })
        })
        .catch(next)
    }
}