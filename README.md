# E-COM

## register

**POST /register**
* **URL**

  `/register`

* **Method:**

  `POST` 
  
* **Data Body**

   `'key' username 'value' [string] = your username`
 
   `'key' email 'value' [string] = your email`

   `'key' role 'value' [string] = your role (buyer/seller)`

   `'key' password 'value' [string] = your password`

* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "ProductsId": [],
        "balance": 0,
        "_id": "your Id",
        "username": "your Username",
        "email": "your Password",
        "password": "your Hashed Password",
        "role": "your Role"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'Email/Username is already Token' }`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'format email wrong' }`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'password less than 6 characters' }`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'password must a mixed of number and letters' }`

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: 'username/email/password/role is required' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`

## login  

**POST /login**
* **URL**

  `/login`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' email 'value' [string] = your email`

   `'key' password 'value' [string] = your password`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "token": "your token",
        "payload" : "your information"
    }
    ```
 
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ message: 'invalid email/password' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`

## users

*this route mainly for seller to manage their products

**GET /users**
* **URL**

  `/users`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [
        {
            "description": "products description",
            "image": "product link image",
            "stock": "product stock",
            "_id": "product id",
            "seller": "your name as a seller",
            "name": "product name",
            "price": "product price"
        },
        ............................................and more
    ]
        	
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**POST /users**
* **URL**

  `/users`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' description 'value' [string] = your product description`

   `'key' image 'value' [string] = your product image link`

   `'key' stock 'value' [integer] = your product stock`

   `'key' name 'value' [string] = your product name`

   `'key' price 'value' [integer] = your product price`

* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "msg": "successfully created",
        "data": {
            "description": "created product description",
            "image": "created product image link",
            "stock": "created product stock",
            "_id": "created product id",
            "seller": "your name",
            "name": "created product name",
            "price": "created product price"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : 'stock is required' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'name is required' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'price is required' }`

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**GET /users/profile**
* **URL**

  `/users/profile`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "ProductsId": "your listed products in array",
        "balance": "current balance",
        "_id": "your Id",
        "username": "your Username",
        "email": "your Password",
        "password": "your Hashed Password",
        "role": "your Role"
    }
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**PATCH /users/topup**
* **URL**

  `/users/topup`

* **Method:**

  `PATCH` 
  
* **Data Body**
 
    **body:** 

   `'key' balance 'value' [integer] = your added balance`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg": "success top up",
        "balance": "new balance"
    }
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**PATCH /users/:id**
* **URL**

  `/users/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = product Id`

* **Data Body**
 
    **body:** 

   `'key' description 'value' [string] = your product description`

   `'key' image 'value' [string] = your product image link`

   `'key' stock 'value' [integer] = your product stock`

   `'key' name 'value' [string] = your product name`

   `'key' price 'value' [integer] = your product price`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg": "sucessfully updated",
        "data": {
            "description": "updated description",
            "image": "updated image link",
            "stock": "updated stock",
            "_id": "product id",
            "seller": "your name",
            "name": "updated product name",
            "price": "updated product price"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : 'stock is required' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'name is required' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'price is required' }`

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**DELETE /users/:id**
* **URL**

  `/users/:id`

* **Method:**

  `DELETE` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = product Id`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg": "sucessfully deleted",
        "data": {
            "description": "deleted product description",
            "image": "deleted image",
            "stock": "deleted stock",
            "_id": "deleted product id",
            "seller": "your name",
            "name": "deleted product name",
            "price": "deleted product price"
        }
    }
    ```
 
* **Error Response:**


  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**POST /users/upload**
* **URL**

  `/users/upload`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' image 'value' [file] = your image file`

* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        message: 'Your file is successfully uploaded',
        link: your image link url from google cloud storage
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : 'file image is required' }`

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


## products

**GET /products**
* **URL**

  `/products`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [   
        all products that created by sellers
    ],
        	
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`



**GET products/:id**
* **URL**

  `products/:id`

* **Method:**

  `GET` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = article Id`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        selected product information
    }

    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`



**GET products/page/:page**
* **URL**

  `products/page/:page`

