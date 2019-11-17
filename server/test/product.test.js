const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const Product = require('../models/product')
const User = require('../models/user')

chai.use(chaiHttp)

let productId = ''
let newProduct = {
    name: 'Keripik',
    price: 10000,
    stock: 10,
    description: 'keripik kentang tanpa MSG tanpa pengawet'
}
let token = ''
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
            console.log('delete success')
            done()
        })
        .catch(err => {
            console.log(err)
        })
})
describe('CRUD Products', function () {
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
    describe('Get all products', function () {
        describe('success', function () {
            it('Should return status 200 with array data as a return', function (done) {
                chai
                    .request(app)
                    .get('/products/')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body.products).to.be.an('array')
                        done()
                    })
            })
        })
    })
    describe('Create a product', function () {
        describe('success', function () {
            // Harus sudo service mongod start lalu LANGSUNG jalanin test baru bisa success (entah kenapa ... ?)
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
                        productId = res.body.product._id
                        done()
                    })
            })
        })
        describe('error', function () {
            it('Should return status 400 because empty image field', function (done) {
                chai
                    .request(app)
                    .post('/products/')
                    .set('token', token)
                    .field({
                        name: 'Keripik',
                        price: 10000,
                        stock: 10,
                        description: 'keripik kentang tanpa MSG tanpa pengawet'
                    })
                    // .attach('image', '../../Screenshot from 2019-08-10 18-00-50.png')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
            it('Should return status 400 because empty name field', function (done) {
                chai
                    .request(app)
                    .post('/products/')
                    .set('token', token)
                    .field({
                        price: 10000,
                        stock: 10,
                        description: 'keripik kentang tanpa MSG tanpa pengawet'
                    })
                    .attach('image', '../../Screenshot from 2019-08-10 18-00-50.png')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
            it('Should return status 400 because empty price field', function (done) {
                chai
                    .request(app)
                    .post('/products/')
                    .set('token', token)
                    .field({
                        name: 'Keripik',
                        stock: 10,
                        description: 'keripik kentang tanpa MSG tanpa pengawet'
                    })
                    .attach('image', '../../Screenshot from 2019-08-10 18-00-50.png')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
            it('Should return status 400 because empty stock field', function (done) {
                chai
                    .request(app)
                    .post('/products/')
                    .set('token', token)
                    .field({
                        name: 'Keripik',
                        price: 10000,
                        description: 'keripik kentang tanpa MSG tanpa pengawet'
                    })
                    .attach('image', '../../Screenshot from 2019-08-10 18-00-50.png')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
            it('Should return status 400 because empty description field', function (done) {
                chai
                    .request(app)
                    .post('/products/')
                    .set('token', token)
                    .field({
                        name: 'Keripik',
                        price: 10000,
                        stock: 10
                    })
                    .attach('image', '../../Screenshot from 2019-08-10 18-00-50.png')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
            it('Should return status 400 because validation failed on price field', function (done) {
                chai
                    .request(app)
                    .post('/products/')
                    .set('token', token)
                    .field({
                        name: 'Keripik',
                        price: 1,
                        stock: 10
                    })
                    .attach('image', '../../Screenshot from 2019-08-10 18-00-50.png')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
            it('Should return status 400 because validation failed on stock field', function (done) {
                chai
                    .request(app)
                    .post('/products/')
                    .set('token', token)
                    .field({
                        name: 'Keripik',
                        price: 10000,
                        stock: -1
                    })
                    .attach('image', '../../Screenshot from 2019-08-10 18-00-50.png')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
            it('Should return status 400 because validation failed on name field', function (done) {
                chai
                    .request(app)
                    .post('/products/')
                    .set('token', token)
                    .field({
                        name: 'Keripik3030',
                        price: 10000,
                        stock: 10
                    })
                    .attach('image', '../../Screenshot from 2019-08-10 18-00-50.png')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
        })
    })
    describe('Edit product', function () {
        describe('success', function () {
            it('Should return status 200 after updating product data', function (done) {
                chai
                    .request(app)
                    .put(`/products/${productId}`)
                    .set('token', token)
                    .field({
                        name: 'coba',
                        price: 20000,
                        stock: 2,
                        description: 'waduh'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body.product).to.be.an('object')
                        done()
                    })
            })
        })
        describe('error', function () {
            it('Should return status 403 because accessing site without token', function (done) {
                chai
                    .request(app)
                    .put(`/products/${productId}`)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
        })
    })
    describe('Delete product', function () {
        describe('success', function () {
            it('Should return status 200 after deleting product data', function (done) {
                chai
                    .request(app)
                    .delete(`/products/${productId}`)
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body.product).to.be.an('object')
                        done()
                    })
            })
        })
        describe('error', function () {
            it('Should return status 403 because accessing site without token', function (done) {
                chai
                    .request(app)
                    .delete(`/products/${productId}`)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body).to.be.an('object')
                        done()
                    })
            })
        })
    })
})