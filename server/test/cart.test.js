const chai  = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app.js')
const userModel = require('../models/user')
const productModel = require('../models/product')
const cartModel = require('../models/cart')
const expect = chai.expect
const fs = require('fs')
const { generateToken } = require('../helpers/jwt')

chai.use(chaiHttp)

const formProduct = {
    name : 'ngolang',
    price : 200,
    description : 'with nodejs version',
    quantities : 100,
    imgUrl : './img/profil_avatdwdar.jpg'
}

const userSignUp = {
    name : 'accountTumbal',
    email : 'accountTumbal20@mail.com',
    password : 'mawang8080',
    imgUrl : './img/profil_avatdwdar.jpg'
}
let token = ''
let productId = ''
let userId = ''
let cartId = ''

const cartForm = {
    productId : '',
    quantities : 2,
    userId : ''
}
// create account user
before(function(done){
    userModel.create(userSignUp)
    .then(user => {
        token = generateToken({
            email: user.email,
            id: user._id,
            name: user.name
        })
        userId = user._id
        cartForm.userId = user._id
        console.log('testing: success create user and generate token status 201')
        let formProd = {
            name : formProduct.name,
            price : formProduct.price,
            description : formProduct.description,
            quantities : formProduct.quantities,
            imgUrl: formProduct.imgUrl,
            userId : userId,
        }
        productModel.create(formProd)
        .then(product => {
            productId = product._id
            cartForm.productId = product._id
            console.log('testing: success create product and generate _id of product status 201')
            cartModel.create(cartForm)
            .then(cart=>{
                cartId = cart._id
                console.log('testing: success create cart and generate _id of cart status 201')
                done()
            })
            .catch(console.log)
        })
        .catch(console.log)
    })
    .then(cart=>{
        cartId = cart._id
        console.log('testing: success create cart and generate _id of cart status 201')
        done()
    })
    .catch(console.log)
})
// delete data after testing
after(function(done){
    userModel.deleteMany({})
        .then(()=>{
            console.log(`testing: delete all data users success`);
            done()
        })
        .catch(console.log)
})

// delete product
after(function(done){
    productModel.deleteMany({})
        .then(()=>{
            console.log(`testing: delete all data products success`);
            done()
        })
        .catch(console.log)
})

// process validation with mochajs
describe('Cart Routes',function(){
    describe('success process',function(){
        describe('GET /cart/',function(){
            it('find all data cart success with 200 status code',function(done){
                chai.request(app)
                .get('/cart')
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
        describe('GET /cart/mycarts',function(){
            it('dinf all your data cart list with 200 status code',function(done){
                chai.request(app)
                .get('/cart/mycarts')
                .set('token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
        describe('POST /cart/',function(){
            it('create cart data with 201 status code',function(done){
                chai.request(app)
                .post('/cart')
                .set('token', token)
                .send({ productId })
                .send({ quantities : 2 })
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    done()
                })
            })
        })
        describe('PATCH /cart/:id/status',function(){
            it('update status of cart with 200 status code',function(done){
                chai.request(app)
                .patch(`/cart/`+cartId+`/status`)
                done()
                .set('token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
        describe('PATCH /cart/:id',function(){
            it('update cart data with 200 status code',function(done){
                chai.request(app)
                .patch(`/cart/${cartId}`)
                .set('token', token)
                .send({ quantities : 4 })
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
        describe('DELETE /cart/:id',function(){
            it('delete data cart with 200 status code',function(done){
                chai.request(app)
                .delete(`/cart/${cartId}`)
                .set('token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
    })
    describe('fail process',function(){
        describe('POST /cart/',function(){
            it('create data without token and take 400 status code',function(done){
            chai.request(app)
                .post('/cart')
                .set('token', 'apaitutoken')
                .send({ productId })
                .send({ quantities : 2 })
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
        })
    })
})