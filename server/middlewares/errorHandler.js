module.exports = (err, req, res, next) => {
    // console.log('errrrrrrrr', err)
    if (err.name === 'ValidationError') {
        res.status(400).json({
            message: err.message
        })
    } else if (err.name === 'MongoError') {
        res.status(400).json({
            message: 'Email already exists'
        })
    } else if (err === 'UNF' || err === '404') {
        res.status(404).json({
            message: 'User not found'
        })
    } else if (err === 'Product not found') {
        res.status(404).json({
            message: 'Sorry we couldn\'t find the product that you are looking for'
        })
    } else if (err === 'WRONG' || err === '403') {
        let message = ''
        if (err === 'WRONG') {
            message = "Wrong username/password"
        } else {
            message = "Sorry,this site is currently forbidden for you"
        }
        res.status(403).json({
            message
        })
    } else {
        res.status(500).json({
            err
        })
    }
}