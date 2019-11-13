module.exports = (err, req, res, next)=>{
  console.log(err);
  
  let status = err.status || 500
  let message = err.msg || 'Internal Server Error'

  if(err.name == 'ValidationError'){
    const errors = []
    for(path in err.errors){
      errors.push(err.errors[path].message)
    }
    console.log(errors)
    res.status(400).json({
      message: 'Validation Error',
      errors
    })
  } else {
    res.status(status).json({ message })
  }
}