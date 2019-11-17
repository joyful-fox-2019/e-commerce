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


#### Cart 

| URL | Method | Headers | Body | Success Status | Error Status |
| --- | ------ | ------- | ---- | -------------- | ------------ |
| /transactions | GET | token | none | 200 | 403,500 |
| /transactions | POST | token | quantity(number) , productId(object id) | 201 | 403,400,500 |
| /transactions/checkout | PUT | token | none | 200 | 403,500 |
| /transactions/:id | DELETE | token | none | 200 | 403,404,500 |