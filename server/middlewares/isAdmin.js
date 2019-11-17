function isAdmin(req, res, next) {
  try {
    const role = req.LoggedUser.name
    if(role == 'admin') {
      next()
    } else {
      throw error
    }
    
  } catch(err) {
    next({
      status: 403,
      msg: 'Need Admin-authorized access'
    })
  }
}

module.exports = isAdmin