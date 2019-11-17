function errorHandler(err, req, res, next) {
    
    let status, message, error = []
    console.log(err)

    if (err.name === 'ValidationError') {
        status = 400
        for (let key in err.errors) {
            error.push(err.errors[key].message)
        }
    } else if (err.name === 'CastError') {
        status = 404
        error.push('data not found')
    } else if (err.message.name === 'JsonWebTokenError') {
        status = 400
        error.push('login first')
    } else {
        status = 400
        error.push(err.message)
    } 

    res.status(status).json({error})

}

module.exports = errorHandler
