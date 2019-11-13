const chai = require('chai')
    , chaiHttp = require('chai-http')
    , fs = require('fs')
    , Product = require('../models/Product')
    // , { deleteFile } = require('../middlewares/images')
chai.use(chaiHttp)
const expect = chai.expect

const app = require('../app')

let tokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiX2lkIjoiNWRjYTY5NDQzYWMyNzIzMDZiNGRlNmQwIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTczNTQ2MzA4fQ.viUT1CTzzld_YtGI25pchrb_kPfE7I8ofOrM4_giaCc'
let tokenCustomer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIiwiZW1haWwiOiJhcm5vbGRAbWFpbC5jb20iLCJfaWQiOiI1ZGNhNjk3ZDA2NTllNDMwOTQ2MzZlMDUiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE1NzM1NDYzNjZ9.YewFguoR1Mlnn0bHlhkSTaAemeP-UrUxDfM09xylSpM'
let productId = '5dcab15e7c7d631bcff63794'
let productData = {
    name: 'adidas kw',
    desc: 'ini bukan asli',
    price: 50000,
    stock: 5,
    tags: 'buah'
}




describe('Cart Routes', function() {
    this.timeout(15000)
    describe('PATCH /carts',function() {
        describe('Success Process 😎',function() {
            it('🔔 should return an object (data) with status code 201',function(done) {
                chai.request(app)
                .post(`/carts/${productId}`)
                .set('token',tokenCustomer)
                .end(function(err,res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    // expect(res.body).to.be.an('object').to.have.any.keys('name','desc','price','stock','image')
                    console.log(res.body);
                    
                    done()
                })
            })
        })
        // describe('Error Process ⛔️',function() {
        //     it('🔔 should return an object message with status code 401 because the role is not admin',function(done){
        //         chai.request(app)
        //         .post('/products')
        //         .set('token',tokenCustomer)
        //         .field('name',productData.name)
        //         .field('desc',productData.desc)
        //         .field('price',productData.price)
        //         .field('stock',productData.stock)
        //         .field('tags',productData.tags)
        //         .attach(
        //             'image',
        //             fs.readFileSync('./test/img/durian.jpg'),
        //             'durian.jpg'
        //             )
        //         .end(function(err,res) {
        //             expect(err).to.be.null
        //             expect(res).to.have.status(401)
        //             expect(res.body).to.be.an('object').to.have.any.keys('message')
        //             expect(res.body.message).to.equal('This page is for admin only') 
        //             done()
        //         })
        //     })
        // })
    })
    // READ
    // describe('GET /products',function(){
    //     describe('Success Process',function(){
    //         it('🔔 should return an object (data) with status code 200',function(done) {
    //             chai.request(app)
    //             .get('/products')
    //             .set('token',tokenAdmin)
    //             .end(function(err,res) {
    //                 expect(err).to.be.null
    //                 expect(res).to.have.status(200)
    //                 expect(res.body).to.be.an('array')
    //                 products = res.body[res.body.length - 1]
    //                 done()
    //             })
    //         })
    //     })
    // })
    // UPDATE
    // describe('PUT /products',function(){
    //     describe('Success Process',function(){
    //         it('🔔 should return a message  with status code 200',function(done) {
    //             const updateData = { ...productData,name: 'ini update'}
    //             chai.request(app)
    //             .put(`/products/${products._id}`)
    //             .set('token',tokenAdmin)
    //             .field('name',updateData.name)
    //             .field('desc',updateData.desc)
    //             .field('price',updateData.price)
    //             .field('stock',productData.stock)
    //             .field('tags',productData.tags)
    //             .attach(
    //                 'image',
    //                 fs.readFileSync('./test/img/semangka.jpg'),
    //                 'semangka.jpg'
    //                 )
    //             .end(function(err,res) {
    //                 expect(err).to.be.null
    //                 expect(res).to.have.status(200)
    //                 expect(res.body.message).to.equal('update success')   
    //                 done()
    //             })
    //         })
    //     })
    // })
    // DELETE
    // describe('DELETE /products',function(){
    //     describe('Success Process',function(){
    //         it('🔔 should return delete success',function(done) {
    //             chai.request(app)
    //             .delete(`/products/${products._id}`)
    //             .set('token',tokenAdmin)
    //             .end(function(err,res) {
    //                 expect(err).to.be.null
    //                 expect(res).to.have.status(200)
    //                 expect(res.body.message).to.equal('delete success')   
    //                 done()
    //             })
    //         })
    //     })
    // })
})