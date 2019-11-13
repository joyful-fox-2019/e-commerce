function cekbody (req,res,next) {
    let {name,desc,price,stock} = req.body
    // let image = req.file
    // console.log(image,'------------------------------');
    // console.log(name,price,stock,desc,'?????????????');
    // console.log(req.file,'???????????');
    
    
    if(name && price && stock && desc) {
        next()
    } else {
        throw {status: 400, msg: 'all field is required'}
    }
}

module.exports = cekbody