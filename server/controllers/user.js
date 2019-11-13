const User = require("../models/user.js");
const bcrypt = require("../helpers/bcrypt.js");
const jwt = require("../helpers/jwt.js");

class UserController {
    static signup (req, res, next) {
        User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            address: req.body.address,
            phone_number: req.body.phone_number
        })
        .then((user) => {
            const jwt_token = jwt.generate({ _id: user._id, name: user.name, email: user.email });
            res.status(201).json({ jwt_token: jwt_token });
        })
        .catch((err) => {
            next(err);
        });
    }
    static signin (req, res, next) {
        User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                if (bcrypt.compare(req.body.password, user.password)) {
                    const jwt_token = jwt.generate({ _id: user._id, name: user.name, email: user.email });
                    res.status(200).json({ jwt_token: jwt_token });
                } else {
                    let err = { status: 400, message: `Password not match` };
                    next(err);
                }
            } else {
                let err = { status: 404, message: `User not found` };
                next(err);
            }
        })
        .catch((err) => {
            next(err);
        });
    }
    static gsignin (req, res, next) {
        User.findOne({
            email: req.user.email
        })
        .then((user) => {
            if (user) {
                return user;
            } else {
                return User.create({
                    email: req.body.email,
                    password: process.env.DEFAULT_PASSWORD,
                    name: req.user.name,
                    address: "-",
                    phone_number: "-",
                    privelege: "user"
                });
            }
        })
        .then((verified) => {
            const jwt_token = jwt.generate({ _id: verified._id, name: verified.name, email: verified.email });
            res.status(200).json({ jwt_token: jwt_token });
        })
        .catch((err) => {
            next(err);
        });
    }
}

module.exports = UserController;