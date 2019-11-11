const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const Product = require('../models/product')

chai.use(chaiHttp)

let productId = ''
let newProduct = {
    name: 'Keripik',
    price: 10000,
    stock: 10
}
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzk2NGFhOWZlOTZkNDU5N2U4NGJjZCIsImlhdCI6MTU3MzQ3OTU5NSwiZXhwIjoxNTczNTY1OTk1fQ.eTCixQaKe_U1wbY_cjYb5l9zmBYpqJEfSBGaD266NHg'

after(function (done) {
    Product.deleteMany({})
        .then(_ => {
            console.log('delete success')
            done()
        })
        .catch(err => {
            console.log(err)
        })
})
describe('CRUD Products', function () {
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
            // Kadang bisa kadang gabisa.....???
            // https://storage.googleapis.com/image-upload-miniwp/1573482052410Screenshot from 2019-11-02 11-55-05.png
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
                        stock: 10
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
            it('Should return status 400 because empty price field', function (done) {
                chai
                    .request(app)
                    .post('/products/')
                    .set('token', token)
                    .field({
                        name: 'Keripik',
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
            it('Should return status 400 because empty stock field', function (done) {
                chai
                    .request(app)
                    .post('/products/')
                    .set('token', token)
                    .field({
                        name: 'Keripik',
                        price: 10000,
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
                        stock: 2
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
                        expect(res.body.message).to.be.an('object')
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
                        expect(res.body.message).to.be.an('object')
                        done()
                    })
            })
        })
    })
})