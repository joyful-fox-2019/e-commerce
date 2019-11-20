const chai  = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app.js')
const userModel = require('../models/user')
const productModel = require('../models/product')
const expect = chai.expect
const fs = require('fs')
const { generateToken } = require('../helpers/jwt')

chai.use(chaiHttp)

const formProduct = {
    name : 'javascript',
    price : 200,
    description : 'with nodejs version',
    quantities : 100,
    imgUrl : './img/profil_avatdwdar.jpg'
}

const userSignUp = {
    name : 'accountTumbal',
    email : 'accountTumbal@mail.com',
    password : 'mawang8080',
    imgUrl : './img/profil_avatdwdar.jpg'
}
let token = ''
let productId = ''
let userId = ''
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
            console.log('testing: success create user and generate token status 201')
            done()
        })
        .catch(console.log)
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
describe('Product Routes',function(){
    describe('success process',function(){
        describe('GET /product',function(){
            it('find all data products success with 200 status code',function(done){
                chai.request(app)
                .get('/product')
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
        describe('POST /product',function(){
            it('create product with 201 status code',function(done){
                chai.request(app)
                .post('/product')
                .set('token', token)
                .field('name', formProduct.name)
                .field('price', formProduct.price)
                .field('description', formProduct.description)
                .field('quantities', formProduct.quantities)
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    imgUrl = res.body.imgUrl
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    done()
                })
            })
        })
        describe('GET /product/myproducts',function(){
            it('findAll product with 200 status code',function(done){
                this.timeout(500);
                chai.request(app)
                .get('/product')
                .set('token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
        describe('PATCH /product/:id',function(){
            it('update quantities product with 200 status code',function(done){
                chai.request(app)
                .patch(`/product/`+ productId)
                .set('token', token)
                .send({ quantities : 5 })
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
        describe('PUT /product/:id',function(){
            it('update all data product with 200 status code',function(done){
                chai.request(app)
                .put(`/product/${productId}`)
                .set('token', token)
                .field('name', 'testing')
                .field('price', '999999')
                .field('description', 'testing desc')
                .field('quantities', '10')
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
        describe('DELETE /product/:id',function(){
            it('delete data product with 200 status code',function(done){
                chai.request(app)
                .delete(`/product/${productId}`)
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
        describe('POST /product',function(){
            it('create data without token with 400 status code',function(done){
                chai.request(app)
                .post('/product')
                .set('token', null)
                .field('name', formProduct.name)
                .field('price', formProduct.price)
                .field('description', formProduct.description)
                .field('quantities', formProduct.quantities)
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    imgUrl = res.body.imgUrl
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
        })
        describe('POST /product',function(){
            it('create data without name with 400 status code',function(done){
                chai.request(app)
                .post('/product')
                .set('token', token)
                .field('price', formProduct.price)
                .field('description', formProduct.description)
                .field('quantities', formProduct.quantities)
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    imgUrl = res.body.imgUrl
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
        })
        describe('POST /product',function(){
            it('create data without price with 400 status code',function(done){
                chai.request(app)
                .post('/product')
                .set('token', token)
                .field('name', formProduct.name)
                .field('description', formProduct.description)
                .field('quantities', formProduct.quantities)
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    imgUrl = res.body.imgUrl
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
        })
        describe('POST /product',function(){
            it('create data without description with 400 status code',function(done){
                chai.request(app)
                .post('/product')
                .set('token', token)
                .field('name', formProduct.name)
                .field('price', formProduct.price)
                .field('quantities', formProduct.quantities)
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    imgUrl = res.body.imgUrl
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
        })
        describe('POST /product',function(){
            it('create data without image with 400 status code',function(done){
                chai.request(app)
                .post('/product')
                .set('token', token)
                .field('name', formProduct.name)
                .field('price', formProduct.price)
                .field('description', formProduct.description)
                .field('quantities', formProduct.quantities)
                .end(function(err,res){
                    imgUrl = res.body.imgUrl
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
        })
        describe('PATCH /product/:id',function(){
            it('update quantities without id product with 404 status code',function(done){
                chai.request(app)
                .patch(`/product/`)
                .set('token', token)
                .send({ quantities : 5 })
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    done()
                })
            })
        })
        describe('PATCH /product/:id',function(){
            it('update quantities without token product with 400 status code',function(done){
                chai.request(app)
                .patch(`/product/${productId}`)
                .send({ quantities : 5 })
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
        })
        describe('PUT /product/:id',function(){
            it('update all data product without id with 404 status code',function(done){
                chai.request(app)
                .put(`/product/`)
                .set('token', token)
                .field('name', 'testing')
                .field('price', '999999')
                .field('description', 'testing desc')
                .field('quantities', '10')
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    done()
                })
            })
        })
        describe('PUT /product/:id',function(){
            it('update all data product without token with 400 status code',function(done){
                chai.request(app)
                .put(`/product/${productId}`)
                .field('name', 'testing')
                .field('price', '999999')
                .field('description', 'testing desc')
                .field('quantities', '10')
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
        })
        describe('PUT /product/:id',function(){
            it('update all data product without name with 404 status code',function(done){
                chai.request(app)
                .put(`/product/${productId}`)
                .set('token', token)
                .field('price', '999999')
                .field('description', 'testing desc')
                .field('quantities', '10')
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    done()
                })
            })
        })
        describe('PUT /product/:id',function(){
            it('update all data product without price with 404 status code',function(done){
                chai.request(app)
                .put(`/product/${productId}`)
                .set('token', token)
                .field('name', 'testing')
                .field('description', 'testing desc')
                .field('quantities', '10')
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    done()
                })
            })
        })
        describe('PUT /product/:id',function(){
            it('update all data product without description with 404 status code',function(done){
                chai.request(app)
                .put(`/product/${productId}`)
                .set('token', token)
                .field('name', 'testing')
                .field('price', '999999')
                .field('quantities', '10')
                .attach('imgUrl', fs.readFileSync("./test/img/profil_avatdwdar.jpg"), "profil_avatdwdar.jpg")
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    done()
                })
            })
        })
        describe('PUT /product/:id',function(){
            it('update all data product without image with 404 status code',function(done){
                chai.request(app)
                .put(`/product/${productId}`)
                .set('token', token)
                .field('name', 'testing')
                .field('price', '999999')
                .field('description', 'testing desc')
                .field('quantities', '10')
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    done()
                })
            })
        })
        describe('DELETE /product/:id',function(){
            it('delete data product without product id with 404 status code',function(done){
                chai.request(app)
                .delete(`/product/`)
                .set('token', token)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(404)
                    done()
                })
            })
        })
        describe('DELETE /product/:id',function(){
            it('delete data product without token with 400 status code',function(done){
                chai.request(app)
                .delete(`/product/${productId}`)
                .end(function(err,res){
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    done()
                })
            })
        })
    })
})