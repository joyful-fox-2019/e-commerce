`use stict`
module.exports = (err, req, res, next) => {
    console.log(err)
    if (err.status && err.msg ) {
        return res.status(err.status).json({
            msg : err.msg
        })
    }
    switch (err.name) {
        //status untuk validation error adalah 400
        case 'ValidationError':
            let messages = []
            if (err.errors) {
                for (let index in err.errors) {
                    messages.push(err.errors[index].message)
                }
            } else {
                messages = err.message
            }
            return res.status(400).send({
                msg: messages
            })   
        case 'CastError':
            return res.status(400).send({
                msg: `id invalid`
            })  
        case 'JsonWebTokenError' : {
            return res.status(400).send({
                msg : "invalid token, please don't change the token in your local storage"
            })
        }                 
        default:            
            return res.status(500).send({
                msg: 'Internal Server Error'
            })
    }

}


