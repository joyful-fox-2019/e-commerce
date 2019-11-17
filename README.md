**E-Commerce API Documentation**
---
Simple E-Commerce app with authenthication and authorization API build using Express, Mongoose, and JSON Web Token in the server side. As for the client side, it was built using Vue (including Vuex and Vue CLI) and Bootstrap 4.

## List of API Routes

Route | HTTP | Description
----- | ---- | -----------
/register | POST | Route used to create a new account
/login | POST | Route used to let user login to app
/products | GET | Route used to retrieve all products in database
/products/:name | GET | Route used to retrieve one product based on it's name
/products | POST | Route used to create a new product
/products | PUT | Route used to edit and update a product
/products | DELETE | Route used to delete a product
/img/upload | POST | Route used to upload an image
/categories | GET | Route used to retrieve categories data
/categories/:name | GET | Route used to retrieve one category based on it's name
/carts | GET | Route used to retrieve user's personal cart
/carts/add | PATCH | Route used to add a product to the cart
/carts/remove | PATCH | Route used to remove a product from the cart
/transactions/user | GET | Route used to retrieve transaction data
/transactions/completed | GET | Route used to retrieve transaction data
/transactions/uncompleted | GET | Route used to retrieve transaction data
/transactions | POST | Route used to checkout and create a transaction
/transactions/tracknumber/:id | PATCH | Route used to add a track number to the transaction
/transactions/confirm/:id | PATCH | Route used to confirm that the transaction is completed

## Usage

With only npm: 

```javascript
npm install in server and client
npm run dev in server folder
npm run serve in client folder
```

**Register**
----
  Register new account to the database and returns a json response if succeeded.

* **URL**

  /register

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

```javascript
{
    "name" : String,
    "password" : String,
    "email" : String,
    "address" : String
} 
```

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ success: true, message: Account successfully registered }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Log In**
----
  Verify user's authentication and returns token if data is valid.

* **URL**

  /login

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

```javascript
{
    "email" : String,
    "password" : String
} 
```

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ token: token retrieved from server generated using json web token }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Wrong email or password" }`

**Get Products**
----
  Request to retrieve all products data

* **URL**

  /products

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all products data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Get One Products**
----
  Request to retrieve one products data

* **URL**

  /products/:name

* **Method:**
  
  `GET`

* **URL Params**

  name

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ products data as an object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`


**Create a product**
----
  Post request to server to create a product.

* **URL**

  /products

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

```javascript
{
    "name" : String,
    "category" : String,
    "description" : String,
    "stock" : Number,
    "price" : Number,
    "image": File
} 
```

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ data : post data}`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: Admin's exclusive feature" }`


**Edit Product**
----
  Edit product and update the existing data in the database.

* **URL**

  /products/:id

* **Method:**
  
  `PUT`

* **URL Params**

  id (edited product)

* **Data Params**

```javascript
{
    "name" : String,
    "category" : String,
    "description" : String,
    "Stock" : Number,
    "Price" : Number,
    "image": File
} 
```

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully updated product }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: Admin's exclusive feature" }`


**Delete Product**
----
  Delete product from the database 

* **URL**

  /products/:id

* **Method:**
  
  `DELETE`

* **URL Params**

  id (deleted product)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message: Successfully deleted product }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: Admin's exclusive feature" }`


**Get Categories**
----
  Request to retrieve all categories data

* **URL**

  /categories

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all categories data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

**Get One Category**
----
  Request to retrieve all categories data

* **URL**

  /categories/:name

* **Method:**
  
  `GET`

* **URL Params**

  name

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ category data as an object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`


**Get Cart**
----
  Request to retrieve cart data

* **URL**

  /carts

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all carts data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`


**Add product to cart**
----
  Request to add a product to cart 

* **URL**

  /carts/add

* **Method:**
  
  `PATCH`

* **URL Params**

  None required

* **Data Params**

  Product

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ product, msg }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`


**Remove product from cart**
----
  Request to add a product to cart 

* **URL**

  /carts/remove

* **Method:**
  
  `PATCH`

* **URL Params**

  None required

* **Data Params**

  Product

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ product, msg }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

**Get Transactions**
----
  Request to retrieve all transactions data

* **URL**

  /transactions

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all transactions data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: Admin's exclusive feature" }`

**Get Completed Transactions**
----
  Request to retrieve all completed transactions data

* **URL**

  /transactions/completed

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all completed transactions data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: Admin's exclusive feature" }`

**Get Uncompleted Transactions**
----
  Request to retrieve all uncompleted transactions data

* **URL**

  /transactions/uncompleted

* **Method:**
  
  `GET`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  None required

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all uncompleted transactions data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: Admin's exclusive feature" }`

**Input track number**
----
  Request to update trackNumber value in transaction

* **URL**

  /transactions/tracknumber/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id (transaction's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: Admin's exclusive feature" }`

**Confirm transaction**
----
  Request to update transaction to completed

* **URL**

  /transactions/confirm/:id

* **Method:**
  
  `PATCH`

* **URL Params**

  id (transaction's id)

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`

**Checkout**
----
  Request to checkout and create a new transaction

* **URL**

  /transactions/

* **Method:**
  
  `POST`

* **URL Params**

  None required

* **Data Params**

  None required

* **Headers**

  token (used to let server verify the identity of user who requested the data)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ all products data as an array of object }`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ err : error object }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Token not found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Validation Error: User's exclusive feature" }`













