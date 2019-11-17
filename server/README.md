# E-Commerce

## Getting Started
---
Welcome to E-Commerce! <br/>
You can use the API for user, product, cart and transaction management.<br/>
All API access is performed over HTTP and accessed from the http://ecommerce.server.edirates.xyz.<br/>

API Base URL :
```html
  http://ecommerce.server.edirates.xyz
```
Client URL :
```html
  http://ecommerce.edirates.xyz
```

---
# Users

**1. Sign Up**
----
Register a new user :
| Syntax                        | Description   |
| ----------------------------- | ------------- |
| **URL**                       | `/signup`     |
| **Method**                    | `POST`        |
| **Authentication Required**   | NO            |
| **Authorization Required**    | NO            |

Request Body :
| Field Name                    | Value                  |
| ----------------------------- | ---------------------- |
| **email**                     | `<your email address>` |
| **password**                  | `<your password>`      |
| **name**                      | `<your full name>`     |
| **address**                   | `<your address>`       |
| **phone_number**              | `<your phone number>`  |

Success Response :
  * **HTTP Code :** 201 (Created)
  * **JSON Response :**
  ```html
  {
    "user_data": {
        "_id": "5dcf60b170fcc15b1d95fabf",
        "name": "Jon Snow",
        "email": "jon@snow.com",
        "address": "Winterfell",
        "phone_number": "0898987788",
        "balance": "0"
    },
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGNmNjBiMTcwZmNjMTViMWQ5NWZhYmYiLCJuYW1lIjoiSm9uIFNub3ciLCJlbWFpbCI6ImpvbkBzbm93LmNvbSIsImlhdCI6MTU3Mzg3MTc5M30.q0bXluxT1FqcmQYLdIpwKgtq3bbfvAC-oDtspRGpwjI"
  }
  ```
Error Response : 
  * **HTTP Code :** 400 (Bad Request)
  * **JSON Response :**
  ```html
  {
    "message": [
        "Email must be unique.",
        "Invalid email format.",
        "Password length at least 8 characters."
    ]
  }
  ```

**2. Sign In**
----
Sign in with an existing user :
| Syntax                        | Description   |
| ----------------------------- | ------------- |
| **URL**                       | `/signin`     |
| **Method**                    | `POST`        |
| **Authentication Required**   | NO            |
| **Authorization Required**    | NO            |

Request Body :
| Field Name                    | Value                  |
| ----------------------------- | ---------------------- |
| **email**                     | `<your email address>` |
| **password**                  | `<your password>`      |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "user_data": {
        "_id": "5dcf60b170fcc15b1d95fabf",
        "name": "Jon Snow",
        "email": "jon@snow.com",
        "address": "Winterfell",
        "phone_number": "0898987788",
        "balance": "0"
    },
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGNmNjBiMTcwZmNjMTViMWQ5NWZhYmYiLCJuYW1lIjoiSm9uIFNub3ciLCJlbWFpbCI6ImpvbkBzbm93LmNvbSIsImlhdCI6MTU3Mzg3MjA3NH0.LuMeQaeJkeu8qBDEz_b4MJVTvjyEndJGCyok-dOxMco"
  }
  ```
Error Response : 
  * **HTTP Code :** 400 (Bad Request)
  * **JSON Response :**
  ```html
  {
    "message": "User not found.",
  }
  ```

---
# Products

**1. Show All Products**
----
Show all products from all users in database :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/products/`      |
| **Method**                    | `GET`             |
| **Authentication Required**   | NO                |
| **Authorization Required**    | NO                |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  [
    {
        "featured_image": "https://storage.googleapis.com/miniwp.images.edirates.xyz/1573468798693macpro.jpeg",
        "status": true,
        "_id": "5dc93a80e83877415641a0e2",
        "name": "Macbook",
        "description": "Beautiful thing",
        "price": 25000000,
        "stock": 5,
        "UserId": "5dc93a5ee83877415641a0e1",
        "createdAt": "2019-11-11T10:40:00.906Z",
        "updatedAt": "2019-11-11T10:40:00.906Z",
        "__v": 0
    },
    {
        "featured_image": "https://storage.googleapis.com/miniwp.images.edirates.xyz/1573467818663images.jpeg",
        "status": false,
        "_id": "5dc936ab7b21aa3ec060c8e2",
        "name": "Macbook Air",
        "description": "Light is good",
        "price": 15000000,
        "stock": 10,
        "UserId": "5dc9350e7b21aa3ec060c8e1",
        "createdAt": "2019-11-11T10:23:39.579Z",
        "updatedAt": "2019-11-11T10:32:11.084Z",
        "__v": 0
    }
  ]
  ```
Error Response : 
  * **HTTP Code :** 500 (Internal Server Error)
  * **JSON Response :**
  ```html
  {
    "message": "Internal Server Error."
  }
  ```

**2. Show My Products**
----
Show all products from logged-in user :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/products/user`  |
| **Method**                    | `GET`             |
| **Authentication Required**   | YES               |
| **Authorization Required**    | NO                |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  [
    {
        "featured_image": "https://storage.googleapis.com/miniwp.images.edirates.xyz/1573468798693macpro.jpeg",
        "status": true,
        "_id": "5dc93a80e83877415641a0e2",
        "name": "Macbook",
        "description": "Beautiful thing",
        "price": 25000000,
        "stock": 5,
        "UserId": "5dc93a5ee83877415641a0e1",
        "createdAt": "2019-11-11T10:40:00.906Z",
        "updatedAt": "2019-11-11T10:40:00.906Z",
        "__v": 0
    }
  ]
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

