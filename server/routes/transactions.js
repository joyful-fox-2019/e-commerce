const transaction = require('express').Router()
const {user,all,create,update,remove} = require('../controllers/transController')
const auth = require('../middlewares/auth').authentication
const authz = require('../middlewares/auth').authorization
const authTrans = require('../middlewares/auth').authorizationTrans
const checkMoney = require('../middlewares/checkMoney')
const checkStorage = require('../middlewares/checkStorage')

transaction.get('/user',auth,user)
// transaction.get('/all',auth,authz,all)
transaction.get('/all',all)
transaction.post('/new',auth,checkStorage, checkMoney,create)
transaction.patch('/:transactionId',auth,authTrans,update)
transaction.delete('/:transactionId',auth,authz,remove)


module.exports = transaction