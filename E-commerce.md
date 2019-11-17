# E-commerce

------

## **1. `POST` User / Register**

  Register new user and will returns data user and password that has been hashed.

- **URL**

  /user/register

- **Method:**

  `POST`

- **URL params**

  none

- **Data Body**

  ```json
  username=[string]
  email=[string]
  password=[string]
  role=[string]
  ```

- **Success Response:**

  - **Code:** 201 
    **Content:** 

    ```json
    { username : "username",
      email : "email",
      role : "customer / admin",
      password : "$2a$10$ASA5ZM/cnNoBcR/OIl1iZOczgacDPUamq3Kwrmn1C01Pw0u4.4Iqi" }
    ```

    **Error Response:**

  - **Code:** 400 BAD REQUEST 
    **Content:** `{ error : "username / password required" }/{ error : "username / password has been taken" }`

- **Sample Input:**

  ```JSON
  {
      "username": "username",
      "email": "email",
      "role": "role",
      "password": "123456"
  }
  ```



## **2.  `POST` User / Login**

  Login user and will returns username, email, role and data Token.

- **URL**

  /user/login

- **Method:**

  `POST`

- **URL params**

  none

- **Data Body**

  ```
  username=[string] or email=[string]
  password=[string]
  ```

- **Success Response:**

  - **Code:** 200
    **Content:** 

    ```json
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTY5OTgwMDE0fQ.UOxbgr1EY5sXCM1csgZIjba2vbbML-Tc-LtqDTKs5NY",
     "username": "username",
     "email": "email",
     "role": "role"
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `{ error : "username / password wrong" }`
  - **Code:** 500 
    **Content:** `{ error : "Internal server error" }`

- **Sample Input:**

  ```JSON
  {
      "username": "username" or "email": "email"
      "password": "123456"
  }
  ```

## **3.  `POST`  / Admin**

  Add new Product

- **URL**

  /admin

- **Method:**

  `POST`

- **Headers**

  "token"=[string token]

- **Data Body**

  ```
  name=[string]
  category=[string]
  description=[string]
  price=[integer]
  stock=[integer]
  ```

- **Success Response:**

  - **Code:** 201 CREATED
    **Content:** 

    ```json
    {
     "name": "product-name",
     "category": "category",
     "description": "description",
     "price": 12000,
     "stock": 10
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `{ error : "Product name is required" }`
  - **Code:** 500 
    **Content:** `{ error : "Internal server error" }`

- **Sample Input:**

  ```JSON
  {
      "name": "Kulkas",
       "category": "electronic",
       "description": "Sharp lk-21",
       "price": 2200000,
       "stock": 10
  }
  ```

## **4.  `PATCH` / Admin / :id**

  Update product by id

- **URL**

  /admin/:id

- **Method:**

  `PATCH`

- **Headers**

  ```
  "token"=[string token]
  ```

- **Params**   

  ```
  "id"=[product-id, String]
  ```

- **Data Body**

  ```
  name=[string] OR
  category=[string] OR
  description=[string] OR
  price=[integer] OR
  stock=[integer]
  ```

- **Success Response:**

  - **Code:** 200 SUCCESS
    **Content:** 

    ```json
    {
     "modified": 1
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `{ error : "Bad Request" }`
  - **Code:** 500 
    **Content:** `{ error : "Internal server error" }`

- **Sample Input:**

  ```JSON
  {
      "name": "Kulkas",
       "category": "electronic",
       "description": "Sharp g-200",
       "price": 3000000,
       "stock": 5
  }
  ```



## **5.  `DELETE` / Admin / Delete / :id**

  Delete product by id_product

- **URL**

  /admin/delete/:id

- **Method:**

  `DELETE`

- **Headers**

  ```json
  "token"=[string token]
  ```

- **Data Body**

  ```
  name=[string]
  category=[string]
  description=[string]
  price=[integer]
  stock=[integer]
  ```

- **Success Response:**

  - **Code:** 200 SUCCESS
    **Content:** 

    ```json
    {
     "deleted": 1
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `{ error : "Product not found" }`
  - **Code:** 500 
    **Content:** `{ error : "Internal server error" }`

- **Sample Input:**

  ```JSON
  {
      "id": "23d1f45gf2ddf4d21"
  }
  ```



## **6.  `GET` / Product** 

  Get all data product

- **URL**

  /product

- **Method:**

  `GET`

- **Headers**

  "token"=[string token]

- **Data Body**

  ```json
  "none"
  ```

- **Success Response:**

  - **Code:** 200 SUCCESS
    **Content:** 

    ```json
    {
     "name": "product-name",
     "category": "category",
     "description": "description",
     "price": 12000,
     "stock": 10
    },
    {
     "name": "product-name",
     "category": "category",
     "description": "description",
     "price": 12000,
     "stock": 10
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `{ error : "Product not found" }`
  - **Code:** 500 
    **Content:** `{ error : "Internal server error" }`

- **Sample Input:**

  ```JSON
  "none"
  ```



## **7.  `POST` / customer / add / :id** 

  Add product to Cart

- **URL**

  /customer/add/:id

- **Method:**

  `POST`

- **Headers**

  "token"=[string token]

- **Data Body**

  ```json
  "none"
  ```

- **Success Response:**

  - **Code:** 201 CREATED
    **Content:** 

    ```json
    {
     "name": "product-name",
     "category": "category",
     "pcs": 2,
     "price": 12000,
     "total_price": 24000
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST
    **Content:** `{ error : "Product out of stock" }`
  - **Code:** 500 
    **Content:** `{ error : "Internal server error" }`

- **Sample Input:**

  ```JSON
  "none"
  ```



## **8.  `DELETE` / customer / cart / :id** 

   Cancel Product from cart

- **URL**

  /customer/cart/:id

- **Method:**

  `DELETE`

- **Headers**

  "token"=[string token]

- **Data Body**

  ```json
  "none"
  ```

- **Success Response:**

  - **Code:** 200 SUCCESS
    **Content:** 

    ```json
    {
     "deleted": 1
    }
    ```

- **Error Response:**

  - **Code:** 500 
    **Content:** `{ error : "Internal server error" }`

- **Sample Input:**

  ```JSON
  "none"
  ```



## **9.  `POST` / customer / checkout**

  	Checkout product from cart

- **URL**

  /customer/checkout

- **Method:**

  `POST`

- **Headers**

  "token"=[string token]

- **Data Body**

  ```json
  "none"
  ```

- **Success Response:**

  - **Code:** 200 SUCCESS
    **Content:** 

    ```json
    {
     "name": "product-name",
     "pcs": 2,
     "price": 12000,
     "total_price": 24000
    }
    ```

- **Error Response:**

  - **Code:** 500 
    **Content:** `{ error : "Internal server error" }`

- **Sample Input:**

  ```JSON
  "none"
  ```

















