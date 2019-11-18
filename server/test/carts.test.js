const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')

const generateToken = require('../helpers/generateToken')

const expect = chai.expect
chai.use(chaiHttp)

let currentAccessToken = 'initialvalue'
let currentProductId = 'initialId'

let falseProductId = '5dca8ec2d156447b4d42cc24'
let prevQty = 5

describe('CRUD cart routes', function () {
  // console.log('masuk hooks');
  before(function (done) {
    User.create({
      name: 'initial',
      email: 'initial@mail.com',
      password: '12345678'
    })
      .then((user) => {
        // console.log('dapet user', user);
        let payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
        currentAccessToken = generateToken(payload)
        // console.log('ini current access token', currentAccessToken);
        return Product.create({ name: 'Apple Watch', price: 7850000, qty: 9 })
      })
      .then(product => {
        // console.log('ini productId di before CRUD cart routes', product._id);
        currentProductId = product._id
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

  describe('add a product to cart > POST /carts', function () {
    this.timeout(5000)

    it('should return the newly added item (productId: ObjectId, userId: ObjectId, qty: number) with the message: \'Successfully added item(s) to the cart!\'', function (done) {
      // console.log('ini access token sekarang di crud cart routes', currentAccessToken);
      chai
        .request(app)
        .post(`/carts/${currentProductId}/${prevQty}`)
        .set('access_token', currentAccessToken)
        .end(function (err, res) {
          // console.log("1 >>> ini response dari product add", JSON.stringify(res.body, null, 2))
          // console.log("ini response dari product add", res.body);
          prevQty = res.body.cart.products[res.body.cart.products.length - 1].qty
          expect(err).to.be.null
          expect(res).to.have.status(201)

          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.a('string')

          expect(res.body.cart).to.be.an('object')
          expect(res.body.cart.products).to.be.an('array')

          done()
        })
    })

    it('should return the previously added item with updated quantity when the item id already existed in the cart', function (done) {
      const newQty = 2

      chai
        .request(app)
        .post(`/carts/${currentProductId}/${newQty}`)
        .set('access_token', currentAccessToken)
        .end(function (err, res) {
          // console.log('ini currentProductId', currentProductId);
          // console.log("2 >>> ini response dari product add", JSON.stringify(res.body, null, 2))
          expect(err).to.be.null
          expect(res).to.have.status(201)

          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('message', 'cart')

          expect(res.body.message).to.be.a('string')
          expect(res.body.cart).to.be.an('object')
          expect(res.body.cart).to.have.any.keys('_id', 'userId', 'products')

          expect(res.body.cart.products[res.body.cart.products.length - 1].qty).to.eql(prevQty + newQty)

          done()
        })
    })

    it('ERROR: item not found, should return an error message \'Product not found!\'', function (done) {
      chai
        .request(app)
        .post(`/carts/${falseProductId}/${prevQty}`)
        .set('access_token', currentAccessToken)
        .end(function (err, res) {
          // console.log('ini res body pas expected 404', JSON.stringify(res.body, null, 2));
          expect(err).to.be.null
          expect(res).to.have.status(404)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })

    it('ERROR: requested quantity of products is unavailable, should return an error message \'The quantity of products you requested exceeded our stock!\'', function (done) {
      chai
        .request(app)
        .post(`/carts/${currentProductId}/100`)
        .set('access_token', currentAccessToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(400)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })
  })

  describe('fetch user\'s cart > GET /carts', function () {
    it ('should return a cart populated with products', function(done) {
      chai
        .request(app)
        .get('/carts')
        .set('access_token', currentAccessToken)
        .end(function (err, res) {
          // console.log('ini response fetch user\'s cart', JSON.stringify(res.body, null, 2));
          expect(err).to.be.null
          expect(res).to.have.status(200)

          expect(res.body).to.be.an('object')
          expect(res.body.cart).to.be.an('object')

          done()
        })
    })

    it ('ERROR: unauthorized, should return this when the user has no access token', function(done) {
      chai
        .request(app)
        .get('/carts')
        .end(function (err, res) {
          // console.log('ini res body pas error unauthorized', res.body);
          expect(err).to.be.null
          expect(res).to.have.status(401)

          expect(res.body).to.be.an('object')
          expect(res.body.messages).to.be.an('array')

          done()
        })
    })
  })

  describe('update product\'s quantity in cart > PATCH /carts/')
})
