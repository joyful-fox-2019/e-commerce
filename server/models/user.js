const bcrypt = require("../helpers/bcrypt.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema ({
    email: {
        type: String,
        required: [true, `Email is required`],
        match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, `Invalid email format`],
        validate: {
            validator: function (v) {
                return User.findOne({
                    email: v
                })
                .then((found) => {
                    if (found)  return false;
                    else    return true;
                });
            },
            message: `Email must be unique`
        }
    },
    password: {
        type: String,
        required: [true, `Password is required`],
        minlength: [8, `Password length at least 8 characters`]
    },
    name: {
        type: String,
        required: [true, `Name is required`]
    },
    address: {
        type: String,
        required: [true, `Address is required`]
    },
    phone_number: {
        type: String,
        required: [true, `Phone number is required`],
        minlength: [10, `Phone number length at least 10 characters`],
        validate: {
            validator: function (v) {
                return User.findOne({
                    phone_number: v
                })
                .then((found) => {
                    if (found)  return false;
                    else    return true;
                });
            },
            message: `Phone number must be unique`
        }
    },
    balance: {
        type: Number,
        default: 0
    },
    privilege: {
        type: String,
        default: "user"
    }
}, {
    timestamps: true
});

userSchema.pre("save", function (next) {
    this.password = bcrypt.hash(this.password);
    next();
});

const User = model("User", userSchema);

module.exports = User;