**3. Show Detail of One Product**
----
Show detail of a specific product :
| Syntax                        | Description             |
| ----------------------------- | ----------------------- |
| **URL**                       | `/products/:id`         |
| **Method**                    | `GET`                   |
| **Authentication Required**   | NO                      |
| **Authorization Required**    | NO                      |

Request Params :
| Field Name                    | Value                 |
| ----------------------------- | --------------------- |
| **id**                        | `<product ID>`        |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "featured_image": "https://storage.googleapis.com/miniwp.images.edirates.xyz/1573467818663images.jpeg",
    "status": false,
    "_id": "5dc936ab7b21aa3ec060c8e2",
    "name": "Macbook Air",
    "description": "Light is good",
    "price": 15000000,
    "stock": 10,
    "UserId": {
        "balance": 0,
        "privilege": "user",
        "_id": "5dc9350e7b21aa3ec060c8e1",
        "email": "edirates@gmail.com",
        "name": "Edison",
        "address": "Hacktiv8",
        "phone_number": "08117489898",
        "createdAt": "2019-11-11T10:16:46.986Z",
        "updatedAt": "2019-11-11T10:16:46.986Z",
        "__v": 0
    },
    "createdAt": "2019-11-11T10:23:39.579Z",
    "updatedAt": "2019-11-11T10:32:11.084Z",
    "__v": 0
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

**4. Create A Product**
----
Create a new product :
| Syntax                        | Description   |
| ----------------------------- | ------------- |
| **URL**                       | `/products`   |
| **Method**                    | `POST`        |
| **Authentication Required**   | YES           |
| **Authorization Required**    | NO            |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Body :
| Field Name                    | Value                             |
| ----------------------------- | --------------------------------- |
| **name**                      | `<product name>`                  |
| **description**               | `<product description>`           |
| **price**                     | `<product price>`                 |
| **stock**                     | `<product stock>`                 |
| **featured_image**            | `<link Google Storage image>`     |

Success Response :
  * **HTTP Code :** 201 (Created)
  * **JSON Response :**
  ```html
  {
    "featured_image": "https://storage.googleapis.com/miniwp.images.edirates.xyz/1573467818663images.jpeg",
    "status": true,
    "_id": "5dc936ab7b21aa3ec060c8e2",
    "name": "Macbook",
    "description": "Beautiful thing",
    "price": 25000000,
    "stock": 5,
    "UserId": "5dc9350e7b21aa3ec060c8e1",
    "createdAt": "2019-11-11T10:23:39.579Z",
    "updatedAt": "2019-11-11T10:23:39.579Z",
    "__v": 0
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

**5. Update A Product**
----
Update a specific product :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/products/:id`   |
| **Method**                    | `PUT`             |
| **Authentication Required**   | YES               |
| **Authorization Required**    | YES               |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                 |
| ----------------------------- | --------------------- |
| **id**                        | `<product ID>`        |

