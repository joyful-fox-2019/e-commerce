const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')
const Wishlist = require('../models/Wishlist')
const { generateToken } = require('../helpers/jwt')

chai.use(chaiHttp)
const expect = chai.expect
let userId = null
let newProduct ={
    userId,
    name: 'Product 1',
    file: 'imageUrl',
    image: 'imageUrl',
    desc: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution',
    price: 500,
    stock: 10
}
let token1 = null
let token2 = null
let productId = null
let deletedProductId = '5dca64c66456512b4f6cbd7f'

before(function(done) {
    User.create({
      email: 'lima@lima.com',
      password: 'lima',
      address: 'Tokyo'
    })
    .then(user => {
        token1 = generateToken({
            id: user._id
        })
        console.log('success generate token1')
        newProduct.userId = user._id
        return Product.create(newProduct)
    })
    .then(product =>{
        productId = product._id
        return User.create({
            email: 'enam@enam.com',
            password: 'enam',
            address: 'Tokyo'
        })
    })
    .then(user => {
        token2 = generateToken({
            id: user._id
        })
        console.log('success generate token2')
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
            return Wishlist.deleteMany({})
        })
        .then(()=>{
            console.log('testing: delete data wishlist success!')
            done()
        })
        .catch(console.log)
    }
})


describe(' POST /wishlist', function(){
    describe('Success make wishlist', function(){
        
        it('should return an object ( wishlist ) with status code 201', function(done){
            chai.request(app)
            .post(`/wishlist/${productId}`)
            .send(newProduct)
            .set('token', token1)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object').to.have.keys('_id', 'userId', 'productId', 'createdAt', 'updatedAt', '__v')
                done()
            })
        })

    })

    describe('Error make wishlist', function(){
        
        it('should send an error with status code 400 because user not loged in', function(done){
            chai.request(app)
            .post(`/wishlist/${productId}`)
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

describe(' GET /wishlist', function(){
    describe('Success find wishlist', function(){
        
        it('should return an array ( wishlist ) with status code 200', function(done){
            chai.request(app)
            .get(`/wishlist`)
            .set('token', token1)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                done()
            })
        })

    })
})

describe(' GET /wishlist/:id', function(){
    describe('Success find wishlist', function(){
        
        it('should return an object ( wishlist ) with status code 200', function(done){
            chai.request(app)
            .get(`/wishlist/${productId}`)
            .set('token', token1)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object').to.have.keys('_id', 'userId', 'productId', 'createdAt', 'updatedAt', '__v')
                done()
            })
        })

    })
})

describe(' DELETE /wishlist', function(){
    describe('Success delete wishlist', function(){
        
        it('should return an object ( wishlist ) with status code 200', function(done){
            chai.request(app)
            .delete(`/wishlist/${productId}`)
            .send(newProduct)
            .set('token', token1)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object').to.have.keys('_id', 'userId', 'productId', 'createdAt', 'updatedAt', '__v')
                done()
            })
        })

    })

    describe('Error delete wishlist', function(){
        
        it('should send an error with status code 400 because user not loged in', function(done){
            chai.request(app)
            .delete(`/wishlist/${productId}`)
            .end(function(err, res){
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body).to.be.an('object').to.have.any.keys('message')
                expect(res.body.message).to.be.an('string').that.includes('please login first')
                done()
            })
        })

        it('should send an error with status code 403 because unauthorized user try to delete wishlist', function(done){
            chai.request(app)
            .delete(`/wishlist/${productId}`)
            .set('token', token2)
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