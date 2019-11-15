module.exports = function(err, req, res, next){
    // console.log(err)
    let status
    let message
    let arr = []

    switch(err.name){
        case 'ValidationError' :
            status = 400
            for(let i in err.errors){
                if(err.errors[i].kind == 'unique'){
                    arr.push(`${err.errors[i].path} already taken` )
                }else{
                    arr.push(err.errors[i].message)
                }
            }
            message = arr
            break;
        case 'JsonWebTokenError' :
            status = 401
            message = err.message
            break;
        default : 
            status = err.status || 500
            message = err.msg || err.message || 'internal server error'
    }
    res.status(status).json({code : status, message})
}