* **Method:**

  `GET` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = page number`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
        *one page generate 9 products*
    [
        {
            seller product
        },
        ............................................and other 8
    ]

    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**GET products/search?**
* **URL**

  `products/search?`

* **Method:**

  `GET` 
  
* **Data Query**

    **Query** 

    `'Query' [filter] = filtered product name`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [   
       {
         filtered products
       },
       ............................................and more
    ]

    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**PATCH /products/add/:id**
* **URL**

  `/products/add/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = product Id`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "amount": "amount product added",
        "_id": "cart id",
        "UserId": "your id",
        "ProductId": "product id"
    }
    ```
 
* **Error Response:**


  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**PATCH /products/remove/:id**
* **URL**

  `/products/remove/:id`

* **Method:**

  `PATCH` 
  
* **Data Params**

    **params:** 

    `'params' [integer] = product Id`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "amount": "amount product decrease",
        "_id": "cart id",
        "UserId": "your id",
        "ProductId": "product id"
    }
    ```
 
* **Error Response:**


  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`
    
  * **Code:** 403 <br />
    **Content:** `{ message: 'not authorized' }`


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


## carts

**GET /carts**
* **URL**

  `/carts`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [
        {
            "amount": product amount,
            "_id": "cart Id",
            "UserId": "users information",
            "ProductId" : "products information"
        }
            ............................................and more
    ]
        	
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


## transactions

**GET /transactions**
* **URL**

  `/transactions`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "listedItem": [
            {
                "products": {
                    "amount": "amount of selected product in cart",
                    "_id": "cart Id",
                    "UserId": "cart user information",
                    "ProductId": "product information"
                },
                "amount": "amount to be checked",
                "cost": "total cost from the numbers of product",
                "stockAvailable": "amount that available in market"
            },
            ............................................and more
        ],
        "outOfStock": [
            {
                "outOfStockProducts": {
                    "amount": "amount of selected product in cart",
                    "_id": "cart Id",
                    "UserId": "cart user information",
                    "ProductId": "product information"
                },
                "amountIntended": "amount that failed to proceed",
                "cost": "total cost from the numbers of product",
                "stockAvailable": "amount that available in market"
            },
            ............................................and more
        ],
        "totalCost": total cost from all listedItem,
        "balance": user current balance
    }
        	
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**POST /transactions**
* **URL**

  `/transactions`

* **Method:**

  `POST` 
  
* **Data Body**
 
   `'key' status 'value' [boolean] = transaction status`

   `'key' total 'value' [integer] = your total cost transaction`

   `'key' UserId 'value' [ObjectId] = user id`

   `'key' Products 'value' [array] = listed product information`

   `'key' date 'value' [date] = transaction date`

* **Success Response:**

  * **Code:** 201 <br />
    **Content Example:** 
    ```
    {
        "msg": "success checkout",
        "dataTransaction": {
            "status": "transaction status (delivered/not delivered)",
            "total": "total transaction cost",
            "_id": "transaction Id",
            "UserId": "user id",
            "Products": [
                listed products information,
                ............................................and more
            ],
            "date": "transaction date"
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{ message : 'transaction failed, not enough quantity stock for the items' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'transaction failed, not enough balance' }`

  * **Code:** 400 <br />
    **Content:** `{ message : 'transaction failed no items in your cart' }`

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**GET /transactions/purchased**
* **URL**

  `/transactions/purchased`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [
        {
            "status": purchased status,
            "total": total cost purchased,
            "_id": "transaction id",
            "UserId": "your id",
            "Products": [
                your purchased products
            ],
            "date": "transaction date"
        },
        ............................................and more
    ]

    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**GET /transactions/sold**
* **URL**

  `/transactions/sold`

* **Method:**

  `GET` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    [
        {
            "TransactionId": "transaction Id",
            "UserId": users information that purchased your products,
            "status": transaction status,
            "date": "date transaction",
            "sold": [
                listed products sold
            ]
        },
         ............................................and more
    ]

    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`


**PATCH /transactions/:id**
* **URL**

  `/transactions/:id`

* **Method:**

  `PATCH` 
  
* **Data Body**
 
    **body:** 

   `'key' status 'value' [boolean] = true`

* **Success Response:**

  * **Code:** 200 <br />
    **Content Example:** 
    ```
    {
        "msg": "success change status",
        "data": "transactions information"
    }
    ```
 
* **Error Response:**

  * **Code:** 403 <br />
    **Content:** `{ message : 'not login' }`
    
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: 'Internal Server Error' }`



