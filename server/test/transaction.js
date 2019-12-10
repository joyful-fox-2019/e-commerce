const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app.js')
const db = require('../models/transaction')
const dbUser = require('../models/user')
const dbProduct = require('../models/product')
const dbCart = require('../models/cart')
const dbTransaction = require('../models/transaction')
const { generateToken } = require('../helpers/jwt')

chai.use(chaiHttp)

let customer
let idCust
let admin
let idAdm
let product1
let product2
let cart1
let cart2
let id

describe.only('Transaction', function () {
  before(function (done) {
    this.timeout(5000)
    let dataAdm = {
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'password',
      role: 'admin'
    }
    let dataCust = {
      username: 'customer',
      email: 'customer@gmail.com',
      password: 'password'
    }
    let dataProduct1 = {
      name: 'Kulakas',
      category: 'Perabot',
      description: 'Kulkas 2 pintu',
      price: 10000,
      stock: 10,
      imgUrl: `https://storage.cloud.google.com/sigitarprasetyo/1573712932979_no-img.jpg`
    }
    let dataProduct2 = {
      name: 'Sepatu',
      category: 'Sepatu',
      description: 'Sepatu bagus',
      price: 10000,
      stock: 10,
      imgUrl: `https://storage.cloud.google.com/sigitarprasetyo/1573712932979_no-img.jpg`
    }
    function createAdmin() {
      return new Promise((resolve, reject) => {
        dbUser.create(
          dataAdm
        )
          .then(user => {
            let token = generateToken({ id: user._id })
            admin = { token }
            idAdm = user._id
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }

    function createCust() {
      return new Promise((resolve, reject) => {
        dbUser.create(
          dataCust
        )
          .then(user => {
            let token = generateToken({ id: user._id })
            customer = { token }
            idCust = user._id
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }

    function createProduct1() {
      return new Promise((resolve, reject) => {
        dbProduct.create(dataProduct1)
          .then(product => {
            product1 = product._id
            img1 = product.imgUrl
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }

    function createProduct2() {
      return new Promise((resolve, reject) => {
        dbProduct.create(dataProduct2)
          .then(product => {
            product2 = product._id
            img2 = product.imgUrl
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }

    function addToCart1() {
      return new Promise((resolve, reject) => {
        db.create({
          idUser: idCust,
          idProduct: product1,
          qty: 5
        })
          .then(cart => {
            cart1 = cart._id
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }

    function addToCart2() {
      return new Promise((resolve, reject) => {
        db.create({
          idUser: idCust,
          idProduct: product2,
          qty: 5
        })
          .then(cart => {
            cart2 = cart._id
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
    Promise.all([createAdmin(), createCust()])
      .then(() => {
        Promise.all([createProduct1(), createProduct2()])
      })
      .then(() => {
        Promise.all([addToCart1(), addToCart2()])
      })
      .then(() => {
        done()
      })
      .catch(err => {
        return Promise.all([dbProduct.deleteMany({}), dbUser.deleteMany({})])
      })
      .then(() => { }
      )
      .catch(err => {
        console(err)
      })
  })

  after(() => {
    // gcsDelete(img1)
    // gcsDelete(img2)
    // db.collection.deleteMany({})
    dbUser.collection.deleteMany({})
    dbProduct.collection.deleteMany({})
    dbCart.collection.deleteMany({})
    dbTransaction.collection.deleteMany({})
  })
  
  describe('Add-transaction', function () {
    // Success
    it('Should success checkout with status 201 without error', function (done) {
      chai.request(app)
        .post(`/transaction/checkout`)
        .set(customer, customer)
        .end((err, res) => {
          id = res.body._id
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.have.all.keys('_id', 'products', 'carts', '__v', 'status', 'owner', 'totalPrice', 'createdAt', 'updatedAt')
          expect(res.body.status).to.be.equal('Pending')
          done()
        })
    })

    // error = not Login
    it('Should Error checkout with status 400 and message You are not Authentication!', function (done) {
      chai.request(app)
        .post(`/transaction/checkout`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.equal('You are not authentication!')
          done()
        })
    })
  })

  describe('Get transactiton Customer', function () {
    // Succes get transaction
    it('Should success get transaction with status 200', function (done) {
      chai.request(app)
        .get(`/transaction`)
        .set(customer, customer)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.have.all.keys('_id', '__v', 'products', 'carts', 'status', 'owner', 'totalPrice', 'createdAt', 'updatedAt')
          expect(res.body[0].products).to.be.an('array')
          expect(res.body[0].carts).to.be.an('array')
          expect(res.body[0].owner).to.be.an('object')
          done()
        })
    })

    // error = not Login
    it('Should Error get transaction with status 400 and message You are not Authentication!', function (done) {
      chai.request(app)
        .post(`/transaction`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.equal('You are not authentication!')
          done()
        })
    })
  })

  describe('Get transaction Admin', function () {
    // Succes get transaction
    it('Should success get transaction with status 200', function (done) {
      chai.request(app)
        .get(`/transaction/adm`)
        .set(admin, admin)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.have.all.keys('_id', '__v', 'products', 'carts', 'createdAt', 'status' , 'updatedAt')
          expect(res.body[0].products).to.be.an('array')
          expect(res.body[0].carts).to.be.an('array')
          done()
        })
    })

    // error = not Authentication
    it('Should Error get transaction with status 400 and message You are not Authentication!', function (done) {
      chai.request(app)
        .post(`/transaction`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.equal('You are not authentication!')
          done()
        })
    })
  })

  describe('Edit status', function () {
    // Succes edit status
    it(`Should succes with status 200 without error`, function (done) {
      let body = {
        status: 'On Proccess'
      }
      chai.request(app)
        .patch(`/transaction/${id}/update`)
        .send(body)
        .set(customer, customer)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body.status).to.be.equal('On Proccess')
          done()
        })
    })

    // error = not Authentication
    it('Should Error update status with status 400 and message You are not Authentication!', function (done) {
      let body = {
        status: 'On Proccess'
      }
      chai.request(app)
        .patch(`/transaction/${id}/update`)
        .send(body)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.equal('You are not authentication!')
          done()
        })
    })
  })

  describe(`Delete Transaction`, function () {
    // Success
    it(`Should succes delete transaction with status 200`, function (done) {
      chai.request(app)
        .delete(`/transaction/${id}/delete`)
        .set(customer, customer)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body).to.have.all.keys('n', 'ok', 'deletedCount')
          expect(res.body.ok).to.be.equal(1)
          expect(res.body.deletedCount).to.be.equal(1)
          done()
        })
    })

    // error = not Authentication
    it('Should Error update status with status 400 and message You are not Authentication!', function (done) {
      let body = {
        status: 'On Proccess'
      }
      chai.request(app)
        .delete(`/transaction/${id}/delete`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.equal('You are not authentication!')
          done()
        })
    })
  })
})