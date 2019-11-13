const User = require('../models/User')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register (req,res,next) {
        let {name,email,password,role} = req.body
            User.create({name,email,password,role})
            .then(data => {
                let payload = {name:data.name,email:data.email,_id:data._id,role:data.role}
                let token = generateToken(payload)
                res.status(201).json({token,name:data.name,_id:data._id,email:data.email,role:data.role})
            })
            .catch(next)
    }
    static login (req,res,next) {
        let {email,password} = req.body
        User.findOne({email})
        .then(data=>{
            if(data && comparePassword(password,data.password)) {
                let payload = {name:data.name,email:data.email,_id:data._id,role:data.role}
                let token = generateToken(payload)
                res.status(201).json({token,name:data.name,_id:data._id,email:data.email,role:data.role})
            } else {
                next({status:400,msg:'invalid email/password'})
            }
        })
        .catch(next)
    }
}

module.exports = UserController