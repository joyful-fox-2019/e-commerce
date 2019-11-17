const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const Category = require('../models/category')
const jwt = require('../helpers/jwt')

chai.use(chaiHttp)
let token = null;
let productId = null;
let cartId = null;
let userId = null;
let categoryId = null;


describe('Cart END POINT test', function () {

    before(function (done) {
        let newUser = {
            name: 'user',
            email: "user@gmail.com",
            password: "user",
            isAdmin: true,
        }

        User.create(newUser)
            .then((user) => {
                let {
                    name,
                    email,
                    _id
                } = user
                jwt.sign({
                    id: _id,
                    email,
                    name
                }, 'user')
                done()
            })
            .catch(err => {
                done()
            })

    })

    after(function (done) {
        Product.deleteMany({})
            .then(() => { })
            .catch(err => {
                done()
            })

        Category.deleteMany({})
            .then(() => { })
            .catch(err => {
                done()
            })

        User.deleteMany({})
            .then(() => { })
            .catch(err => {
                done()
            })

        Cart.deleteMany({})
            .then(() => {
                done()
            })
            .catch(err => {
                console.log((err));
            })
    })


    describe('POST /users/login', function () {
        describe('success login', function () {
            it('app should return status 200 as an object with token', function (done) {
                let login = {
                    email: 'paul@gmail.com',
                    password: '123456'
                }
                chai
                    .request(app)
                    .post('/users/login')
                    .send(login)
                    .then((res) => {
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('token')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('name')
                        expect(res.body.name).to.equal('Paulina');
                        token = res.body.token
                        userId = res.body._id
                        console.log(token, 'TOKEN DIATAS UDAH KEISIIII')
                        done()
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        })
    })

    describe('POST /products', function () {
        describe('success create product', function () {
            it('app should return status 201 as an object of new product', function (done) {

                let newProduct = {
                    price: 20000,
                    name: 'Cacing',
                    image: 'http://imageurl.cacing.com',
                    stock: 10,
                    description: 'Cacing kremi',
                    category: categoryId
                }

                chai
                    .request(app)
                    .post('/products')
                    .send(newProduct)
                    .set('token', token)
                    .then(res => {

                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('price')
                        expect(res.body).to.have.property('name')
                        expect(res.body).to.have.property('image')
                        expect(res.body).to.have.property('category')
                        expect(res.body).to.have.property('stock')
                        expect(res.body.name).to.equal('Cacing');
                        expect(res.body.price).to.equal(20000)
                        expect(res.body.image).to.equal('http://imageurl.cacing.com')
                        expect(res.body.description).to.equal('Cacing kremi')
                        productId = res.body._id
                        done()
                    })
                    .catch(err => {
                        done()
                    })
            })
        })
    })

    describe('POST /carts', function () {
        describe('success create carts', function () {
            it('app should return status 201 as an object of new card', function (done) {
                let newCart = {
                    userId,
                    productId: productId,
                    amount: 2
                }
                chai
                    .request(app)
                    .post('/carts')
                    .send(newCart)
                    .set('token', token)
                    .set('cartId', cartId)
                    .then(res => {
                        expect(res.body).to.be.an('object')
                        expect(res).to.have.status(200)
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('productId')
                        cartId = res.body._id
                        console.log('BERAPA CART ID NYAA', cartId);

                        done()
                    })
                    .catch(err => {

                        done()
                    })

            })
        })

        describe('fail create carts', function () {
            it('app should return status 401 with message unauthorized', function (done) {
                chai
                    .request(app)
                    .post('/carts')
                    .send({
                        userId: userId,
                        productId: productId,
                        amount: 10
                    })
                    .then((res) => {
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body.message).to.equal('Unauthenticated user')
                        done()
                    })
                    .catch(err => {
                        done()
                    })
            })

            it('app should return status 400 with message Invalid input due to amount less than 0', function (done) {
                chai
                    .request(app)
                    .post('/carts')
                    .set('token', token)
                    .send({
                        userId: userId,
                        productId: productId,
                        amount: -10
                    })
                    .then((res) => {
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body.message).to.equal('Invalid input')
                        done()
                    })
                    .catch(err => {
                        done()
                    })
            })

            it('app should return status 400 with message cast to number failed due to string type input for amount', function (done) {
                chai
                    .request(app)
                    .post('/carts')
                    .set('token', token)
                    .send({
                        userId: userId,
                        productId: productId,
                        amount: 'abshba'
                    })
                    .then((res) => {
                        expect(res).to.have.status(400)
                        expect(res.body).to.be.an('object')
                        expect(res.body.message).to.include('Cast to number failed')
                        done()
                    })
                    .catch(err => {
                        done()
                    })
            })
        })
    })


    describe('GET /carts', function () {
        describe('success getting carts on user', function () {
            it('app should return status 200 as an array of carts', function (done) {
                chai
                    .request(app)
                    .get('/carts')
                    .set('token', token)
                    .then((res) => {
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('array')
                        expect(res.body[0]).to.have.property('_id')
                        expect(res.body[0]).to.have.property('productId')
                        expect(res.body[0]).to.have.property('userId')

                        done()

                    })
                    .catch(err => {
                        done()
                    })
            })
        })

        describe('fail getting carts on user', function () {
            it('app should return status 401 as an no authenticated user', function (done) {
                chai
                    .request(app)
                    .get('/carts')
                    .then((res) => {
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('array')
                        expect(res.body.message).to.equal('Unauthenticated user')
                        done()

                    })
                    .catch(err => {
                        done()
                    })
            })

        })
    })



    describe('PATCH /carts/:id', function () {
        describe('success patching cart with selected id', function () {
            it('app should return status 200 as an object of updated cart amount (normal patch)', function (done) {
                this.timeout(5000);
                let upval = {
                    userId: userId,
                    productId: productId,
                    amount: 11
                }
                chai
                    .request(app)
                    .patch(`/carts/${cartId}`)
                    .send(upval)
                    .set('token', token)
                    .set('cartid', cartId)
                    .then((res) => {
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('productId')
                        expect(res.body).to.have.property('userId')
                        expect(res.body).to.have.property('amount')
                        expect(res.body.amount).to.equal(11)
                        done()

                    })
                    .catch(err => {
                        console.log(err);
                        done()
                    })
            })

            it('app should return status 200 as an object of decremented cart amout', function (done) {
                let upval = {
                    userId: userId,
                    productId: productId,
                    type: 'inc'
                }
                chai
                    .request(app)
                    .patch(`/carts/${cartId}`)
                    .send(upval)
                    .set('token', token)
                    .set('cartid', cartId)
                    .then((res) => {
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('productId')
                        expect(res.body).to.have.property('userId')
                        expect(res.body).to.have.property('amount')
                        expect(res.body.amount).to.equal(12)
                        done()

                    })
                    .catch(err => {
                        console.log(err);
                        done()
                    })
            })

            it('app should return status 200 as an object of decremented cart amout', function (done) {
                let upval = {
                    userId: userId,
                    productId: productId,
                    type: 'dec'
                }
                chai
                    .request(app)
                    .patch(`/carts/${cartId}`)
                    .send(upval)
                    .set('token', token)
                    .set('cartid', cartId)
                    .then((res) => {
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('productId')
                        expect(res.body).to.have.property('userId')
                        expect(res.body).to.have.property('amount')
                        expect(res.body.amount).to.equal(11)
                        done()

                    })
                    .catch(err => {
                        console.log(err);
                        done()
                    })
            })
        })

        describe('fail patching cart with selected id', function () {
            it('app should return status 401 as user is not authenticated', function (done) {
                let upval = {
                    userId: userId,
                    productId: productId,
                    type: 'dec'
                }
                chai
                    .request(app)
                    .patch(`/carts/${cartId}`)
                    .send(upval)
                    .then((res) => {
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('array')
                        expect(res.body.message).to.equal('Unauthenticated user')
                        done()
                    })
                    .catch(err => {
                        done()
                    })
            })

            it('app should return status 401 as user is authenticated but not authorized', function (done) {
                let upval = {
                    userId: userId,
                    productId: productId,
                    type: 'dec'
                }
                chai
                    .request(app)
                    .patch(`/carts/${cartId}`)
                    .send(upval)
                    .set('token', token)
                    .then((res) => {
                        expect(res).to.have.status(401)
                        expect(res.body).to.be.an('array')
                        expect(res.body.message).to.equal('Not authorzied to conduct action')
                        done()
                    })
                    .catch(err => {
                        done()
                    })
            })

        })
    })

    describe('DELETED /carts/:id', function () {
        describe('success deleted cart with selected id', function () {
            it('app should return status 200 as an object of the deleted cart', function (done) {
                chai
                    .request(app)
                    .delete(`/carts/${cartId}`)
                    .set('token', token)
                    .set('cartid', cartId)
                    .then((res) => {
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('object')
                        expect(res.body).to.have.property('_id')
                        expect(res.body).to.have.property('productId')
                        expect(res.body).to.have.property('userId')
                        expect(res.body).to.have.property('amount')

                        done()
                    })
                    .catch(err => {
                        // console.log(err, );
                        done()
                    })
            })

            it('app should return status 404 as the specified cart is not found', function (done) {
                chai
                    .request(app)
                    .delete(`/carts/${cartId}`)
                    .set('token', token)
                    .set('cartId', '5cb5882a265b5156589b97d1')

                    .then((res) => {
                        expect(res).to.have.status(404)
                        expect(res.body).to.be.an('object')
                        expect(res.body.message).to.equal('Not found')
                        done()
                    })
                    .catch(err => {
                        console.log(err);
                        done()
                    })
            })
        })
    })
})