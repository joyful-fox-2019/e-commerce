const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')

chai.use(chaiHttp)
const expect = chai.expect

before(function (done) {
    const data = {
        username: 'testing',
        email: 'testing@localhost.com',
        password: '12345'
    }
    User.create(data)
        .then(user => {
            console.log('before: create user success')
            done()
        })
        .catch(console.log)
})

after(function (done) {
    if (process.env.NODE_ENV === 'testing') {
        User.deleteMany({})
            .then(() => {
                console.log('after: delete user success')
                done()
            })
            .catch(console.log)
    }
    if (process.env.NODE_ENV === 'testing') {
        Product.deleteMany({})
            .then(() => {
                console.log('after: delete products success')
                done()
            })
            .catch(console.log)
    }
})

let userToken = null
let productId = null

describe('Product Routes', function () {
    it('status 200 and token to user', function (done) {
        let user = {
            email: 'testing@localhost.com',
            password: '12345'
        }
        chai
            .request(app)
            .post('/login')
            .send(user)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                userToken = res.body.token
                done();
            })
    })
    describe('POST /products', function () {
        context('Success Response', function () {
            it('should response with status 201 and give product data', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('token', userToken)
                    .send({
                        title: 'Monhun',
                        description: 'Monhun desc',
                        file: 'imageurl',
                        price: 20000,
                        stock: 20,
                        genre: 'casual'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(201);
                        expect(res.body.message).to.equal('product added');
                        done()
                    })
            })
        })
        context('Errors Response', function () {
            it('error because user need to log in first', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('token', "")
                    .send({
                        title: "Bloodborne",
                        description: 'Bloodborne desc',
                        file: 'imageurl',
                        price: 20000,
                        stock: 20,
                        genre: 'casual'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(403);
                        expect(res.body.message).to.equal('Please login first')
                        done()
                    })
            })
            it('error because of empty title', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('token', userToken)
                    .send({
                        title: "",
                        description: 'Bloodborne desc',
                        file: 'imageurl',
                        price: 20000,
                        stock: 20,
                        genre: 'casual'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(400);
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array').that.includes('Please enter product title')
                        done()
                    })
            })
            it('error because of empty description', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('token', userToken)
                    .send({
                        title: "Bloodborne",
                        description: '',
                        file: 'imageurl',
                        price: 20000,
                        stock: 20,
                        genre: 'casual'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(400);
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array').that.includes('Please enter product description')
                        done()
                    })
            })
            it('error because of empty image', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('token', userToken)
                    .send({
                        title: "Bloodborne",
                        description: 'Bloodborne desc',
                        file: '',
                        price: 20000,
                        stock: 20,
                        genre: 'casual'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(400);
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array').that.includes('Please enter product image')
                        done()
                    })
            })
            it('error because of empty price', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('token', userToken)
                    .send({
                        title: "Bloodborne",
                        description: 'Bloodborne desc',
                        file: 'imageurl',
                        price: null,
                        stock: 20,
                        genre: 'casual'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(400);
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array').that.includes('Please enter product price')
                        done()
                    })
            })
            it('error because of negative price', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('token', userToken)
                    .send({
                        title: "Bloodborne",
                        description: 'Bloodborne desc',
                        file: 'imageurl',
                        price: -69,
                        stock: 20,
                        genre: 'casual'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(400);
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array').that.includes('Price can not be negative')
                        done()
                    })
            })
            it('error because of empty stock', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('token', userToken)
                    .send({
                        title: "Bloodborne",
                        description: 'Bloodborne desc',
                        file: 'imageurl',
                        price: 20000,
                        stock: null,
                        genre: 'casual'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(400);
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array').that.includes('Please enter product stock')
                        done()
                    })
            })
            it('error because of negative stock', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('token', userToken)
                    .send({
                        title: "Bloodborne",
                        description: 'Bloodborne desc',
                        file: 'imageurl',
                        price: 20000,
                        stock: -69,
                        genre: 'casual'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(400);
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array').that.includes('Stock can not be negative')
                        done()
                    })
            })
            it('error because of empty genre', function (done) {
                chai
                    .request(app)
                    .post('/products')
                    .set('token', userToken)
                    .send({
                        title: "Bloodborne",
                        description: 'Bloodborne desc',
                        file: 'imageurl',
                        price: 20000,
                        stock: 20,
                        genre: ""
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(400);
                        expect(res.body.message).to.equal('Validation Error')
                        expect(res.body.errors).to.be.an('array').that.includes('Please enter product genre')
                        done()
                    })
            })
        })
    })
    describe('GET /products', function () {
        context('Success Process', function () {
            it('status 200 with no error', function (done) {
                chai
                    .request(app)
                    .get('/products')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('array')
                        res.body.forEach(element => {
                            expect(element).to.have.any.keys('title', 'description', 'price', 'stock', 'genre')
                        })
                        done()
                    })
            })
        })
    })
    describe('GET /products/:id', function () {
        context('Success Process', function () {
            it('status 200 with no error', function (done) {
                chai
                    .request(app)
                    .get('/products/5dd1281af7f5ea6f90172b7a')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.any.keys('title', 'description', 'price', 'stock', 'genre')
                        done()
                    })
            })
        })
        context('Error Process', function () {
            it('status 500 error', function (done) {
                chai
                    .request(app)
                    .get('/products/this_product_does_not_exist')
                    .end(function (err, res) {
                        expect(res).to.have.status(500);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.any.keys('message', 'errors')
                        done()
                    })
            })
        })
    })
    describe('UPDATE /products/id', function () {
        context('Success Process', function () {
            it('success updated with code 200', function (done) {
                chai
                    .request(app)
                    .put(`/products/5dd1281af7f5ea6f90172b7a`)
                    .set('token', userToken)
                    .send({
                        title: 'Monhun Updated',
                        description: 'Monhun desc',
                        file: 'imageurl',
                        price: 20000,
                        stock: 20,
                        genre: 'casual'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body.message).to.equal('product updated');
                        done()
                    })
            })
        })
        context('Error Process', function () {
            it('error when product does not exist', function (done) {
                chai
                    .request(app)
                    .put(`/products/this_product_does_not_exist`)
                    .set('token', userToken)
                    .send({
                        title: 'Monhun Updated',
                        description: 'Monhun desc',
                        file: 'imageurl',
                        price: 20000,
                        stock: 20,
                        genre: 'casual'
                    })
                    .end(function (err, res) {
                        expect(res).to.have.status(500);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.any.keys('message', 'errors')
                        done()
                    })
            })
            it('failed to update when user does not have token', function (done) {
                chai
                    .request(app)
                    .put(`/products/5dd1281af7f5ea6f90172b7a`)
                    .set('token', null)
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(403);
                        expect(res.body).to.be.an('object');
                        expect(res.body.message).to.equal('Please login first')
                        done()
                    })
            })
        })
    })
    describe('DELETE /products/id', function () {
        context('Success Process', function () {
            it('success delete with code 200', function (done) {
                chai
                    .request(app)
                    .delete(`/products/5dd1281af7f5ea6f90172b7a`)
                    .set('token', userToken)
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.any.keys('title', 'description', 'price', 'stock', 'genre')
                        done()
                    })
            })
        })
        context('Error Process', function () {
            it('error when product does not exist', function (done) {
                chai
                    .request(app)
                    .delete(`/products/this_product_does_not_exist`)
                    .set('token', userToken)
                    .end(function (err, res) {
                        expect(res).to.have.status(500);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.any.keys('message', 'errors')
                        done()
                    })
            })
            it('failed to update when user does not have token', function (done) {
                chai
                    .request(app)
                    .put(`/products/5dd1281af7f5ea6f90172b7a`)
                    .set('token', null)
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(403);
                        expect(res.body).to.be.an('object');
                        expect(res.body.message).to.equal('Please login first')
                        done()
                    })
            })
        })
    })
})