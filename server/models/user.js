const {Schema, model} = require("mongoose");
const hashHelper = require("../helpers/hashHelper");

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        validate:{
            validator(value){
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message(){
                return `Please enter a valid email`
            }
        }
    },
    password:{
        type: String,
        required: true,
        validate:{
            validator(value){
                return value.length >= 5
            },
            message(){
                return `Password minimum 5 character`
            }
        }
    },
    username:{
        type: String,
        required: true,
        validate:{
            validator(value){
                return value.length >= 4 && value.length <= 12
            },
            message(){
                return `Username must be between 4 and 12 character`
            }
        }
    },
    privilege:{
        type: String,
        default: 'customer'
    },
    cart:[{
        type: Schema.Types.ObjectId, ref: 'Product'
    }]
}, {
    timestamps: true,
    versionKey: false
})

userSchema.pre('save', function(next){
    this.password = hashHelper.hash(this.password);
    next();
})

const User = model('User', userSchema);

module.exports = User