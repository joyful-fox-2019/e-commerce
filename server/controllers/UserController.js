const User = require('../models/User')
const { generateToken } = require('../helpers/jwt')
const { compare } = require('../helpers/hash')

class UserController {

    static register(req, res, next){
        const { email, password, address } = req.body
        User.create({ email, password, address })
            .then(user =>{
                let payload ={
                    id : user._id
                }
                let token = generateToken(payload)
                res.status(201).json({token})
            })
            .catch(next)
    }


    static login(req, res, next){
        const { email, password } = req.body
        if(!email || !password) res.status(400).json({ message: 'bad request' })
        else{
            User.findOne({ email })
            .then(user =>{
                if(user && compare(password, user.password)){
                    let payload ={
                        id : user._id
                    }
                    let token = generateToken(payload)
                    res.status(200).json({token})
                }
                else{
                    next({
                        status: 400,
                        msg: 'password or email is wrong'
                    })
                }
            })
        }
    }

    static update(req, res, next){
        const { id } = req.decode
        const { firstName, lastName, address, file } = req.body
        let param = { firstName, lastName, address }
        if(file) param = { firstName, lastName, address, profilePic: file }
        User.findByIdAndUpdate(id, param, { omitUndefined:true })
            .then(() =>{
                res.status(200).json({
                    message: 'success update user profile'
                })
            })   
            .catch(next)
    }

    static find(req, res, next){
        const { id } = req.decode
        User.findById(id)
            .then(user =>{
                res.status(200).json(user)
            })
            .catch(next)
    }

}

module.exports  = UserController