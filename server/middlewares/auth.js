const jwt = require('../helpers/jwt')

function authen (req,res,next) {
    try {
        
        const decoded = jwt.tokenVerify(req.headers.token)
        req.decoded = decoded;
        
        next()
    }catch(err) {
        res.status(403).json({message: 'You must Login First as User'})
    }
}


module.exports = authen;