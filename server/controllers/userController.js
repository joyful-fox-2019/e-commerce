const User = require('../models/user');
const {
    hashPassword,
    comparePassword
} = require('../helpers/bcrypt');
const jwt = require('../helpers/jwt');
class UserController {
    static register(req, res, next) {
        console.log('masuk register');
        let {
            name,
            email,
            password
        } = req.body;
        password = hashPassword(password);
        User.create({
                name,
                email,
                password
            })
            .then(user => {
                res.status(201).json(user);
            })
            .catch(next)
    }

    static login(req, res, next) {
        console.log('masuk login')
        let {
            email,
            password
        } = req.body;
        User.findOne({
                email
            })
            .then(user => {
                if (!user) {
                    console.log('dari user==>', user)
                    next({
                        message: 'Username/Password is wrong!'
                    })
                } else {
                    if (!comparePassword(password, user.password)) {
                        next({
                            message: 'Username/Password is wrong!'
                        });
                    } else {
                        // console.log('ketemu user')
                        const payloadjwt = {
                            id: user._id,
                            email: user.email
                        }
                        let token = jwt.getToken(payloadjwt);
                        res.status(200).json({
                            token,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        })
                    }
                }
            })
            .catch(next);
    }

    static googleLogin(req, res, next) {
        User.findOne({
                email: req.decoded.email
            })
            .then(user => {
                if (user) {
                    console.log('user sudah ada');
                    return user;
                } else {
                    console.log('user belum ada');
                    return User.create({
                        name: req.decoded.given_name,
                        email: req.decoded.email,
                        password: hashPassword(process.env.DEFAULT_PASSWORD)
                    })
                }
            })
            .then(user => {
                const payloadjwt = {
                    id: user._id,
                    email: user.email
                }
                let token = jwt.getToken(payloadjwt);
                res.status(201).json({
                    token
                })
            })
            .catch(next);
    }

    static addRps(req, res, next) {
        User.findOneAndUpdate({
                email: req.params.email
            }, {
                rps: req.body.rps
            }, {
                new: true
            })
            .then(rps => {
                res.status(200).json(rps)
            })
            .catch(next)
    }

    static getRps(req, res, next) {
        // console.log('cek rps')
        User.findOne({
                email: req.params.email
            })
            .then(rps => {
                // console.log(rps)
                res.status(200).json(rps)
            })
            .catch(next)
    }
};

module.exports = UserController;