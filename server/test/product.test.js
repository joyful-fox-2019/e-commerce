const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require('../app')
const Product = require('../models/product')
const User = require('../models/user')

chai.use(chaiHttp)
const expect = chai.expect

describe('Product Routes', function () {
    this.timeout(1000)

    let product = {
        name: 'product',
        stock: 10,
        description: 'this is product description',
        price: 5000,
        category: 'test'
    }
    let Admin = {
        username: 'user',
        email: 'user@mail.com',
        password: 'user',
        isAdmin: true
    }
    let Customer = {
        username: 'customer',
        email: 'customer@mail.com',
        password: 'customer',
        isAdmin: false
    }
    let createdProduct = {}

    let token = '',
        tokenCustomer = ''

    before(function (done) {
        User.create(Admin)
            .then(result => {
                chai.request(app)
                    .post('/user/login')
                    .send({
                        email: Admin.email,
                        password: Admin.password
                    })
                    .end(function (err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            token = res.body.token
                        }
                    })
                return User.create(Customer)
            })
            .then(created => {
                chai.request(app)
                    .post('/user/login')
                    .send({
                        email: Customer.email,
                        password: Customer.password
                    })
                    .end(function (err, res) {
                        if (err) {
                            console.log(err);
                        } else {
                            tokenCustomer = res.body.token
                            done()
                        }
                    })
            }).catch(console.log)
    })

    after(function (done) {
        Product.deleteMany({})
            .then(result => {
                return User.deleteMany({})
            })
            .then(result => done())
            .catch(console.log)
    })

    describe('POST /products', (done) => {

        describe(`'success add product'! \(^ヮ^)/`, () => {
            it('admin success add product', (done) => {
                let newProduct = { ...product }
                chai.request(app)
                    .post('/products')
                    .set("token", token)
                    .send(newProduct)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('Object').to.have.any.keys('newProduct')
                        expect(res.body.newProduct).to.be.an('Object').to.have.all.keys('_id', 'name', 'stock', 'description', 'image', 'category', 'price')
                        createdProduct = res.body.newProduct
                        expect(res.body.newProduct.name).to.be.a('String')
                        expect(res.body.newProduct.description).to.be.a('String')
                        expect(res.body.newProduct.image).to.be.a('String')
                        expect(res.body.newProduct.category).to.be.an('Array')
                        expect(res.body.newProduct.stock).to.be.a('Number')
                        expect(res.body.newProduct.price).to.be.a('Number')
                        done()
                    })
            })
        })

        describe(`failed add product (-__-)`, () => {
            it('failed add product : empty product keys required', (done) => {
                let failedProduct = { ...product }
                delete failedProduct.name
                delete failedProduct.price
                chai.request(app)
                    .post('/products')
                    .set("token", token)
                    .send(failedProduct)
                    .end(function (err, res) {
                        let error = res.body.message
                        expect(error).to.be.an('Array')
                        expect(error).that.includes(`Please input product's name.`)
                        expect(error).that.includes(`Please enter product's price`)
                        done()
                    })
            })

            it('failed add product : validation product keys error', function (done) {
                let failedProduct = {
                    ...product,
                    description: "empty",
                    stock: 0
                }
                chai.request(app)
                    .post('/products')
                    .set("token", token)
                    .send(failedProduct)
                    .end(function (err, res) {
                        let error = res.body.message
                        expect(error).to.be.an('Array')
                        expect(error).that.includes(`minimal stock 1`)
                        expect(error).that.includes(`description product minimal 10 character`)
                        done()
                    })
            })
        })


    })

    describe('GET /products', (done) => {
        describe(`success show all products! \(^ヮ^)/`, () => {
            it('supposed return all products', (done) => {
                chai.request(app)
                    .get('/products')
                    .set("token", token)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('Array')
                        expect(res.body[0]).to.be.an('Object').to.have.any.keys('_id', 'name', 'stock', 'description', 'image', 'category', 'price')
                        expect(res.body[0].name).to.be.a('String')
                        expect(res.body[0].description).to.be.a('String')
                        expect(res.body[0].image).to.be.a('String')
                        expect(res.body[0].category).to.be.an('Array')
                        expect(res.body[0].stock).to.be.a('Number')
                        expect(res.body[0].price).to.be.a('Number')
                        done()
                    })
            })
        })
    })


    describe('PATCH /products/:id', (done) => {
        describe(`success response updated product! \(^ヮ^)/`, () => {
            it('supposed return updated product with state 200 ', (done) => {
                let productToUpdate = { ...product, name: "changed product name" }
                chai.request(app)
                    .patch(`/products/${createdProduct._id}`)
                    .set("token", token)
                    .send(productToUpdate)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('Object').to.have.any.keys('product', 'message')
                        expect(res.body.product).to.have.any.keys('_id', 'name', 'stock', 'description', 'image', 'category', 'price')
                        expect(res.body.message).to.equal('success update product')
                        done()
                    })
            })
        })

        describe(`error response update product (-__-)`, () => {

            it('failed update product : Cast to ObjectId failed', (done) => {
                let productToUpdate = { ...product, name: "changed product name" }
                chai.request(app)
                    .patch(`/products/advjasjahslaslk726381780`)
                    .set("token", token)
                    .send(productToUpdate)
                    .end(function (err, res) {
                        expect(res).to.have.status(404)
                        expect(res.body).to.be.an('Object').to.have.any.keys('message')
                        expect(res.body.message).to.equal(`Not found`)
                        done()
                    })
            })


            it('failed update product : product not found', (done) => {
                let productToUpdate = { ...product, name: "changed product name" }
                chai.request(app)
                    .patch(`/products/${createdProduct._id.slice(createdProduct._id.length - 1)}`)
                    .set("token", token)
                    .send(productToUpdate)
                    .end(function (err, res) {
                        expect(res).to.have.status(404)
                        expect(res.body).to.be.an('Object').to.have.any.keys('message')
                        expect(res.body.message).to.equal(`Not found`)
                        done()
                    })
            })
        })
    })

    describe('DELETE /products/:id', (done) => {
        describe(`success response delete product! \(^ヮ^)/`, () => {
            it('supposed to delete product', (done) => {
                chai.request(app)
                    .delete(`/products/${createdProduct._id}`)
                    .set("token", token)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('Object').to.have.any.keys('success', 'message')
                        expect(res.body.success).to.have.any.keys('_id', 'name', 'stock', 'description', 'image', 'category', 'price')
                        expect(res.body.message).to.equal('success deleting product')
                        done()
                    })
            })
        })

        describe(`error response delete product (-__-)`, () => {
            it('failed delete product : Cast to ObjectId failed', (done) => {
                chai.request(app)
                    .delete(`/products/advjasjahslaslk726381780`)
                    .set("token", token)
                    .end(function (err, res) {
                        expect(res).to.have.status(404)
                        expect(res.body).to.be.an('Object').to.have.any.keys('message')
                        expect(res.body.message).to.equal(`Not found`)
                        done()
                    })
            })

            it('failed delete product : product not found', (done) => {
                console.log(`${createdProduct._id.slice(createdProduct._id.length - 1)}`);
                chai.request(app)
                    .delete(`/products/${createdProduct._id.slice(createdProduct._id.length - 1)}`)
                    .set("token", token)
                    .end(function (err, res) {
                        expect(res).to.have.status(404)
                        expect(res.body).to.be.an('Object').to.have.any.keys('message')
                        expect(res.body.message).to.equal(`Not found`)
                        done()
                    })
            })
        })
    })

})