# E-Commerce

---
## Usage
Make sure you have node.js installed in your computer,and then run this command :
1. $ npm install
2. $ npm run dev

---

---

#### User

| URL | Method | Headers | Body | Success Status | Error Status |
| --- | ------ | ------- | ---- | -------------- | ------------ |
| /login | POST | none | email(String) , password(string) | 200 | 404,500 |
| /register | POST | none | email(string) , password(string) , full_address(string) , name(string) , role(string/optional) | 201 | 400,500 |
##### Login
* URL

  (base url)/login
* Method
 POST
* URL params
 none
* Data params
 Required : 
   * email=[String]
   * password=[string]
* Success Response 
 Status : 200
 Content :
 ```
 token: 'eyJhbGciOiJIUzabcdefghijklmnopqrstuvwxyz'
 ```
 * Error Response
  Status : 404
  content : 
```
{
    "message": "Wrong email/password"
}
```
---
##### Register
* URL

  (base url)/register
* Method
 POST
* URL params
 none
* Data params
 Required : 
   * email=[String]
   * password=[string]
   * full_address=[string]
   * name = [string]
   * Optional : role = [string] / default: 'Customer'
* Success Response 
 Status : 201
 Content :
 ```
 {
    "user": {
        "name": "hello",
        "_id": "5dc82ef4cb35b84d6bf79583",
        "email": "hello@mail.com",
        "password": "<hashed password>",
        "full_address": "jalan kenari",
        "createdAt": "2019-11-10T15:38:29.124Z",
        "updatedAt": "2019-11-10T15:38:29.124Z"
    }
}
 ```
 * Error Response
  Status : 400
  content : 
```
{
    "message": "Please make sure all required fields are filled"
}
```
---
#### Product

| URL | Method | Headers | Body | Success Status | Error Status |
| --- | ------ | ------- | ---- | -------------- | ------------ |
| /products | GET | none | none | 200 | 403,500 |
| /products | POST | token | name(string) , description(string) , stock(number) , price(number) , image(file) | 201 | 403,400,500 |
| /products/:id | PUT | token | name(string) , description(string) , stock(number) , price(number) , image(file) | 200 | 403,500 |
| /products/:id | DELETE | token | none | 200 | 403,404,500 |

##### Get all product
* Success
```
{
    "message": "Success fetching all products",
    "products": [
        {
            "_id": "5dd0c1f716956213d6e07190",
            "name": "Rick and Morty",
            "price": 150000,
            "stock": 4,
            "image": "https://storage.googleapis.com/image-upload-miniwp/1573962230643ezgif.com-webp-to-png.png",
            "description": "Pink drunk rick and morty with size of all size",
            "__v": 0
        }
    ]
}
```

* Error
```
{
    "message": "Sorry,this site is currently forbidden for you"
}
```
---

##### Create product
* Success
```
{
    "message": "Product successfully created",
    "product": {
        "_id": "5dd19c3fb29f7930ce8e707d",
        "name": "Hand in Space",
        "price": 300000,
        "stock": 5,
        "image": "https://storage.googleapis.com/image-upload-miniwp/1574018109100Headbook-Fashion-Galaxy-Hoodies-3d-Men-Women-Thin-Cool-3d-Sweatshirts-Colorful-Starry-Space-Hand-Print.jpg",
        "description": "For those who love space.The size is all size",
        "__v": 0
    }
}
```
* Error
```
{
    "message": "Sorry,this site is currently forbidden for you"
}
```
---

##### Delete product
* Success
```
{
    "message": "Product successfully deleted",
    "product": {
        "_id": "5dd19c3fb29f7930ce8e707d",
        "name": "Hand in Space",
        "price": 300000,
        "stock": 5,
        "image": "https://storage.googleapis.com/image-upload-miniwp/1574018109100Headbook-Fashion-Galaxy-Hoodies-3d-Men-Women-Thin-Cool-3d-Sweatshirts-Colorful-Starry-Space-Hand-Print.jpg",
        "description": "For those who love space.The size is all size",
        "__v": 0
    }
}
```

* Error
```
{
    "message": "Sorry,this site is currently forbidden for you"
}
```
---

#### Cart 

| URL | Method | Headers | Body | Success Status | Error Status |
| --- | ------ | ------- | ---- | -------------- | ------------ |
| /transactions | GET | token | none | 200 | 403,500 |
| /transactions | POST | token | quantity(number) , productId(object id) | 201 | 403,400,500 |
| /transactions/checkout | PUT | token | none | 200 | 403,500 |
| /transactions/:id | DELETE | token | none | 200 | 403,404,500 |

##### Get my transaction
* Success
```
    "transaction": [
        {
            "checkout": false,
            "_id": "5dd192093dbceb143b8c3983",
            "user": {
                "role": "Admin",
                "_id": "5dcf87786ab80e3052372774",
                "name": "tiger",
                "email": "tiger@mail.com",
                "password": <hashed password>,
                "full_address": "jalan kenari",
                "__v": 0
            },
            "product": {
                "_id": "5dd0c1f716956213d6e07190",
                "name": "Rick and Morty",
                "price": 150000,
                "stock": 4,
                "image": "https://storage.googleapis.com/image-upload-miniwp/1573962230643ezgif.com-webp-to-png.png",
                "description": "Pink drunk rick and morty with size of all size",
                "__v": 0
            },
            "quantity": 1,
            "subTotal": 150000,
            "createdAt": "2019-11-17T18:31:37.280Z",
            "updatedAt": "2019-11-17T18:31:37.280Z",
            "__v": 0
        },
    ]
```

* Error
```
{
    "message": "Sorry,this site is currently forbidden for you"
}
```
---

##### Checkout
* Success
```
{
    "message": "Checkout success"
}
```

* Error
```
{
    "message": "Sorry,this site is currently forbidden for you"
}
```
---

##### Create transaction
* Success
```
{
    "message": "Transaction created",
    "transaction": {
        "checkout": false,
        "_id": "5dd19da4b29f7930ce8e707e",
        "user": "5dcf87786ab80e3052372774",
        "product": "5dd0c1f716956213d6e07190",
        "quantity": 2,
        "subTotal": 300000,
        "createdAt": "2019-11-17T19:21:08.380Z",
        "updatedAt": "2019-11-17T19:21:08.380Z",
        "__v": 0
    }
}
```

* Error
```
{
    "message": "Sorry,this site is currently forbidden for you"
}
```
---