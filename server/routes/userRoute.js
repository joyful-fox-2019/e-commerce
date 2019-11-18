const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

const express = require('express')
const Router = express.Router()

Router.get('/',userController.readAll)
Router.get('/me', auth,userController.readMe)
Router.post('/', userController.create),
Router.patch('/topups',auth,userController.updateTopUp)
Router.post('/login',userController.login)

module.exports = Router
