const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const { ObjectID } = require('mongodb')

chai.use(chaiHttp)
const expect = chai.expect

let customerToken = null
let transactionId = null

// Create User Account to Database
before(function (done) {
  const customerData = {
    name: 'Luky Winata',
    email: 'lukywinata@email.com',
    password: '12345',
    isAdmin: false,
    city: ' Jakarta'
  }
  User.create(customerData)
    .then(users => {
      console.log('testing: success create initial user')
      done()
    })
    .catch(console.log)
})

// Clear Database After Testing
after(function (done) {
  if (process.env.NODE_ENV === 'testing') {
    let promises = [User.deleteMany({}), Transaction.deleteMany({})]
    Promise.all(promises)
      .then(() => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
  }
})

describe('Give Access Token to Customer for Testing', function () {
  it('should give status 200 and access token to customer', function (done) {
    let user = {
      'email': 'lukywinata@email.com',
      'password': '12345',
    }
    chai
      .request(app)
      .post('/users/login')
      .send(user)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        customerToken = res.body.access_token
        done();
      })
  })
})

describe('Transaction Routes', function () {
  describe('POST /transaction', function () {
    context('-----Success Process-----', function () {
      it('should response with status 201 and give transaction data', function (done) {
        chai
          .request(app)
          .post('/transactions')
          .set('access_token', customerToken)
          .send({
            productsList: [ObjectID('8cb8c8881888fb88ada88888'), ObjectID('8cb8c8881888fb88ada88888')],
            totalCost: 1000000,
            status: 'booked'
          })
          .end(function (err, res) {
            transactionId = res.body._id;
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.any.keys("UserId", "productsList", "totalCost", "status")
            done()
          })
      })
    })
    context('-----Error Process-----', function () {
      it('should failed to give authorized because user was not logged in', function (done) {
        chai
          .request(app)
          .post('/transactions')
          .send({
            productsList: [ObjectID('8cb8c8881888fb88ada88888'), ObjectID('8cb8c8881128fb88ada88888')],
            totalCost: 1000000,
            status: 'booked'
          })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('jwt must be provided')
            done()
          })
      })
    })
  })
  describe('GET /transactions', function () {
    context('-----Success Process-----', function () {
      it('should give status 200 and response with user transaction data', function (done) {
        chai
          .request(app)
          .get("/transactions")
          .set('access_token', customerToken)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array")
            res.body.forEach(element => {
              expect(element).to.have.any.keys("UserId", "productsList", "totalCost", "status")
            });
            done()
          });
      })
    })
    context('-----Error Process-----', function () {
      it('should failed to give authorized because user was not logged in', function (done) {
        chai
          .request(app)
          .get("/transactions")
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('jwt must be provided')
            done()
          });
      })
    })
  })
  describe('UPDATE /transactions/id', function () {
    context('-----Success Process-----', function () {
      it('success updated with code 200', function (done) {
        chai
          .request(app)
          .patch(`/transactions/${transactionId}`)
          .set('access_token', customerToken)
          .send({
            productsList: [ObjectID('8cb8c8881888fb88ada88888'), ObjectID('8cb8c8881128fb88ada88888')],
            totalCost: 1000000,
            status: 'paid'
          })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.any.keys("UserId", "product", "quantity", "isCheckout")
            done()
          })
      })
    })
    context('-----Error Process-----', function () {
      it('should failed to give authorized because user was not logged in', function (done) {
        chai
          .request(app)
          .post('/transactions')
          .send({
            productsList: [ObjectID('8cb8c8881888fb88ada88888'), ObjectID('8cb8c8881128fb88ada88888')],
            totalCost: 1000000,
            status: 'paid'
          })
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('jwt must be provided')
            done()
          })
      })
    })
  })
})