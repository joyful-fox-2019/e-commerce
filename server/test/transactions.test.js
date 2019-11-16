const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')
const { generateToken } = require('../helpers/jwt')

chai.use(chaiHttp)
const expect = chai.expect

let initialProduct = {}
let initialToken = ''
let transactionId = ''

let newProduct = {
  name: "Something2",
  price: 300000,
  qty: 12,
  imgUrl: 'https://storage.googleapis.com/dipaecommerce/1573610531954-death-stranding-logo-600x337.jpg'
}

before(async () => {
  try{
    let productData = await Product.create({
      name: "Something",
      price: 200000,
      qty: 10,
      imgUrl: 'https://storage.googleapis.com/dipaecommerce/1573610531954-death-stranding-logo-600x337.jpg'
    })
    let user = await User.create({
      name: 'customer2',
      email: 'customer22@gmail.com',
      password: '123456',
      role: 'customer',
      cart: [{
        "_id": "5dcfb7f64cc7d03f10e93592",
        "ProductId": productData._id,
        "amount": 3,
        "ProductName": "Game death stranding 2",
        "ProductPrice": 800000
      }]
    })
    initialUserId = user._id
    initialToken = generateToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    })
    initialProduct = productData
  }
  catch(err){
    console.log(err)
  }
})

after(function(done) {
  if(process.env.NODE_ENV === 'testing') {
    Product.deleteMany({})
      .then(_ => {
        console.log('testing: delete data product success!')
        return User.deleteMany({})
      })
      .then(_ => {
        console.log('testing: delete data user success!')
        done()
      })
      .catch(console.log)
  }
})

describe('Transaction Routes', () => {

  describe('POST /transactions', () => {
    describe('Success transaction', () => {
      it('Should return object with 200 status code', (done) => {
        chai.request(app)
        .post(`/transactions`)
        .set('access_token',initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          transactionId = res.body._id
          done()
        })
      })
    })
    describe('Fail transaction', () => {
      it('Should return (message) with 400 status code if empty cart', (done) => {
        chai.request(app)
        .post(`/transactions`)
        .set('access_token',initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('string')
          done()
        })
      })
      it('Should return (message) with 400 status code if qty less', (done) => {
        initialProduct.qty = 2 
        chai.request(app)
        .post(`/transactions`)
        .set('access_token',initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('string')
          done()
        })
      })
    })

  })

  describe('GET /transactions', () => {
    describe('Success get transaction data', () => {
      it('Should return array with 200 status code', (done) => {
        chai.request(app)
        .get(`/transactions`)
        .set('access_token',initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
      })
    })
    describe('Succes get one transaction data', () => {
      it('Should return object with 200 status code', (done) => {
        chai.request(app)
        .get(`/transactions/mytransaction`)
        .set('access_token',initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
      })
    })
  })

  describe('PATCH /transactions/:_id', () => {
    describe('Success change status', () => {
      it('Should return object with 200 status code', (done) => {
        chai.request(app)
        .patch(`/transactions/${transactionId}`)
        .set('access_token',initialToken)
        .end((err,res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object').to.have.any.keys('message')
          expect(res.body.message).to.be.an('string').to.equal('Successfuly confirmed')
          done()
        })
      })
    })
  })

})