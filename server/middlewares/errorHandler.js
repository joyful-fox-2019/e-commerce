module.exports = (err, req, res, next) => {
  console.log(err.name, '+++++++++++++++++++', err);
  if (err.status) {
    res.status(err.status).json({message : err.message})
  } else {
    let message = []
    if (err.name === `ValidationError`) {
      message.push(`register failed`)
      // console.log(err.errors);
      
      for (let field in err.errors) {
        if (field === `email` && err.errors[field].kind === 'unique') {          
          err.errors[field].message = `email is already exist`
        }
        message.push(err.errors[field].message)
      }
      res.status(400).json({ message })
    } else if (err.name === `JsonWebTokenError`) {
      res.status(401).json({message : `you have to login first`}) //JWT ID invalid
    }

    else {
      res.status(500).json({message : `internal server error`})
    }
  }
}