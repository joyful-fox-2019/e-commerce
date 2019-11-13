# E-Commerce

## Getting Started
---
Welcome to E-commerce! <br/>
You can use the API for user and product management.<br/>
All API access is performed over HTTP and accessed from the http://ecommerce.server.edirates.xyz.<br/>
You can do CRUD operation for products by accessing to http://ecommerce.server.edirates.xyz/products.<br/>
Of course, you must login first and register a new user in order to be able to do CRUD operation.<br/>
Registering a new user or login with existing user can be done by accessing to http://ecommerce.server.edirates.xyz/users.

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
| **balance**                   | `<your balance>`       |
| **privilege**                 | `<admin> || <user>`    |

Success Response :
  * **HTTP Code :** 201 (Created)
  * **JSON Response :**
  ```html
  {
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM5MzRhMjdiMjFhYTNlYzA2MGM4ZTAiLCJuYW1lIjoiRWRpc29uIiwiZW1haWwiOiJlZGlyYXRlc0BnbWFpbC5jb20iLCJpYXQiOjE1NzM0NjcyOTh9.cII_ny6qr65EcuUTbmdUGsDiHMnxGA9NyfwLvHc0ryg"
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
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM5MzUwZTdiMjFhYTNlYzA2MGM4ZTEiLCJuYW1lIjoiRWRpc29uIiwiZW1haWwiOiJlZGlyYXRlc0BnbWFpbC5jb20iLCJpYXQiOjE1NzM0Njc0MTF9.TVc--XWPhvI-t6Nx1EcCOiUSQMY2zmuKrEpgvUumdCw"
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

**3. Google Sign In**
----
Sign in with Google Account :
| Syntax                        | Description          |
| ----------------------------- | -------------------- |
| **URL**                       | `/gsignin`           |
| **Method**                    | `POST`               |
| **Authentication Required**   | NO                   |
| **Authorization Required**    | NO                   |

Request Body :
| Field Name                    | Value                   |
| ----------------------------- | ----------------------- |
| **CLIENT_ID**                 | `<Google Client ID>`    |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjZTFmOWFiYTE0OGMzNDZhYWQ3YmUiLCJlbWFpbCI6ImVkaXJhdGVzQGdtYWlsLmNvbSIsImlhdCI6MTU3MjY2NjU2MX0.DcYLScfR9RAz0-RgnfhWsFLTnfB7a1jyFvON9OagR6o"
  }
  ```
Error Response : 
  * **HTTP Code :** 500 (Internal Server Error)
  * **JSON Response :**
  ```html
  {
    "message": "Internal Server Error."
  }
  ```


---
# Products

**1. Show All Products**
----
Show all active products from database :
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
Show all products from logged in user :
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
