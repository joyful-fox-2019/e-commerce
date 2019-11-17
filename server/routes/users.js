const express = require('express')
const users = express.Router()

const userController = require('../controllers/userController')

users.post('/register', userController.register)
users.post('/login', userController.login)

module.exports = users;
