module.exports = (err,req,res,next) => {
    const status = err.status || 500
    const message = err.message || 'internal server error'
    if(err.name == 'ValidationError'){
        const errors = []
        for(error in err.errors){
            errors.push(error)
        }
        res.status(400).json({
            message : "ValidationError",
            errors
        })
    } else {
        res.status(status).json(message)
    }
}