const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const Product = require('../models/Product')
const User = require('../models/User')
const Cart = require('../models/Cart')
const generateToken = require('../helpers/generateToken')

const expect = chai.expect
chai.use(chaiHttp)

let adminAccessToken, customerAccessToken, currentItemId

const dummyProduct = {
  name: 'Wrecking Ball: Diary of a Wimpy Kid', price: 160000, qty: 9, author: 'Jeff Kinney'
}

describe('CRUD products routes', function () {
  this.timeout(5000)

  before(function (done) {
    User.create({
      name: 'admin',
      email: 'admin@admin.com',
      password: 'admin123',
      role: 'admin'
    })
      .then((user) => {
        // console.log('1 >>> ini user pas admin creation', user);
        let payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
        adminAccessToken = generateToken(payload)

        return User.create({
          name: 'customer',
          email: 'customer@customer.com',
          password: 'customer123',
          role: 'customer'
        })
      })
      .then((user) => {
        // console.log('2 >>> ini user pas customer creation', user);
        let payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
        customerAccessToken = generateToken(payload)
        done()
      })
      .catch(err => console.log(err))
  })

  after(function (done) {
    if (process.env.NODE_ENV === 'testing') {
      User.deleteMany()
        .then(() => {
          console.log('\nsuccessfully deleted users');
          return Product.deleteMany()
        })
        .then(() => {
          console.log('successfuly deleted products');
          return Cart.deleteMany()
        })
        .then(() => {
          console.log('successfully deleted carts');
          done()
        })
        .catch(err => console.log(err)
        )
    }
  })

  describe('Add a product', function () {
    it('should return the newly created product (name: string, price: integer, qty: integer) with the message (\'Successfully added a product!\')', function (done) {
      chai
        .request(app)
        .post('/products')
        .set('access_token', adminAccessToken)
        .send(dummyProduct)
        .end(function (err, res) {
          // console.log("ini response dari product add", res.body)
          currentItemId = res.body.product._id

          expect(err).to.be.null
          expect(res).to.have.status(201)

          expect(res.body).to.be.an('object')
          expect(res.body.product).to.be.an('object')
          expect(res.body.message).to.be.a('string')

          expect(res.body.product.name).to.be.a('string')
          expect(res.body.product.price).to.be.a('number')
          expect(res.body.product.qty).to.be.a('number')

          done()
        })
    })

    it('ERROR: unauthorized if not admin, should return error message 401:\'Unauthorized access!\'', function (done) {
      chai
        .request(app)
        .post('/products')
        .set('access_token', customerAccessToken)
        .send(dummyProduct)
        .end(function (err, res) {
          // console.log("ini response dari product add", res.body)
          expect(err).to.be.null
          expect(res).to.have.status(401)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })
  })

  describe('Get all products', function () {
    it('should return an array of objects, each with properties -> (name: string, price: integer, qty: integer)', function (done) {
      chai
        .request(app)
        .get('/products')
        .end(function (err, res) {
          // console.log("ini response dari product fetchAll", res.body)
          expect(err).to.be.null
          expect(res).to.have.status(200)

          expect(res.body).to.be.an('array')

          res.body.forEach(product => {
            expect(product.name).to.be.a('string')
            expect(product.price).to.be.a('number')
            expect(product.qty).to.be.a('number')
          })

          done()
        })
    })
  })

  describe('Find an item by id', function () {
    it('should return the searched product (name: string, price: integer, qty: integer)', function (done) {
      chai
        .request(app)
        .get('/products/' + currentItemId)
        .end(function (err, res) {
          // console.log("ini response dari product fetchOne", err, res.body)
          expect(err).to.be.null
          expect(res).to.have.status(200)

          expect(res.body).to.be.an('object')

          done()
        })
    })
    it('ERROR: when the item is not found, error message: \'Product not found!\'', function (done) {
      chai
        .request(app)
        .get('/products/' + 'non-existing product id')
        .end(function (err, res) {
          // console.log("ini response dari product fetchOne error", err, res.body)
          expect(err).to.be.null
          expect(res).to.have.status(404)

          expect(!res.body.product) || expect(res.body.product).to.be.empty

          done()
        })
    })
  })

  describe('Delete an item by id', function () {
    it('should return a success message: \'Successfully deleted a product!\'', function (done) {
      chai
        .request(app)
        .delete('/products/' + currentItemId)
        .end(function (err, res) {
          // console.log("ini response dari product delete", err, res.body)
          expect(err).to.be.null
          expect(res).to.have.status(200)

          expect(res.body).to.be.an('object')

          done()
        })
    })
    it('ERROR: when the item is not found, error message: \'Product not found!\'', function (done) {
      chai
        .request(app)
        .get('/products/' + 'non-existing product id')
        .end(function (err, res) {
          // console.log("ini response dari product fetchOne error", err, res.body)
          expect(err).to.be.null
          expect(res).to.have.status(404)

          expect(!res.body.product) || expect(res.body.product).to.be.empty

          done()
        })
    })
  })
})