Request Body :
| Field Name                    | Value                             |
| ----------------------------- | --------------------------------- |
| **name**                      | `<product name>`                  |
| **description**               | `<product description>`           |
| **price**                     | `<product price>`                 |
| **stock**                     | `<product stock>`                 |
| **featured_image**            | `<link Google Storage image>`     |
| **status**                    | `<product status>`                |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "n": 1,
    "nModified": 1,
    "ok": 1
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You are not authorized."
  }
  ```

**6. Delete A Product**
----
Delete a specific product :
| Syntax                        | Description          |
| ----------------------------- | -------------------- |
| **URL**                       | `/products/:id`      |
| **Method**                    | `DELETE`             |
| **Authentication Required**   | YES                  |
| **Authorization Required**    | YES                  |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                 |
| ----------------------------- | --------------------- |
| **id**                        | `<product ID>`        |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "n": 1,
    "ok": 1,
    "deletedCount": 1
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You are not authorized."
  }
  ```

---
# Cart

**1. Show All Products in User Cart**
----
Show all products of logged-in user cart in database :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/cart/`          |
| **Method**                    | `GET`             |
| **Authentication Required**   | YES               |
| **Authorization Required**    | NO                |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  [
    {
        "_id": "5dd0c991423f9c15e9fd929c",
        "UserId": "5dc9350e7b21aa3ec060c8e1",
        "ProductId": {
            "featured_image": "https://storage.googleapis.com/miniwp.images.edirates.xyz/1573469727561macpro.jpeg",
            "status": true,
            "_id": "5dc93e20274f784242aedf80",
            "name": "Macbook Pro",
            "description": "Beautiful thing",
            "price": 25000000,
            "stock": 3,
            "UserId": {
                "balance": 75000000,
                "privilege": "user",
                "_id": "5dc93a5ee83877415641a0e1",
                "email": "arya@gmail.com",
                "password": "$2a$10$3SZHRVB9oRReVkFFik94LeAsbQMD/BNGmON3cUWMXns3wG8I.rtTG",
                "name": "Arya Stark",
                "address": "Winterfell",
                "phone_number": "081174898989",
                "createdAt": "2019-11-11T10:39:26.597Z",
                "updatedAt": "2019-11-17T08:03:52.077Z",
                "__v": 0
            },
            "createdAt": "2019-11-11T10:55:28.451Z",
            "updatedAt": "2019-11-16T15:47:37.949Z",
            "__v": 0
        },
        "qty": 1,
        "createdAt": "2019-11-17T04:16:17.677Z",
        "updatedAt": "2019-11-17T04:16:17.677Z",
        "__v": 0
    }
  ]
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```
  
**2. Add A Product into Cart**
----
Add a product in logged-in user cart :
| Syntax                        | Description   |
| ----------------------------- | ------------- |
| **URL**                       | `/cart`       |
| **Method**                    | `POST`        |
| **Authentication Required**   | YES           |
| **Authorization Required**    | NO            |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Body :
| Field Name                    | Value                             |
| ----------------------------- | --------------------------------- |
| **ProductId**                 | `<product ID>`                    |
| **qty**                       | `<qty of product>`                |

Success Response :
  * **HTTP Code :** 201 (Created)
  * **JSON Response :**
  ```html
  {
    "message": "Added to the cart"
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

**3. Update A Product in Cart**
----
Update a specific product in logged-in user cart :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/cart/:id`       |
| **Method**                    | `PUT`             |
| **Authentication Required**   | YES               |
| **Authorization Required**    | YES               |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                 |
| ----------------------------- | --------------------- |
| **id**                        | `<product ID>`        |

Request Body :
| Field Name                    | Value                             |
| ----------------------------- | --------------------------------- |
| **qty**                       | `<qty of product>`                |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "message": "Updated qty in cart"
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You are not authorized."
  }
  ```

**4. Delete A Product in Cart**
----
Delete a specific product in logged-in user cart :
| Syntax                        | Description          |
| ----------------------------- | -------------------- |
| **URL**                       | `/cart/:id`          |
| **Method**                    | `DELETE`             |
| **Authentication Required**   | YES                  |
| **Authorization Required**    | YES                  |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                 |
| ----------------------------- | --------------------- |
| **id**                        | `<product ID>`        |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "message": "Removed product from cart"
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You are not authorized."
  }
  ```

