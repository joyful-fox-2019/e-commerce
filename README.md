# myEcommerce-API

------

**Client URL:**

https://myecommerce.nadhiljanitra.xyz

**Base URL:**

https://myecommerce-server.nadhiljanitra.xyz

**User routes:**

| **Route**           | **METHOD** | **Description**                |
| :------------------ | :--------- | :----------------------------- |
| /users/my-detail    | GET        | Get user data                  |
| /users/login        | POST       | Sign in user                   |
| /users/register     | POST       | Sign up new user               |
| /users/login/google | POST       | Sign in using OAuth 2.0 Google |
| /users/login/github | POST       | Sign in using OAuth 2.0 Github |
| /users/add-cart     | POST       | Add item into user cart        |
| /users/remove-item  | PATCH      | Remove item from cart          |
| /users/topup        | PATCH      | Top up money user              |

**Product routes:**

| **Route**            | **HTTP** | **Description**       |
| :------------------- | :------- | :-------------------- |
| /products            | GET      | Get all product       |
| /products/:productId | GET      | Get a product detail  |
| /products/add        | POST     | Create new product    |
| /products/:productId | PATCH    | Update product detail |
| /products/:productId | DELETE   | Delete a product      |

**Transaction routes:**

| **Route**                    | **HTTP** | **Description**           |
| :--------------------------- | :------- | :------------------------ |
| /transactions/user           | GET      | Get one user transactions |
| /transactions/all            | GET      | Get all transactions      |
| /transactions/new            | POST     | Create new transaction    |
| /transactions/:transactionId | PATCH    | Update a transaction      |
| /transactions/:transactionId | DELETE   | Delete a transaction      |

**Errors:**

| Code | Name                  | Description                                         |
| :--- | :-------------------- | :-------------------------------------------------- |
| 400  | Bad Request           | Invalid user's submitted data                       |
| 403  | Forbidden             | User not authorize to perform an action             |
| 404  | Not Found             | The requested resource could not be found           |
| 409  | Conflict              | Request could not be completed due to conflict data |
| 500  | Internal Server Error | We had a problem with our server                    |

## **Find User**

- **URL:** `/users/my-detail`

- **Method:** `GET`

- **URL Params:** none

- **URL Headers:** 

  - Required :
    - `token = [access_token]`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
        {
            "id": 1,
            "email": "admin@admin.com",
            "username": "admin",
            "admi": true,
            "password": "$Jgjya$sd32SDcal7642Shjhs*&^sada23",
            "cart" : [],
            "loginWith" : "web",
            "money" : 0,
            "wishlist" : [],
            "updatedAt": "2019-10-29T15:21:41.639Z",
            "createdAt": "2019-10-29T15:21:41.639Z"
        }
    ```

- **Error Response:**

  - **Status:** `404` **Content:**

    ```
        {
            "message": 'User not found'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
       axios({
            url: `/users/my-detail`,
            methods: "get",
            headers: {
              token
            }
          })
    ```

## **Register User**

- **URL:** `/users/register`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `email = [string]`
    - `username = [string]`
    - `password = [string]`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
        {
          token : "eyBcakj27gkasdwa.Kudg166tajshdamcnawdja2t78WUdsa.SVDcauy7ie"
        }
    ```
  
- **Error Response:**

  - **Status:** `409` **Content:**

    ```
        {
            "message": 'Email already in used'
        }
    ```
  
- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
            method: 'post',
            url : '/users/register',
            data : {
              username : this.usernameRegister,
              email : this.emailRegister,
              password : this.passwordRegister,
            }
          })
    ```

## 

## **Login User**

- **URL:** `/users/login`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `email = [string]`
    - `password = [string]`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcyMzYzNzUwfQ.Gf0JAtSpcI1r5C6VHAlp-znvaFxJZL5b5pJ5gaCTrNs"
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
      {
            "message": 'Email/password wrong'
      }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
            method: 'post',
            url : '/users/login',
            data : {
              email : this.email,
              password : this.password,
            }
          })
    ```

## **Login Using Google OAuth**

