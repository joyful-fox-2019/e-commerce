const verifyToken = require('../helpers/tokenGenerator').verifyToken

function Authentication(req,res,next){
    try {
        let decodedToken = verifyToken(req.headers.token)
        req.loggedUser = decodedToken
        // console.log(req.loggedUser,decodedToken)
        next()
    }catch(err){
        next({
            status : 410,
            message : 'authentication failed'
        })
    }
}

module.exports = Authentication