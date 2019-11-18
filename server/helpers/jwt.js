const jwt = require("jsonwebtoken");

module.exports = {
    createToken(payload){
       return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "3h"})
    },
    decodeToken(token){
        if(!token){
            throw new Error("Token is undefined")
        }
        let decoded =  jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
}