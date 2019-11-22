const Route = require('express').Router();
const Store = require('../controllers/store');
const { authentication } = require('../middlewares/auth');

Route.use(authentication);

Route.get('/', Store.getOwnerStore);
Route.post('/', Store.createStore);

module.exports = Route;