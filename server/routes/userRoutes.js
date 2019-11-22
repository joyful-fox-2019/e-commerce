const routes = require('express').Router();
const UserController = require('../controllers/user')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.post('/register/admin', UserController.registerAdmin)


module.exports = routes
