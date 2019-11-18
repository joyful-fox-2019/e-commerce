const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Transaction = require('../models/Transaction')
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

let buyerId = null
let buyerToken = null

let buyerToken2 = null
let buyerId2 = null

let sellerId1 = null
let sellerToken1 = null

let sellerId2 = null
let sellerToken2 = null

let productId1 = null
let productId2 = null

let newCart = null
let newCart2 = null
let newTrasaction = null
let newTrasactionId = null
let deletedProductId = '5dca64c66456512b4f6cbd7f'

// seed data before testing
before(function(done) {
    User.create({
        email: 'buyer@buyer.com',
        password: 'buyer',
        role: 'buyer',
        address: 'Tokyo'
    })
    .then(user =>{
        buyerId = user._id
        buyerToken = generateToken({
            id: user._id
        })
        console.log('success generate buyer token')
        return User.create({
            email: 'buyer2@buyer2.com',
            password: 'buyer2',
            role: 'buyer',
            address: 'Tokyo'
        })
    })
    .then(user =>{
        buyerId2 = user._id
        buyerToken2 = generateToken({
            id: user._id
        })
        console.log('success generate buyer2 token')
        return User.create({
            email: 'tiga@tiga.com',
            password: 'tiga',
            address: 'Tokyo'
        })
    })
    .then(user =>{
        sellerId1 = user._id
        sellerToken1 = generateToken({
            id: user._id
        })
        console.log('success generate seller token')
        newProduct.userId = sellerId1
        return Product.create(newProduct)
    })
    .then(product =>{
        productId1 = product._id
        return User.create({
            email: 'empat@empat.com',
            password: 'empat',
            address: 'Tokyo'
        })
    })
    .then(user =>{
        sellerId2 = user._id
        sellerToken2 = generateToken({
            id: user._id
        })
        let newProduct2 = { ...newProduct, name: 'Product 2', userId: sellerId2}
        return Product.create(newProduct2)
    })
    .then(product =>{
        productId2 = product._id
        return Cart.create({ userId: buyerId,  items: { productId: productId1, seller: sellerId1, qty: 5 } })
    })
    .then(cart =>{
        cart.items.push({ productId: productId2,  seller: sellerId2, qty: 5 })
        return cart.save()
    })
    .then((cart)=>{
        newCart = cart
        return Cart.create({ userId: buyerId2,  items: { productId: productId1, seller: sellerId1, qty: 10 } })
    })
    .then((cart) =>{
        newCart2 = cart
        return Transaction.create({ userId: buyerId,  items: [{ productId: productId1, seller: sellerId1 , qty: 1 }, { productId: productId2,  seller: sellerId2, qty: 1 }], totalPrice: 1000 })
    })
    .then(transac =>{
        newTrasaction = transac
        newTrasactionId = transac._id
        return Transaction.create({ userId: buyerId2,  items: [{ productId: productId1, seller: sellerId2 , qty: 10 }, { productId: productId2,  seller: sellerId2, qty: 10 }], totalPrice: 10000 })
    })
    .then(() =>{
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
            return Transaction.deleteMany({})
        })
        .then(()=>{
            console.log('testing: delete data transaction success!')
            done()
        })
        .catch(console.log)
    }
})


describe('Trasactions Router', function(){
    describe('POST transactions', function(){

        describe('Success Create Transanctions', function(){

            it('should CREATE new Transaction and return an object ( transaction ) with status code 201', function(done){
                chai.request(app)
                .post('/transactions')
                .set('token', buyerToken)
                .send({totalPrice: 500})
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.keys('items', 'totalPrice','userId', 'createdAt', 'updatedAt', '__v', '_id')
                    done()
                })
            })
    
            it('should return stock of product (product1) with decrease stock (5) because checkout trasaction was made', function(done){
                chai.request(app)
                .get(`/products/${productId1}`)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body.stock).to.be.an('number').to.equal(5)
                    done()
                })
            })
    
            it('should return stock of product (product2) with decrease stock (5) because checkout trasaction was made', function(done){
                chai.request(app)
                .get(`/products/${productId2}`)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body.stock).to.be.an('number').to.equal(5)
                    done()
                })
            })
        })

        describe('Error Create Transanction', function(){
            it('should return error with status code 400 because out of stock when user wanna make transaction', function(done){
                chai.request(app)
                .post('/transactions')
                .set('token', buyerToken2)
                .send({totalPrice: 500})
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })

        })

    })

    describe('GET transaction', function(){
        describe('Success Show Transaction', function(){

            it('should return an array ( Transaction ) with status code 200', function(done){
                chai.request(app)
                .get(`/transactions`)
                .set('token', buyerToken)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
            })

        })
    })

    describe('GET transaction by seller id', function(){
        describe('Success Show Transaction', function(){
            it('should return an object ( Transaction ) with status code 200', function(done){
                chai.request(app)
                .get(`/transactions/seller`)
                .set('token', sellerToken1)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
            })

        })
    })

    describe('PATCH transaction', function(){
        describe('Success Change Status of Transaction', function(){

            it('should return an object ( Transaction ) with status code 200', function(done){
                chai.request(app)
                .patch(`/transactions/${productId1}`)
                .set('token', sellerToken1)
                .send({ status : 'Orders accepted' })
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body.items[0].status).to.equal('Orders accepted')
                    done()
                })
            })
        })

        describe('Error Change Status of Transaction', function(){

            it("should return error with status code 403 because other seller try to change status of items coustumer/buyer transactions's that not belong to him", function(done){
                chai.request(app)
                .patch(`/transactions/${productId1}`)
                .set('token', sellerToken2)
                .send({ status : 'Orders accepted' })
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(403)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('string').that.includes('Unauthorized')
                    done()
                })
            })

        })

    })
})
