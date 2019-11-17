const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app.js')
const db = require('../models/transaction')
const dbUser = require('../models/user')
const dbProduct = require('../models/product')
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

describe('Transaction', function () {
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
    // db.collection.deleteMany({})
    dbUser.collection.deleteMany({})
    dbProduct.collection.deleteMany({})
  })
  
  describe('Add-transaction', function () {
    // console.log(cart2);
    // Success
    it('Should success checkout with status 201 without error', function (done) {
      chai.request(app)
        .post(`/transaction/checkout`)
        .set(customer, customer)
        .end((err, res) => {
          // console.log(res.body);
          done()
        })
    })
  })
})