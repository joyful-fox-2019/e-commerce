const Store = require('../models/Store');
const User = require('../models/user');

module.exports = {
  createStore (req, res, next) {
    const id = req.loggedUser.id;
    const { name, location } = req.body;
    let tempStore
    User.findById(id)
      .then(user => {
        if(!user.verification) return
        else {
          return Store.create({ Owner: id, name, location })
        }
      })
      .then(store => {
        tempStore = store
        if(!store) return
        else {
          return User.findByIdAndUpdate(id, {StoreId: store._id}, {new: true})
        }
      })
      .then(user => {
        if(!user) next({status: 403, msg: 'Cannot create Store, please verify your account first!'})
        else {
          res.status(201).json({user, store: tempStore, msg: 'Store Created!'})
        }
      })
      .catch(next)
  },
  getOwnerStore (req, res, next) {
    const Owner = req.loggedUser.id;
    Store.findOne({ Owner }).populate('ProductId')
      .then(store => {
        res.status(200).json({ store })
      })
      .catch(next)
  }
}