- **URL:** `/users/login/google`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `token = [id_token Google]`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcyMzYzNzUwfQ.Gf0JAtSpcI1r5C6VHAlp-znvaFxJZL5b5pJ5gaCTrNs"
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You've been signin with github'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
       axios({
              url : '/users/login/google',
              method : 'post',
              data : {
                id_token
              }
            })
    ```

## **Login Using Github OAuth**

- **URL:** `/users/login/github`

- **Method:** `POST`

- **URL Params:** 

  - Required :
    - `code = [code from OAuth Github]`

- **Data Params:** `none`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTcyMzYzNzUwfQ.Gf0JAtSpcI1r5C6VHAlp-znvaFxJZL5b5pJ5gaCTrNs"
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You've been signin with google'
        }
    ```

## **Add item into user cart**

- **URL:** `/users/add-cart`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `product = [productId]`
    - `qty = [number]`

- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
    {
    	'message' : 'Cart updated!'
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You are not authorize to perform this action'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
     axios({
              url: '/users/add-cart',
              method: 'post',
              headers: {
                token
              },
              data: {
                product: payload.productId,
                qty: payload.qty
              }
            })
    ```

## **Remove item from user cart**

- **URL:** `/users/remove-item`

- **Method:** `PATCH`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `productName = [string]`

- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
    {
    	'message' : 'Cart updated!'
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You are not authorize to perform this action'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
     axios({
              url: '/users/remove-item',
              method: 'patch',
              headers: {
                token
              },
              data: {
                productName
              }
            })
    ```

## **Top up user some money**

- **URL:** `/users/topup`

- **Method:** `PATCH`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `topup = [number]`

- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
    {
    	'message' : 'Topup succed'
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You are not authorize to perform this action'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
     axios({
              url: '/users/topup',
              method: 'patch',
              headers: {
                token
              },
              data: {
                topup: payload
              }
            })
    ```

## **Create new product**

- **URL:** `/products/add`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `name = [string]`
    - `detail = [string]`
    - `stock = [number]`
    - `price = [number]`
  - Optional :
    - `image = file`

- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
    {
        _id: "5dc8532b25850d0da577ef31",
        name: "kuda",
        price: 20000,
        detail: "Ini kuda",
        stock: 20,
        image: "https://storage.googleapis.com/generalbucket.nadhiljanitra.xyz/15734095790961_OGXNxyC9d_XAMExEbs9K4g.jpeg",
        createdAt: "2019-11-10T18:12:59.664Z",
        updatedAt: "2019-11-10T18:13:21.289Z",
        __v: 0
    }
    ```
  
- **Error Response:**

  - **Status:** `400` **Content:**

    ```
        {
            "message": 'Name is required'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
     axios({
              url: '/products/add',
              method: 'post',
              headers: {
                token,
                'Content-Type': 'multipart/form-data'
              },
              data: payload
            })
    ```

## **Get All Product**

- **URL:** `/products`

- **Method:** `GET`

- **URL Params:** `none`

- **Data Params:** `none`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    [
      {
        {
        _id: "5dc8532b25850d0da577ef31",
        name: "kuda",
        price: 20000,
        detail: "Ini kuda",
        stock: 20,
        image: "https://storage.googleapis.com/generalbucket.nadhiljanitra.xyz/15734095790961_OGXNxyC9d_XAMExEbs9K4g.jpeg",
        createdAt: "2019-11-10T18:12:59.664Z",
        updatedAt: "2019-11-10T18:13:21.289Z",
        __v: 0
        },
        {
        _id: "5dc8532b25850d0da577ef31",
        name: "sapi",
        price: 30000,
        detail: "Ini sapi",
        stock: 20,
        image: "https://storage.googleapis.com/generalbucket.nadhiljanitra.xyz/15734095790961_OGXNxyC9d_XAMExEbs9K4g.jpeg",
        createdAt: "2019-11-10T18:12:59.664Z",
        updatedAt: "2019-11-10T18:13:21.289Z",
        __v: 0
        },
    ]
    ```
  
- **Error Response:**

  - **Status:** `404` **Content:**

    ```
        {
            "message": 'Product not found'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
              url: '/products',
              methods: 'get'
            })
    ```

## **Get One Product**

- **URL:** `/products/productId`

- **Method:** `GET`

- **URL Params:** `productId`

- **Data Params:** `none`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
        _id: "5dc8532b25850d0da577ef31",
        name: "kuda",
        price: 20000,
        detail: "Ini kuda",
        stock: 20,
        image: "https://storage.googleapis.com/generalbucket.nadhiljanitra.xyz/15734095790961_OGXNxyC9d_XAMExEbs9K4g.jpeg",
        createdAt: "2019-11-10T18:12:59.664Z",
        updatedAt: "2019-11-10T18:13:21.289Z",
        __v: 0
    }
    ```

- **Error Response:**

  - **Status:** `404` **Content:**

    ```
        {
            "message": 'Product not found'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
              url: '/product/5dc8532b25850d0da577ef31',
              methods: 'get'
            })
    ```

- ## **Update a product**

  - **URL:** `/products/:productId`

  - **Method:** `PATCH`
  
  - **URL Params:** `productId`
  
  - **Data Params:** 
  
    - Required : none
  
    - Optional :
  
      - `name = [string]`
      - `detail = [string]`
      - `stock = [number]`
      - `price = [number]`
  
      - `image = file`
  
  - **URL Headers:** 
  
    - Required :
      - `token = access_token`
  
  - **Success Response:**
  
    - **Status:** `201` **Content:**
  
      ```
      {
          'message' : 'Product updated!'
      }
      ```
  
  - **Error Response:**
  
    - **Status:** `403` **Content:**
  
      ```
          {
              "message": 'You are not authorize to perform this action'
          }
      ```
  
  - **Sample call:**
  
    - **Using Axios:** 
  
      ```
      axios({
                url: `/products/${productId}`,
                method: 'patch',
                headers: {
                  token,
                  'Content-Type': 'multipart/form-data'
                },
                data: payload.formData
              })
      ```
  
  ## **Remove a product**
  
  - **URL:** `/products/:productId`
  
  - **Method:** `DELETE`
  
  - **URL Params:** `productId`
  
  - **Data Params:** none
  
  - **URL Headers:** 
  
    - Required :
      - `token = access_token`
  
  - **Success Response:**
  
    - **Status:** `201` **Content:**
  
      ```
      {
          'message' : 'Product deleted!'
      }
      ```
  
  - **Error Response:**
  
    - **Status:** `403` **Content:**
  
      ```
          {
              "message": 'You are not authorize to perform this action'
          }
      ```
  
  - **Sample call:**
  
    - **Using Axios:** 
  
      ```
      axios({
                url: `/products/${productId}`,
                method: 'delete',
                headers: {
                  token
                }
              })
      ```

## **Get One Transaction**

- **URL:** `/transcations/user`

- **Method:** `GET`

- **URL Params:** `none`

- **Data Params:** 

  - Required :
    - `name = [string]`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    {
            "id": 1,
            "email": "admin@admin.com",
            "username": "admin",
            "admi": true,
            "password": "$Jgjya$sd32SDcal7642Shjhs*&^sada23",
            "cart" : [{
            'product' : {
        _id: "5dc8532b25850d0da577ef31",
        name: "kuda",
        price: 20000,
        detail: "Ini kuda",
        stock: 20,
        image: "https://storage.googleapis.com/generalbucket.nadhiljanitra.xyz/15734095790961_OGXNxyC9d_XAMExEbs9K4g.jpeg",
        createdAt: "2019-11-10T18:12:59.664Z",
        updatedAt: "2019-11-10T18:13:21.289Z",
        __v: 0
    },
    {qty: 10}
    }],
            "loginWith" : "web",
            "money" : 0,
            "wishlist" : [],
            "updatedAt": "2019-10-29T15:21:41.639Z",
            "createdAt": "2019-10-29T15:21:41.639Z"
        }
    
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You are not authorize'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
    axios({
              url: '/transactions/user',
              method: 'get',
              headers: {
                token
              }
            })
    ```

## **Get All Transaction**

- **URL:** `/transcations/all`

- **Method:** `GET`

- **URL Params:** `none`

- **Data Params:** 

  - Required :
    - `name = [string]`

- **Success Response:**

  - **Status:** `200` **Content:**

    ```
    [{
            "id": 1,
            "email": "admin@admin.com",
            "username": "admin",
            "admi": true,
            "password": "$Jgjya$sd32SDcal7642Shjhs*&^sada23",
            "cart" : [{
            'product' : {
        _id: "5dc8532b25850d0da577ef31",
        name: "kuda",
        price: 20000,
        detail: "Ini kuda",
        stock: 20,
        image: "https://storage.googleapis.com/generalbucket.nadhiljanitra.xyz/15734095790961_OGXNxyC9d_XAMExEbs9K4g.jpeg",
        createdAt: "2019-11-10T18:12:59.664Z",
        updatedAt: "2019-11-10T18:13:21.289Z",
        __v: 0
    },
    {qty: 10}
    }],
            "loginWith" : "web",
            "money" : 0,
            "wishlist" : [],
            "updatedAt": "2019-10-29T15:21:41.639Z",
            "createdAt": "2019-10-29T15:21:41.639Z"
    },
    {
            "id": 1,
            "email": "admin@admin.com",
            "username": "admin",
            "admi": true,
            "password": "$Jgjya$sd32SDcal7642Shjhs*&^sada23",
            "cart" : [{
            'product' : {
        _id: "5dc8532b25850d0da577ef31",
        name: "kuda",
        price: 20000,
        detail: "Ini kuda",
        stock: 20,
        image: "https://storage.googleapis.com/generalbucket.nadhiljanitra.xyz/15734095790961_OGXNxyC9d_XAMExEbs9K4g.jpeg",
        createdAt: "2019-11-10T18:12:59.664Z",
        updatedAt: "2019-11-10T18:13:21.289Z",
        __v: 0
    },
    {qty: 10}
    }],
            "loginWith" : "web",
            "money" : 0,
            "wishlist" : [],
            "updatedAt": "2019-10-29T15:21:41.639Z",
            "createdAt": "2019-10-29T15:21:41.639Z"
    }]
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You are not authorize'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
    axios({
              url: '/transactions/user',
              method: 'get',
              headers: {
                token
              }
            })
    ```

## **Create new transaction**

- **URL:** `/products/new`

- **Method:** `POST`

- **URL Params:** `None`

- **Data Params:** 

  - Required :
    - `cartPrice = [number]`

- **URL Headers:** 

  - Required :
    - `token = access_token`

- **Success Response:**

  - **Status:** `201` **Content:**

    ```
    {
        _'message' : 'Checkout done!'
    }
    ```

- **Error Response:**

  - **Status:** `403` **Content:**

    ```
        {
            "message": 'You are not authorize'
        }
    ```

- **Sample call:**

  - **Using Axios:** 

    ```
      axios({
              url: '/transactions/new',
              method: 'post',
              headers: {
                token
              },
              data: {
                cartPrice: payload
              }
            })
    ```

- ## **Update a transaction**

  - **URL:** `/transactions/:transactionId`

  - **Method:** `PATCH`

  - **URL Params:** `transactionId`

  - **Data Params:** 

    - Required :
      - `status = [string]`

  - **URL Headers:** 

    - Required :
      - `token = access_token`

  - **Success Response:**

    - **Status:** `201` **Content:**

      ```
      {
          'message' : 'Transaction updated!'
      }
      ```

  - **Error Response:**

    - **Status:** `403` **Content:**

      ```
          {
              "message": 'You are not authorize to perform this action'
          }
      ```

  - **Sample call:**

    - **Using Axios:** 

      ```
      axios({
                url: `/transactions/${payload.transactionId}`,
                method: 'patch',
                headers: {
                  token
                },
                data: {
                  status: payload.status
                }
              })
      ```

  ## **Remove a transaction**

  - **URL:** `/transactions/:transactionId`

  - **Method:** `DELETE`

  - **URL Params:** `transactionId`

  - **Data Params:** none

  - **URL Headers:** 

    - Required :
      - `token = access_token`

  - **Success Response:**

    - **Status:** `201` **Content:**

      ```
      {
          'message' : 'Transaction deleted!'
      }
      ```

  - **Error Response:**

    - **Status:** `403` **Content:**

      ```
          {
              "message": 'You are not authorize to perform this action'
          }
      ```

  - **Sample call:**

    - **Using Axios:** 

      ```
      axios({
                url: `/transactions/${payload}`,
                method: 'delete',
                headers: {
                  token
                }
              })
      ```

## 