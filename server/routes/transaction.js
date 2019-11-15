const router = require('express').Router()
const transactionController = require('../controllers/transactionController')
const authentication = require('../middlewares/authentication')

router.use(authentication)

router.get('/',transactionController.showTransaction)
router.post('/checkout',transactionController.checkOut)



module.exports = router

let array = []
transaction.forEach(el => {
    let promises = new Promise((resolve, reject) => {
        User.find()
        .then(doc => resolve(doc))
        .catch(err => reject(err))
    })
    array.push(promises)
})

Promise.all(array)
.then(doc => )