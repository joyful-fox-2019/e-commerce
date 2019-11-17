module.exports = (err, req, res, next) => {
 console.log(err)
 const status = err.status || 500;
 const msg = err.msg || 'Internal Server Error' 
 if(err.name === 'ValidationError') {
   const errors = [];
   for(key in err.errors) {
   errors.push(err.errors[key].message)
   }
   res.status(400).json({ msg: 'Validation Error', errors })
 } else if (err.status && err.msg ){
   res.status(status).json({ msg })
 } else if (err.name == 'JsonWebTokenError' && err.message == 'jwt malformed' ){
   res.status(400).json({msg: 'Invalid Token'})
 } else if (err.name == 'JsonWebTokenError') {
   res.status(400).json({msg: err.message})
 } else {
   res.status(status).json({ msg })
 }
}