function errorHandler (err,req,res,next) {
    // console.log(err);
    
    if(err.name == "ValidationError") {
        let message = []
        for(let el in err.errors) {
            message.push(err.errors[el].message)
        }
        res.status(400).json({message})
    } else if (err.name == "MongoError" && err.code == 11000) {
        res.status(400).json({message:'email is already been used'})
    } else if (err.name == "JsonWebTokenError") {
        res.status(401).json({message:'you must login first'})
    } else {
        let status = err.status || 500
        let message = err.msg || 'internal server error'
        res.status(status).json({message})
    }
}

module.exports = errorHandler