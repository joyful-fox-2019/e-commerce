const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const db = require('../models/cart')
const dbUser = require('../models/user')
const dbProduct = require('../models/product')
const gcsDelete = require('../helpers/gscDeleteFile')
const fs = require('fs')
const { generateToken } = require('../helpers/jwt')
chai.use(chaiHttp)

let customer
let admin
let product1
let product2
let img1
let img2
let id

describe('Cart', function () {
  before(function (done) {
    this.timeout(6000)
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
      stock: 0,
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

    Promise.all([createAdmin(), createCust()])
      .then(() => {
        Promise.all([createProduct1(), createProduct2()])
      })
      .then(() => {
        done()
      })
      .catch(err => {
        console(err)
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
    db.collection.deleteMany({})
    dbUser.collection.deleteMany({})
    dbProduct.collection.deleteMany({})
  })

  describe('add-cart', function () {
    // Success add cart
    it(`Should success add product to cart with status 201`, function (done) {
      chai.request(app)
        .post(`/carts/${product1}/add-to-cart`)
        .set(customer, customer)
        .send({ qty: 1 })
        .end((err, res) => {
          id = res.body._id
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys("_id", "idUser", "idProduct", "qty", "status")
          expect(res.body.idProduct).to.be.equal(`${product1}`)
          expect(res.body.qty).to.be.equal(1)
          done()
        })
    })

    // Error: quantity 0
    it(`Should error with status 400 and message Cannot buy product without quantity!`, function (done) {
      chai.request(app)
        .post(`/carts/${product1}/add-to-cart`)
        .set(customer, customer)
        .send({ qty: 0 })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.equal('Cannot buy product without quantity!')
          done()
        })
    })

    // Error : quantity more then product stock
    it(`Should error with status 400 and message Sorry you are cannot buy product more then product stock!!`, function (done) {
      chai.request(app)
        .post(`/carts/${product1}/add-to-cart`)
        .set(customer, customer)
        .send({ qty: 20 })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.equal('Sorry you are cannot buy product more then product stock!!')
          done()
        })
    })

    // Error: Product out of stock
    it(`Should error with status 400 and message Sorry this product out of stock!`, function (done) {
      chai.request(app)
        .post(`/carts/${product2}/add-to-cart`)
        .set(customer, customer)
        .send({ qty: 20 })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.equal('Sorry this product out of stock!')
          done()
        })
    })

    // Error: not authentication
    it(`Should error with status 400 and message You are not Authentication`, function (done) {
      chai.request(app)
        .post(`/carts/${product2}/add-to-cart`)
        .send({ qty: 1 })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.equal('You are not authentication!')
          done()
        })
    })

    // Error: Not authorization
    it(`Should error with status 400 and message You are not Authorized!`, function (done) {
      chai.request(app)
        .post(`/carts/${product2}/add-to-cart`)
        .set(admin, admin)
        .send({ qty: 1 })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.equal('You are not Authorized!')
          done()
        })
    })
  })

  // Show carts
  describe('Show Carts', function () {
    // Succes show carts
    it(`Should success show carts user with status 200 and get data carts`, function (done) {
      chai.request(app)
        .get('/carts')
        .set(customer, customer)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          res.body.forEach(el => {
            expect(el).to.be.an('object')
            expect(el).to.have.all.keys(
              "_id", "idUser", "idProduct", "qty", "status"
            )
            expect(el.idProduct).to.be.an("object")
          })
          done()
        })
    })

    // Error: Not authentication $ authorization
    it(`Should error with status 400 and message You are not authentication!`, function (done) {
      chai.request(app)
        .get('/carts')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.equal('You are not authentication!')
          done()
        })
    })
  })

  // Delete Product from carts
  describe('Delete product from carts', function () {
    // Error: Not authentication
    it(`Should error with status 400 and message You are not authentication!`, function (done) {
      chai.request(app)
        .delete(`/carts/${id}/delete`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.equal('You are not authentication!')
          done()
        })
    })

    // Error: not authorization
    it(`Should error with status 400 and message ypu are not authorization`, function (done) {
      chai.request(app)
        .delete(`/carts/${id}/delete`)
        .set(admin, admin)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body).to.be.equal('You are not Authorized!')
          done()
        })
    })

    // Success Delete product from carts
    it(`Should success delete product with status 200`, function (done) {
      chai.request(app)
        .delete(`/carts/${id}/delete`)
        .set(customer, customer)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          done()
        })
    })
  })
})