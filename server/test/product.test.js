const chai = require('chai')
    , chaiHttp = require('chai-http')
    , fs = require('fs')
    , Product = require('../models/Product')
    , { deleteFile } = require('../middlewares/images')
chai.use(chaiHttp)
const expect = chai.expect

const app = require('../app')

let image = ''
let tokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiX2lkIjoiNWRjYTY5NDQzYWMyNzIzMDZiNGRlNmQwIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTczNTQ2MzA4fQ.viUT1CTzzld_YtGI25pchrb_kPfE7I8ofOrM4_giaCc'
let tokenCustomer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIiwiZW1haWwiOiJhcm5vbGRAbWFpbC5jb20iLCJfaWQiOiI1ZGNhNjk3ZDA2NTllNDMwOTQ2MzZlMDUiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE1NzM1NDYzNjZ9.YewFguoR1Mlnn0bHlhkSTaAemeP-UrUxDfM09xylSpM'

let productData = {
    name: 'adidas kw',
    desc: 'ini bukan asli',
    price: 50000,
    stock: 5,
    tags: 'buah'
}




describe('Product Routes', function() {
    this.timeout(15000)
    describe('POST /products',function() {
        describe('Success Process 😎',function() {
            afterEach(function(done) {
                    if(image) {
                        deleteFile(image)
                    }
                    done()
            })
            it('🔔 should return an object (data) with status code 201',function(done) {
                chai.request(app)
                .post('/products')
                .set('token',tokenAdmin)
                .field('name',productData.name)
                .field('desc',productData.desc)
                .field('price',productData.price)
                .field('stock',productData.stock)
                .field('tags',productData.tags)
                .attach(
                    'image',
                    fs.readFileSync('./test/img/durian.jpg'),
                    'durian.jpg'
                    )
                .end(function(err,res) {
                    image = res.body.image
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object').to.have.any.keys('name','desc','price','stock','image')
                    
                    done()
                })
            })
        })
        describe('Error Process ⛔️',function() {
            it('🔔 should return an object message with status code 401 because the role is not admin',function(done){
                chai.request(app)
                .post('/products')
                .set('token',tokenCustomer)
                .field('name',productData.name)
                .field('desc',productData.desc)
                .field('price',productData.price)
                .field('stock',productData.stock)
                .field('tags',productData.tags)
                .attach(
                    'image',
                    fs.readFileSync('./test/img/durian.jpg'),
                    'durian.jpg'
                    )
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.equal('This page is for admin only') 
                    done()
                })
            })
            it('🔔 should return an object message with status code 400 because missing name value',function(done){
                const emptyName = { ...productData }
                delete emptyName.name
                chai.request(app)
                .post('/products')
                .set('token',tokenAdmin)
                .field('desc',emptyName.desc)
                .field('price',emptyName.price)
                .field('stock',emptyName.stock)
                .field('tags',productData.tags)
                .attach(
                    'image',
                    fs.readFileSync('./test/img/durian.jpg'),
                    'durian.jpg'
                    )
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('name is required') 
                    
                    done()
                })
            })
            it('🔔 should return an object message with status code 400 because missing desc value',function(done){
                const emptyName = { ...productData }
                delete emptyName.desc
                chai.request(app)
                .post('/products')
                .set('token',tokenAdmin)
                .field('name',emptyName.name)
                .field('price',emptyName.price)
                .field('stock',emptyName.stock)
                .field('tags',productData.tags)
                .attach(
                    'image',
                    fs.readFileSync('./test/img/durian.jpg'),
                    'durian.jpg'
                    )
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('desc is required') 
                    done()
                })
            })
            it('🔔 should return an object message with status code 400 because missing stock value',function(done){
                const emptyName = { ...productData }
                delete emptyName.stock
                chai.request(app)
                .post('/products')
                .set('token',tokenAdmin)
                .field('desc',emptyName.desc)
                .field('price',emptyName.price)
                .field('name',emptyName.name)
                .field('tags',productData.tags)
                .attach(
                    'image',
                    fs.readFileSync('./test/img/durian.jpg'),
                    'durian.jpg'
                    )
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('stock is required') 
                    
                    done()
                })
            })
            it('🔔 should return an object message with status code 400 because missing price value',function(done){
                const emptyName = { ...productData }
                delete emptyName.price
                chai.request(app)
                .post('/products')
                .set('token',tokenAdmin)
                .field('desc',emptyName.desc)
                .field('name',emptyName.name)
                .field('stock',emptyName.stock)
                .field('tags',productData.tags)
                .attach(
                    'image',
                    fs.readFileSync('./test/img/durian.jpg'),
                    'durian.jpg'
                    )
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object').to.have.any.keys('message')
                    expect(res.body.message).to.be.an('array').that.includes('price is required') 
                    done()
                })
            })
        })
    })
    // READ
    describe('GET /products',function(){
        describe('Success Process',function(){
            it('🔔 should return an object (data) with status code 200',function(done) {
                chai.request(app)
                .get('/products')
                .set('token',tokenAdmin)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    products = res.body[res.body.length - 1]
                    done()
                })
            })
        })
    })
    // UPDATE
    describe('PUT /products',function(){
        describe('Success Process',function(){
            it('🔔 should return a message  with status code 200',function(done) {
                const updateData = { ...productData,name: 'ini update'}
                chai.request(app)
                .put(`/products/${products._id}`)
                .set('token',tokenAdmin)
                .field('name',updateData.name)
                .field('desc',updateData.desc)
                .field('price',updateData.price)
                .field('stock',productData.stock)
                .field('tags',productData.tags)
                .attach(
                    'image',
                    fs.readFileSync('./test/img/semangka.jpg'),
                    'semangka.jpg'
                    )
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body.message).to.equal('update success')   
                    done()
                })
            })
        })
    })
    // DELETE
    describe('DELETE /products',function(){
        describe('Success Process',function(){
            it('🔔 should return delete success',function(done) {
                chai.request(app)
                .delete(`/products/${products._id}`)
                .set('token',tokenAdmin)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body.message).to.equal('delete success')   
                    done()
                })
            })
        })
    })
})