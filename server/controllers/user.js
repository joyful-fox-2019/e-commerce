const User = require('../models/User');
const bcrypt = require('../helpers/bcrypt');
const session = require('../helpers/session');

class UserController {
    static signup(req, res, next) {
        const { name, email, password, isAdmin } = req.body;
        User.findOne({
            email
        })
            .then(user => {
                if (!req.body.password) {
                    let err = {
                        status: 400,
                        msg: "Password should not be empty."
                    }
                    next(err);
                }

                if (user) {
                    let err = {
                        status: 400,
                        msg: "Email user is already registered!"
                    }
                    next(err);

                } else {
                    User
                    .create({
                        name,
                        email,
                        password,
                        isAdmin
                    })
                    .then( data => {
                        res.status(201).json(data);
                    })
                    .catch( err => {
                        next(err);
                    })
                }
            })
            .catch( err => {
                next(err);
            })
    }

    static signin(req, res, next) {
        const { email, password } = req.body;
        User
            .findOne({
                email
            })
            .then( user => {
                if (!req.body.email || !req.body.password) {
                    let err = {
                        status: 400,
                        msg: 'bad request'
                    }
                    next(err);
                }
                if(user) {
                    if (bcrypt.compare(password, user.password)) {
                        let token = session.encode({id: user.id, email: user.email, isAdmin: user.isAdmin});
                        
                        res.status(200).json({token});
                    } else {
                        let err = {
                            status: 404,
                            msg: 'invalid email/password'
                        }
                        next(err);
                    }
                } else {
                    let err = {
                        status: 404,
                        msg: 'invalid email/password'
                    }
                    next(err);
                }
            })
            .catch( err => {
                next(err);
            })
    }
}

module.exports = UserController;