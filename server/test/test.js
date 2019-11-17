const chaiHttp = require("chai-http");
const chai = require("chai");
const app = require("../app");
const User = require('../models/UserModel')
const Product = require('../models/ProductModel')
const jwt = require('../helpers/jwt')
const expect = chai.expect;

chai.use(chaiHttp);

before(function() {
  return User.deleteMany();
});

before(function(){
  return Product.deleteMany()
})

describe("User testing", () => {
  describe("User register testing",()=>{
    it("should register without error", done => {
      let body = {
        username: "test",
        password: "testtest",
        email: "test@test.com"
      };
      chai
        .request(app)
        .post("/users/register")
        .send(body)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.property("token")
          expect(res).to.have.status(201)
          done()
        });
    });
  
    it("should error with status (400) with message 'username is required' ", done => {
      let body = {
        username: "",
        password: "testtest",
        email: "test1@test.com"
      };
      chai
        .request(app)
        .post("/users/register")
        .send(body)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('arr')
          expect(res.body.arr).to.be.an('array').that.includes('Username is required')
          done()
        });
    });
  
    it("should error with status (400) with message 'Password is required' ", done => {
      let body = {
        username: "test",
        password: "",
        email: "test1@test.com"
      };
      chai
        .request(app)
        .post("/users/register")
        .send(body)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('arr')
          expect(res.body.arr).to.be.an('array').that.includes('Password is required')
          done()
        });
    });
  
    it("should error with status (400) with message 'email is required' ", done => {
      let body = {
        username: "test",
        password: "testtest",
        email: ""
      };
      chai
        .request(app)
        .post("/users/register")
        .send(body)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('arr')
          expect(res.body.arr).to.be.an('array').that.includes('Email is required')
          done()
        });
    });
  
    it("should error with status (400) with message 'Email already in use' ", done => {
      let body = {
        username: "test",
        password: "testtest",
        email: "test@test.com"
      };
      chai
        .request(app)
        .post("/users/register")
        .send(body)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('arr')
          expect(res.body.arr).to.be.an('array').that.includes('email already in use')
          done()
        });
    });
  
    it("should error with status (400) with message 'Email format is invalid' ", done => {
      let body = {
        username: "test",
        password: "testtest",
        email: "testtest.com"
      };
      chai
        .request(app)
        .post("/users/register")
        .send(body)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('arr')
          expect(res.body.arr).to.be.an('array').that.includes('Email format is invalid')
          done()
        });
    });
  })

  describe("User login testing",()=>{
    it("should success login user with return token",done=>{
      let body ={
        email : "test@test.com",
        password : "testtest"
      };
      chai
        .request(app)
        .post("/users/login")
        .send(body)
        .end((err,res)=>{
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.an('object')
          expect(res.body).to.have.property('token')
          done()
        })
    })

    it("should error with status (403) with message 'Email / password invalid' ", done => {
      let body = {
        password: "test",
        email: "an@test.com"
      };
      chai
        .request(app)
        .post("/users/login")
        .send(body)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Email / password invalid')
          done()
        });
    });

    it("should error with status (403) with message 'Email / password invalid' ", done => {
      let body = {
        password: "",
        email: "test@test.com"
      };
      chai
        .request(app)
        .post("/users/login")
        .send(body)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('Email / password invalid')
          done()
        });
    });

  })
  

});