**5. Checkout Cart**
----
Checkout all products in logged-in user cart :
| Syntax                        | Description          |
| ----------------------------- | -------------------- |
| **URL**                       | `/cart/checkout`     |
| **Method**                    | `POST`               |
| **Authentication Required**   | YES                  |
| **Authorization Required**    | YES                  |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "message": "Checkout success"
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

---
# Transactions

**1. Show All User Transactions**
----
Show all transactions of logged-in user in database :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/transactions/`  |
| **Method**                    | `GET`             |
| **Authentication Required**   | YES               |
| **Authorization Required**    | NO                |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  [
    {
        "products": [
            {
                "_id": "5dc93a80e83877415641a0e2",
                "name": "Macbook Air",
                "price": 15000000,
                "stock": 10,
                "qty": 5,
                "SellerId": "5dc93a5ee83877415641a0e1"
            }
        ],
        "_id": "5dc9811e9e981a5337f819e9",
        "BuyerId": "5dc9350e7b21aa3ec060c8e1",
        "address": "Hacktiv8",
        "status": "done",
        "createdAt": "2019-11-11T15:41:18.323Z",
        "updatedAt": "2019-11-17T08:03:52.067Z",
        "__v": 0
    },
    {
        "products": [
            {
                "_id": "5dc93a80e83877415641a0e2",
                "name": "Macbook Air",
                "price": 15000000,
                "stock": 5,
                "qty": 5,
                "SellerId": "5dc93a5ee83877415641a0e1"
            }
        ],
        "_id": "5dc9817af20eb753856b3aea",
        "BuyerId": "5dc9350e7b21aa3ec060c8e1",
        "address": "Hacktiv8",
        "status": "done",
        "createdAt": "2019-11-11T15:42:50.440Z",
        "updatedAt": "2019-11-12T01:33:53.209Z",
        "__v": 0
    },
    {
        "products": [
            {
                "_id": "5dc93a80e83877415641a0e2",
                "name": "Macbook Air",
                "price": 15000000,
                "stock": 30,
                "qty": 10,
                "status": true,
                "SellerId": "5dc93a5ee83877415641a0e1",
                "SellerName": "Arya Stark"
            }
        ],
        "_id": "5dd10c5ee27b28301c8bba3e",
        "BuyerId": "5dc9350e7b21aa3ec060c8e1",
        "address": "Hacktiv8",
        "status": "paid",
        "createdAt": "2019-11-17T09:01:18.142Z",
        "updatedAt": "2019-11-17T09:01:18.142Z",
        "__v": 0
    }
  ]
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```
  
**2. Show One Transaction Detail**
----
Show a specific transaction detail :
| Syntax                        | Description               |
| ----------------------------- | ------------------------- |
| **URL**                       | `/transactions/:id`       |
| **Method**                    | `GET`                     |
| **Authentication Required**   | YES                       |
| **Authorization Required**    | NO                        |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                 |
| ----------------------------- | --------------------- |
| **id**                        | `<transaction ID>`    |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "products": [
        {
            "_id": "5dc93a80e83877415641a0e2",
            "name": "Macbook Air",
            "price": 15000000,
            "stock": 5,
            "qty": 5,
            "SellerId": "5dc93a5ee83877415641a0e1"
        }
    ],
    "_id": "5dc9817af20eb753856b3aea",
    "BuyerId": "5dc9350e7b21aa3ec060c8e1",
    "address": "Hacktiv8",
    "status": "done",
    "createdAt": "2019-11-11T15:42:50.440Z",
    "updatedAt": "2019-11-12T01:33:53.209Z",
    "__v": 0
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

**3. Update Status of A Transaction**
----
Update the status of a specific transaction of logged-in user :
| Syntax                        | Description          |
| ----------------------------- | -------------------- |
| **URL**                       | `/transactions/:id`  |
| **Method**                    | `PATCH`              |
| **Authentication Required**   | YES                  |
| **Authorization Required**    | YES                  |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                 |
| ----------------------------- | --------------------- |
| **id**                        | `<transaction ID>`    |

Request Body :
| Field Name                    | Value                             |
| ----------------------------- | --------------------------------- |
| **status**                    | `<done> || <cancel>`              |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "message": "Transaction finished"
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "Unable to change transaction"
  }
  ```
