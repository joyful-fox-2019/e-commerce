const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const { generateToken } = require('../helpers/jwt')
const seedProduct = require("../helpers/test/seedProduct")

chai.use(chaiHttp)
const expect = chai.expect

let newProduct ={
    name: 'Product 1',
    file: 'imageUrl',
    image: 'imageUrl',
    desc: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution',
    price: 500,
    stock: 10
}

let buyerToken = null
let buyerId = null
let sellerId = null

let productId1 = null
let itemId1 = null
let productId2 = null
let productId3 = null
let newCart = null
let otherNewCart = null
let deletedProductId = '5dca64c66456512b4f6cbd7f'

// seed data before testing
before(function(done) {
    User.create({
        email: 'buy@buy.com',
        password: 'buy',
        address: 'Tokyo'
    })
    .then(user =>{
        buyerToken = generateToken({
            id: user._id
        })
        buyerId = user._id
        console.log('success generate buyer token')
        return User.create({
            email: 'seller@seller.com',
            password: 'seller',
            address: 'Tokyo'
        })
    })
    .then(user =>{
        sellerId = user._id
        newProduct.seller = sellerId
        return Product.create(newProduct)
    })
    .then(product =>{
        productId1 = product._id
        let newProduct2 = { ...newProduct, name: 'Product 2' }
        return Product.create(newProduct2)
    })
    .then(product =>{
        productId2 = product._id
        let newProduct3 = { ...newProduct, name: 'Product 3' }
        return Product.create(newProduct3)
    })
    .then(product =>{
        productId3 = product._id
        newCart = {
            productId: productId1,
            seller: sellerId,
            qty: 2
        }
        otherNewCart = {
            productId: productId2,
            seller: sellerId,
            qty: 2
        }
        done()
    })
    .catch(console.log)
})

// delete data after testing
after(function(done){
    if(process.env.NODE_ENV == 'testing'){
        Product.deleteMany({})
        .then(()=>{
            console.log('testing: delete data product success!')
            return User.deleteMany({})
        })
        .then(()=>{
            console.log('testing: delete data user success!')
            return Cart.deleteMany({})
        })
        .then(()=>{
            console.log('testing: delete data cart success!')            
            done()
        })
        .catch(console.log)
    }
})

describe('Cart Router', function(){
    this.timeout(10000);
    describe('POST /carts', function(){
        describe('Error because empy seller', function(){
            it('should send an error with status code 400 because empty Seller', function(done){
                const withoutSeller = { ...newCart }
                delete withoutSeller.seller
                chai.request(app)
                .post('/carts')
                .send(withoutSeller)
                .set('token', buyerToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('seller is required')
                    done()
                })
            })
        })

        describe('Success Update OR Create Cart', function(){

            it('should CREATE new cart and return an object ( cart ) with status code 201', function(done){
                chai.request(app)
                .post('/carts')
                .send(newCart)
                .set('token', buyerToken)
                .end(function(err, res){
                    itemId1 = res.body.items[0]._id
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('userId', 'items', '_id')
                    done()
                })
            })

            it('should UPDATE existing cart and return an object ( cart ) with status code 200', function(done){
                const addQty = { ...newCart, qty: 5}
                chai.request(app)
                .post('/carts')
                .send(addQty)
                .set('token', buyerToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('userId', 'items', '_id',)
                    expect(res.body.items.length).to.equal(1)
                    expect(res.body.items[0].qty).to.equal(7)
                    done()
                })
            })

            it('should UPDATE existing cart and return an object ( cart ) with status code 200', function(done){
                chai.request(app)
                .post('/carts')
                .send(otherNewCart)
                .set('token', buyerToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('userId', 'items', '_id',)
                    done()
                })
            })

        })

        describe('Error Create Cart', function(){

            it('should send an error with status code 400 because empty ProductId', function(done){
                const withoutProductId = { ...newCart }
                delete withoutProductId.productId
                chai.request(app)
                .post('/carts')
                .send(withoutProductId)
                .set('token', buyerToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('bad request')
                    done()
                })
            })

            it('should send an error with status code 404 because ProductId not found', function(done){
                const cartNotFoundProductId = { ...newCart, productId: deletedProductId  }
                chai.request(app)
                .post('/carts')
                .send(cartNotFoundProductId)
                .set('token', buyerToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('product not found')
                    done()
                })
            })

            it('should send an error with status code 400 because empty Quantity', function(done){
                const withoutQuantity = { ...newCart }
                delete withoutQuantity.qty
                chai.request(app)
                .post('/carts')
                .send(withoutQuantity)
                .set('token', buyerToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('bad request')
                    done()
                })
            })

            it('should send an error with status code 400 because product is out of stock', function(done){
                const overQty = { ...newCart, qty: 10000000000000000000 }
                chai.request(app)
                .post('/carts')
                .send(overQty)
                .set('token', buyerToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('out of stock')
                    done()
                })
            })

            it('should send an error with status code 400 because user is not loged in', function(done){
                chai.request(app)
                .post('/carts')
                .send(newCart)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('please login first')
                    done()
                })
            })
            
        })
    })

    describe('PACTH /carts/changeqty', function(){
        describe("Success change cart's product quantity", function(){
            it('should return an object ( carts ) with status code 200', function(done){
                chai.request(app)
                .patch('/carts/changeqty')
                .send({productId : productId1, qty: 5})
                .set('token', buyerToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('userId', 'items', '_id',)
                    expect(res.body.items[0].qty).to.equal(5)
                    done()
                })
            })
        })

        describe("Error change cart's product quantity", function(){
            it('should send an error with status code 400 because product is out of stock', function(done){
                chai.request(app)
                .patch('/carts/changeqty')
                .send({productId : productId1, qty: 100000000000000000000})
                .set('token', buyerToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('out of stock')
                    done()
                })
            })

            it('should return error because user not login', function(done){
                chai.request(app)
                .patch(`/carts/changeqty`)
                .send({productId : productId1, qty: 100000000000000000000})
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('please login first')
                    done()
                })
            })
        })
    })

    describe('GET /carts', function(){
        describe('Success Show Carts', function(){

            it('should return an object ( carts ) with status code 200', function(done){
                chai.request(app)
                .get('/carts')
                .set('token', buyerToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
            })

        })

        describe('Error Show Carts', function(){

            it('should send an error with status code 400 because user is not loged in', function(done){
                chai.request(app)
                .get('/carts')
                .send(newCart)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('please login first')
                    done()
                })
            })

        })

    })

    describe('PATCH /carts/removeitem/:id', function(){
        describe('Success remove item', function(){
            it('should return an object ( carts ) with status code 200', function(done){
                chai.request(app)
                .patch(`/carts/removeitem/${itemId1}`)
                .set('token', buyerToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object').to.have.any.keys('userId', 'items', '_id',)
                    expect(res.body.items[0].qty).to.equal(5)
                    done()
                })
            })
        })

        describe('Error remove item', function(){
            it('should return error because user not login', function(done){
                chai.request(app)
                .patch(`/carts/removeitem/${itemId1}`)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('please login first')
                    done()
                })
            })
        })
    })
})