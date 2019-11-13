const User = require("../models/user.js");
const bcrypt = require("../helpers/bcrypt.js");
const jwt = require("../helpers/jwt.js");

function signin (data) {
    return User.findOne({
        email: data.email
    })
    .then((user) => {
        if (user) {
            if (bcrypt.compare(data.password, user.password)) {
                const jwt_token = jwt.generate({ _id: user._id, name: user.name, email: user.email });
                return { _id: user._id, jwt_token: jwt_token };
            } else {
                let err = { status: 400, message: `Password not match` };
                return err;
            }
        } else {
            let err = { status: 404, message: `User not found` };
            return err;
        }
    })
    .catch((err) => {
        return err;
    });
}

module.exports = {
    signin: signin
}