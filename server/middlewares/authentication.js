const { verify } = require("../helpers/jwt")

module.exports = {
    authentication (req, res, next){
        try {
            let token = req.headers.token
            let decoded = verify(token)
            req.loggedUser = decoded
            console.log(req.loggedUser)
            next()
        } catch (err) {
            next(err)
        }
    }
}