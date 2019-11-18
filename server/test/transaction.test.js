require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http')
const User = require('../models/user')
const { genToken } = require('../helpers/jwt')
const Transaction = require('../models/transaction')
const Product = require('../models/product')
const app = require('../app')

const expect = chai.expect
chai.use(chaiHttp)

let adminToken = ''
let customerToken = ''
let productId1 = ""

let admin = {
  username: 'admin2',
  email: 'admin2@admin.com',
  password: 'admin123',
  role: 'admin'
}

let customer = {
  username: 'customer2',
  email: 'cust2@omer.com',
  password: 'customer123'
}

let productInfo = {
  name: 'produk baru',
  stock: 1,
  price: 12345,
  image: 'https://image.shutterstock.com/image-photo/beautiful-water-drop-on-dandelion-260nw-789676552.jpg'
}

let trxId =''

before(function (done) {
  User.create(admin)
    .then(adm => {
      adminToken = genToken({ id: adm._id, role: adm.role })
      console.log('admin created for trx test');
      return User.create(customer)
    })
    .then(cust => {
      customerToken = genToken({ id: cust._id, role: cust.role })
      console.log('customer created for trx test');
      return Product.create(productInfo)
    })
    .then(prod => {
      productId1 = prod._id
      console.log('product created for trx test');
      return Transaction.create({ items: [{ product: productId1, qty: 1 }]})
    })
    .then(trx => {
      trxId = trx._id
      console.log(('transaction created for trx test'));
      done()
    })
    .catch(console.log)
})

after (function (done) {
  // if (process.env.NODE.ENV === 'testing') {
    User.deleteMany()
      .then(() => {
        console.log('initial user deleted for trx test')
        return Transaction.deleteMany()
      })
      .then(() => {
        console.log('initial transaction deleted for trx test')
        done()
      })
      .catch(console.log)
  // }
})

describe('Transaction Test', function () {
  describe('POST /transactions', function () {
    it('should return Object of (message) with status 200 when successfully created transaction', function (done) {
      chai
        .request(app)
        .post('/transactions')
        .send({
          items: [{ product: productId1, qty: 1 }],
        })
        .set('token', customerToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('message', 'user')
          expect(res.body.message).to.equal('Successfully checkout')
          done()
        })
    })
    it('should return Object of (message) with status 400 when token is not set', function (done) {
      chai
        .request(app)
        .post('/transactions')
        .send({
          items: [{ product: productId1, qty: 1 }]
        })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('You must login first')
          done()
        })
    })
  })
  describe('PATCH /transactions:id', function () {
    it('should return object of (message) with status 200 when successfully update', function (done) {
      chai
        .request(app)
        .patch(`/transactions/${trxId}`)
        .send({ status: 'paid'})
        .set('token', adminToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('Successfully updated transaction')
          done()
        })
    })
    it('should return objec of (message) with status 401 when token is not set',function (done) {
      chai
      .request(app)
      .patch(`/transactions/${trxId}`)
      .send({ status: 'paid'})
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(401)
        expect(res.body).to.be.an('object').to.have.any.keys('message')
        expect(res.body.message).to.equal('You must login first')
        done()
      })
    })
    it('should return object of (message) with status 403 when user is neither the owner nor admin', function (done) {
      chai
      .request(app)
      .patch(`/transactions/${trxId}`)
      .send({ status: 'paid'})
      .set('token', customerToken)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(403)
        expect(res.body).to.be.an('object').to.have.any.keys('message')
        expect(res.body.message).to.equal('Authorization failed')
        done()
      })
    })
  })
  describe('GET /transactions/:id', function () {
    it('should return object of (transaction) with status 200 when successful', function (done) {
      chai
      .request(app)
      .get(`/transactions/${trxId}`)
      .send({ status: 'paid'})
      .set('token', adminToken)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object').to.have.any.keys('_id', 'createdAt', 'updatedAt', 'status', 'items')
        done()
      })
    })
    it('should return object of (message) with status 403 when neither admin nor the owner', function (done) {
      chai
      .request(app)
      .get(`/transactions/${trxId}`)
      .send({ status: 'paid'})
      .set('token', customerToken)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(403)
        expect(res.body).to.be.an('object').to.have.any.keys('message')
        expect(res.body.message).to.equal('Authorization failed')
        done()
      })
    })
    it('should return object of (message) with status 401 when not logged in', function (done) {
      chai
      .request(app)
      .get(`/transactions/${trxId}`)
      .send({ status: 'paid'})
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(401)
        expect(res.body).to.be.an('object').to.have.any.keys('message')
        expect(res.body.message).to.equal('You must login first')
        done()
      })
    })
  })
  describe('GET /transactions', function () {
    it('should return an array of object (transactions) with status 200 when successful', function (done) {
      chai
        .request(app)
        .get('/transactions')
        .set('token', adminToken)
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
    })
    it('should return an object of (message) with status 401 when not logged in', function (done) {
      chai
        .request(app)
        .get('/transactions')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.equal('You must login first')
          done()
        })
    })
  })
})