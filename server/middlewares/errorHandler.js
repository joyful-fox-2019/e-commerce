module.exports = (err, req, res, next) => {
    console.log(err.status, err.message)
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    if (err.name === 'ValidationError') {
        const errors = []
        for (key in err.errors) {
            errors.push(err.errors[key].message)
        }
        res.status(400).json({
            message: 'Validation Error',
            errors
        })
    } else if (err.message.name === 'JsonWebTokenError') {
        res.status(status).json({ message: err.message.message })
    } else if(err.message === `Cannot read property \'password\' of null`){
        res.status(401).json({message: 'Email is not registered'})
    }
    else {
        res.status(status).json({ message })
    }
}