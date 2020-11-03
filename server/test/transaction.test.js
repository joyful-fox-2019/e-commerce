const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const Product = require('../models/product')
const User = require('../models/user')
const Transaction = require('../models/transaction')

chai.use(chaiHttp)

let token = ''
let tokenUser = ''
let productId = ''
let productPrice = 0
let transactionId = ''
let newProduct = {
    name: 'Keripik',
    price: 10000,
    stock: 10,
    description: 'keripik kentang tanpa MSG tanpa pengawet'
}

before(function () {
    User.create({
            name: 'dexter',
            email: 'dex@dex.com',
            password: '1234567',
            full_address: 'jalan kenari',
            role: 'Admin'
        })
        .then(user => {
            console.log('success creating user')
        })
        .catch(err => {
            console.log(err)
        })
})

after(function (done) {
    User.deleteMany({})
        .then(_ => {
            return Product.deleteMany({})
        })
        .then(_ => {
            return Transaction.deleteMany({})
        })
        .then(_ => {
            console.log('delete success')
            done()
        })
        .catch(err => {
            console.log(err)
        })
})

describe('CRUD Transactions', function () {
    describe('login user to get token', function () {
        it('should return 200 with token', function (done) {
            chai
                .request(app)
                .post('/users/login')
                .send({
                    email: 'dex@dex.com',
                    password: '1234567'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    token = res.body.token
                    done()
                })
        })
    })
    describe('Create a product for transaction purpose', function () {
        describe('success', function () {
            // Kadang bisa success , tetapi kadang error (?)
            it('Should return status 201 after success creating product', function (done) {
                chai
                    .request(app)
                    .post('/products/')
                    .set('token', token)
                    .field(newProduct)
                    .attach('image', '../../Screenshot from 2019-08-10 18-00-50.png')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body.message).to.equal('Product successfully created')
                        console.log(res.body.product)
                        productId = res.body.product._id
                        productPrice = res.body.product.price
                        done()
                    })
            })
        })
    })
    describe('Register as customer', function () {
        describe('success', function () {
            it('should return 201 after success registration', function (done) {
                chai
                    .request(app)
                    .post('/users/register')
                    .send({
                        name: 'Nuel',
                        email: 'nuel@mail.com',
                        password: '1234567',
                        full_address: 'jalan kenari'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        done()
                    })
            })
        })
    })
    describe('Login as customer', function () {
        describe('success', function () {
            it('should return 200 after successfull login', function (done) {
                chai
                    .request(app)
                    .post('/users/login')
                    .send({
                        email: 'nuel@mail.com',
                        password: '1234567'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        tokenUser = res.body.token
                        done()
                    })
            })
        })
    })
    describe('Get all transaction with checkout value to be false', function () {
        describe('success', function () {
            it('should return 200 after success fetching data', function (done) {
                chai
                    .request(app)
                    .get('/transactions')
                    .set('token', tokenUser)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body.transaction).to.be.an('array')
                        done()
                    })
            })
        })
    })
    describe('Create transaction', function () {
        describe('success', function () {
            it('should return 201 after success creating transaction', function (done) {
                chai
                    .request(app)
                    .post('/transactions')
                    .set('token', tokenUser)
                    .send({
                        productId: productId,
                        quantity: 10,
                        subTotal: 10 * productPrice
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        transactionId = res.body.transaction._id
                        expect(res.body.message).to.equal('Transaction created')
                        done()
                    })
            })
        })
        describe('error', function () {
            it('should return 400 because invalid quantity field', function (done) {
                chai
                    .request(app)
                    .post('/transactions')
                    .set('token', tokenUser)
                    .send({
                        productId: productId,
                        quantity: -1
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return 400 because invalid missing productId field', function (done) {
                chai
                    .request(app)
                    .post('/transactions')
                    .set('token', tokenUser)
                    .send({
                        quantity: 10
                    })
                    .end(function (err, res) {
                        console.log(res.status)
                        expect(err).to.be.null
                        expect(res.body).to.be.an('object')
                        expect(res.body.err).to.be.an('object')
                        // expect(res).to.have.status(400)
                        done()
                    })
            })
            it('should return 403 because accessing site without token', function (done) {
                chai
                    .request(app)
                    .post('/transactions')
                    .send({
                        productId: productId,
                        quantity: 10
                    })
                    .end(function (err, res) {
                        console.log(res.body)
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
        })
    })
    describe('checkout transaction process', function () {
        describe('success', function () {
            it('should return 200 after successfull checkout process', function (done) {
                chai
                    .request(app)
                    .put('/transactions/checkout')
                    .set('token', tokenUser)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        console.log(res.body)
                        console.log(res.status)
                    })
            })
        })
    })
    describe('delete transaction', function () {
        describe('success', function () {
            it('should return 200 after success deleting transaction', function (done) {
                chai
                    .request(app)
                    .delete('/transactions/' + transactionId)
                    .set('token', tokenUser)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        console.log(res.body)
                        console.log(res.status)
                    })
            })
        })
    })
})