describe("product testing",()=>{
  let adminToken = ''
  let userToken = ''
  let productId = ''

  let product = {
    name : 'kuda',
    stock : 100,
    price : 10000,
    detail : 'kuda dengan 4 kaku'
  }

  before(async function(){
    try {
      // generate admin token
      const user = await User.create({
        email : 'admin@admin.com',
        password : 'adminadmin',
        username : 'admin',
        admin : true
      })
      let payload = {
        _id : user._id,
        username : user.username,
        admin: true
      }
      adminToken = jwt.getToken(payload)

      // generate user token
      const userDummy = await User.create({
        email : 'dummy@dummy.com',
        password : 'dummydummy',
        username : 'dummy',
      })
      let payloadDummy = {
        _id : userDummy._id,
        username : userDummy.username,
        admin: false
      }
      userToken = jwt.getToken(payloadDummy)
    } catch (error) {
      console.log(error);
    }
  })

  describe("create product testing",()=>{
    it('should success create new product with status (201)',done=>{
      chai
        .request(app)
        .post('/products/add')
        .send(product)
        .set('token',adminToken)
        .end((err,res)=>{
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys(
            "_id",
            "name",
            "stock",
            "price",
            "detail",
            "image",
            "createdAt",
            "updatedAt"
          )
          productId = res.body._id
          productName = res.body.name
          done()
        })
    })
  
    it('should error with code (401) because missing token',done=>{
      chai
        .request(app)
        .post('/products/add')
        .send(product)
        .end((err,res)=>{
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('You are not authorize to perform this action')
          done()
        })
    })
  
    it('should error with code (400) because missing product name',done=>{
      let missingProduct = {...product}
      delete missingProduct.name
      chai
        .request(app)
        .post('/products/add')
        .send(missingProduct)
        .set('token',adminToken)
        .end((err,res)=>{
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('arr')
          expect(res.body.message).to.equal('Validation Error')
          expect(res.body.arr).to.be.an('array').that.includes("Product's name is required")
          done()
        })
    })
  
    it('should error with code (400) because missing product detail',done=>{
      let missingProduct = {...product}
      delete missingProduct.detail
      chai
        .request(app)
        .post('/products/add')
        .send(missingProduct)
        .set('token',adminToken)
        .end((err,res)=>{
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('arr')
          expect(res.body.message).to.equal('Validation Error')
          expect(res.body.arr).to.be.an('array').that.includes("Product's detail is required")
          done()
        })
    })
  
    it('should error with code (400) because missing product price',done=>{
      let missingProduct = {...product}
      delete missingProduct.price
      chai
        .request(app)
        .post('/products/add')
        .send(missingProduct)
        .set('token',adminToken)
        .end((err,res)=>{
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('arr')
          expect(res.body.message).to.equal('Validation Error')
          expect(res.body.arr).to.be.an('array').that.includes("Product's price is required")
          done()
        })
    })
  
    it('should error with code (400) because missing product stock',done=>{
      let missingProduct = {...product}
      delete missingProduct.stock
      chai
        .request(app)
        .post('/products/add')
        .send(missingProduct)
        .set('token',adminToken)
        .end((err,res)=>{
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('arr')
          expect(res.body.message).to.equal('Validation Error')
          expect(res.body.arr).to.be.an('array').that.includes("Product's stock is required")
          done()
        })
    })

    it('should error with code (401) because unauthorized token',done=>{
      chai
        .request(app)
        .post('/products/add')
        .send(product)
        .set('token',userToken)
        .end((err,res)=>{
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('You are not authorize to perform this action')
          done()
        })
    })
  })

  describe('updated product testing',()=>{
    let updateProduct = {
      name : 'kuda',
      stock : 100,
      price : 10000,
      detail : 'kuda dengan 4 kaku'
    }

    it('should success update a product with status (201)',done=>{
      chai
        .request(app)
        .patch(`/products/${productId}`)
        .send(updateProduct)
        .set('token',adminToken)
        .end((err,res)=>{
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('updated')
          expect(res.body.updated).to.have.property('n').to.equal(1)
          expect(res.body.updated).to.have.property('nModified').to.equal(1)
          expect(res.body.updated).to.have.property('ok').to.equal(1)          
          expect(res.body.message).to.equal('Product updated!')
          done()
        })
    })

    it('should error update a product with status (401) because unauthorize user',done=>{
      chai
        .request(app)
        .patch(`/products/${productId}`)
        .send(updateProduct)
        .set('token',userToken)
        .end((err,res)=>{
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('You are not authorize to perform this action')
          done()
        })
    })
  })

  describe('read all product',()=>{
    it('should success read all product with status code (200)',done=>{
      chai
        .request(app)
        .get('/products')
        .end((err,res)=>{
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('products')
          expect(res.body.products).to.be.an('array')
          done()
        })
    })
  })

  describe('delete product testing',()=>{
    it('should success delete product with status code (200)',done=>{
      chai
      .request(app)
      .delete(`/products/${productId}`)
      .set('token',adminToken)
      .end((err,res)=>{
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('deleted')
        expect(res.body.deleted).to.have.property('n').to.equal(1)
        expect(res.body.deleted).to.have.property('deletedCount').to.equal(1)
        expect(res.body.deleted).to.have.property('ok').to.equal(1)      
        expect(res.body.message).to.equal('Product deleted')
        done()
      })
    })

    it('should error delete product with status code (401) because unauthorize user',done=>{
      chai
      .request(app)
      .delete(`/products/${productId}`)
      .end((err,res)=>{
        expect(res).to.have.status(401)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('You are not authorize to perform this action')
        done()
      })
    })

    it('should error delete product with status code (401) because unauthorize user (invalid Token)',done=>{
      chai
      .request(app)
      .delete(`/products/${productId}`)
      .set('token',userToken)
      .end((err,res)=>{
        expect(res).to.have.status(401)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('You are not authorize to perform this action')
        done()
      })
    })

  })

  describe('update cart and delete cart',()=>{

    describe('update cart',()=>{
      it('should success create new cart with status (201) (updating user)',done=>{
        let cart = {
          product : productId,
          qty : 2
        }
        chai
          .request(app)
          .post('/users/add-cart')
          .send(cart)
          .set('token',userToken)
          .end((err,res)=>{
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('updated')
            expect(res.body.updated).to.have.property('n').to.equal(1)
            expect(res.body.updated).to.have.property('nModified').to.equal(1)
            expect(res.body.updated).to.have.property('ok').to.equal(1)
            expect(res.body.message).to.equal('Cart updated!')
            done()
          })
      })

      it('should error with status (401) because mising token',done=>{
        let cart = {
          product : productId,
          qty : 2
        }
        chai
          .request(app)
          .post('/users/add-cart')
          .send(cart)
          .end((err,res)=>{
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('You are not authorize to perform this action')
            done()
          })
      })
    })

    describe('delete item in cart',()=>{
      it('it should success removing item in cart',done=>{
        let productName = {
          productName: 'kuda'
        }
        chai
          .request(app)
          .patch(`/users/remove-item`)
          .set('token',userToken)
          .send(productName)
          .end((err,res)=>{
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.have.property('message')
            expect(res.body).to.have.property('updated')
            expect(res.body.updated).to.have.property('n').to.equal(1)
            expect(res.body.updated).to.have.property('nModified').to.equal(1)
            expect(res.body.updated).to.have.property('ok').to.equal(1)
            expect(res.body.message).to.equal('Item removed from cart')
            done()
          })
      })
    })

  })

})