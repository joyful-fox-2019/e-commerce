
**Omniverse**
----

access deployed app to: [omniverse.satyowicaksana.online](http://omniverse.satyowicaksana.online)

----

*  **Error Response:** 

**Code:** 400
**Description:** Server cannot process the action due to invalid request <br  />
**Content Example:**

```
{
    "messages": [
        "Product name cannot be empty",
        "Price cannot be zero or less"
    ]
}
```
**Code:** 401
**Description:** You are not authenticated  to access the data <br  />
**Content Example:**

```
{
	"messages":  [
		"You have to login first"
	]
}
```
**Code:** 403
**Description:** You are not authorized  to access the data <br  />
**Content Example:**

```
{
	"messages":  [
		"You are not authorized to access this data"
	]
}
```
**Code:** 404
**Description:** The requested resource could not be found <br  />
**Content Example:**

```
{
	"messages":  [
		"Comic not found"
	]
}
```
**Code:** 500
**Description:** There's something wrong in the server. Please try again later. <br  />
**Content Example:**

```
{
	"messages":  [
		"Something went wrong in the server"
	]
}
```

---
**POST /users/register**

*  **URL**

`/users/register`

*  **Method:**

`POST`

  *  **Data Params**

**body:**

| property | type | description |
|--|--|--|
|`'name'`| string | name of the user |
|`'email'`| string | email of the user |
|`'password'`| string | password of the user |
|`'adminPassword'`| string | password to make a user has the role of admin |
 
*  **Success Response:**

**Code:** 201<br  />

**Content Example:**

```
{
    "_id": "5dd1b816ce6e8e00c0a80b99",
    "name": "Tony Stark",
    "email": "tony@stark.com",
    "password": "$2a$10$CfwwB5WPI13nwvQCeqZR.Ouyax5T37khaCLD.pRdZ90wYGhemRyEG",
    "isAdmin": true,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQxYjgxNmNlNmU4ZTAwYzBhODBiOTkiLCJlbWFpbCI6InRvbnlAc3RhcmsuY29tIiwiaWF0IjoxNTc0MDI1MjM4fQ.jfL9pF0xUq4Z-3PrI855pNJJxWP4C0ypvG_l5YXcjXE"
}
```
---
**POST /users/login**

*  **URL**

`/users/login`

*  **Method:**

`POST`

  *  **Data Params**

**body:**

| property | type | description |
|--|--|--|
|`'email'`| string | email of the user |
|`'password'`| string | password of the user |
 
*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
    "_id": "5dd1b851ce6e8e00c0a80b9a",
    "name": "Peter Parker",
    "email": "parkerp@bugle.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQxYjg1MWNlNmU4ZTAwYzBhODBiOWEiLCJlbWFpbCI6InBhcmtlcnBAYnVnbGUuY29tIiwibmFtZSI6IlBldGVyIFBhcmtlciIsImlhdCI6MTU3NDAyNTMzOH0.hXPJYC184IGAQTa6DFE96bKQFiByBHK0wj-OiDiB1M4"
}
```
---
**GET /products**

*  **URL**

`/products`

*  **Method:**

`GET`
 
*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
[
    {
        "_id": "5dd1b928ce6e8e00c0a80b9b",
        "name": "Future Foundation (2019) #4",
        "description": "LOST IN SPACE! The Future Foundation’s fight to save Molecule Man comes to a head! And there’ll be no rainbow after a storm like this. This issue, someone dies. Don’t miss Professor Power and his team meeting their Maker — and more!",
        "price": 50000,
        "stock": 5,
        "published": "2019-11-13T00:00:00.000Z",
        "writer": "Jeremy Whitley",
        "penciler": "Alti Firmansyah",
        "image": "https://storage.googleapis.com/omniverse-images/1574025511131-futurefoundation4.jpg",
        "createdAt": "2019-11-17T21:18:32.684Z",
        "updatedAt": "2019-11-17T21:18:32.684Z"
    }
]
```
---
**GET /products/:id**

*  **URL**

`/products/:id`

*  **Method:**

`GET`
 
   *  **Data Params**

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | product id |

*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
[
    {
        "_id": "5dd1b928ce6e8e00c0a80b9b",
        "name": "Future Foundation (2019) #4",
        "description": "LOST IN SPACE! The Future Foundation’s fight to save Molecule Man comes to a head! And there’ll be no rainbow after a storm like this. This issue, someone dies. Don’t miss Professor Power and his team meeting their Maker — and more!",
        "price": 50000,
        "stock": 5,
        "published": "2019-11-13T00:00:00.000Z",
        "writer": "Jeremy Whitley",
        "penciler": "Alti Firmansyah",
        "image": "https://storage.googleapis.com/omniverse-images/1574025511131-futurefoundation4.jpg",
        "createdAt": "2019-11-17T21:18:32.684Z",
        "updatedAt": "2019-11-17T21:18:32.684Z"
    }
]
```
---
**Authorization**
Aside from register, login and getting products , you need authentication using token that you got from register/log in and send it as headers

**headers:**

| property | type | description |
|--|--|--|
|`'access_token'`| string | access token for authentication |

---
**POST /products**

*  **URL**

`/products`

*  **Method:**

`POST`
  *  **Data Params**

**body:**

| property | type | description |
|--|--|--|
|`'name'`| string | product name |
|`'price'`| number | product price |
|`'stock'`| string | product stock |
|`'price'`| number | product price |
|`'published'`| date | day of published of the book |
|`'writer'`| number | book writer name |
|`'penciler'`| string | book penciler name |
|`'description'`| number | product price |
|`'image'`| number | an image file of the book cover |
 
*  **Success Response:**

**Code:** 201 <br  />

**Content Example:**

```
{
    "_id": "5dd1b928ce6e8e00c0a80b9b",
    "name": "Future Foundation (2019) #4",
    "description": "LOST IN SPACE! The Future Foundation’s fight to save Molecule Man comes to a head! And there’ll be no rainbow after a storm like this. This issue, someone dies. Don’t miss Professor Power and his team meeting their Maker — and more!",
    "price": 50000,
    "stock": 5,
    "published": "2019-11-13T00:00:00.000Z",
    "writer": "Jeremy Whitley",
    "penciler": "Alti Firmansyah",
    "image": "https://storage.googleapis.com/omniverse-images/1574025511131-futurefoundation4.jpg",
    "createdAt": "2019-11-17T21:18:32.684Z",
    "updatedAt": "2019-11-17T21:18:32.684Z"
}
```
---
**PATCH /products/:id**

*  **URL**

`/products/:id`

*  **Method:**

`PATCH`

   *  **Data Params**

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | id of product |


**body:**

| property | type | description |
|--|--|--|
|`'name'`| string | product name |
|`'price'`| number | product price |
|`'stock'`| string | product stock |
|`'price'`| number | product price |
|`'published'`| date | day of published of the book |
|`'writer'`| number | book writer name |
|`'penciler'`| string | book penciler name |
|`'description'`| number | product price |

*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
    "_id": "5dd1b928ce6e8e00c0a80b9b",
    "name": "Future Foundation (2019) #5",
    "description": "LOST IN SPACE! The Future Foundation’s fight to save Molecule Man comes to a head! And there’ll be no rainbow after a storm like this. This issue, someone dies. Don’t miss Professor Power and his team meeting their Maker — and more!",
    "price": 50000,
    "stock": 5,
    "published": "2019-11-13T00:00:00.000Z",
    "writer": "Jeremy Whitley",
    "penciler": "Alti Firmansyah",
    "image": "https://storage.googleapis.com/omniverse-images/1574025511131-futurefoundation4.jpg",
    "createdAt": "2019-11-17T21:18:32.684Z",
    "updatedAt": "2019-11-17T21:18:32.684Z"
}
```
---
**DELETE /products/:id**

*  **URL**

`/products/:id`

*  **Method:**

`DELETE`

   *  **Data Params**

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | id of product |


*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
    "_id": "5dd1b928ce6e8e00c0a80b9b",
    "name": "Future Foundation (2019) #5",
    "description": "LOST IN SPACE! The Future Foundation’s fight to save Molecule Man comes to a head! And there’ll be no rainbow after a storm like this. This issue, someone dies. Don’t miss Professor Power and his team meeting their Maker — and more!",
    "price": 50000,
    "stock": 5,
    "published": "2019-11-13T00:00:00.000Z",
    "writer": "Jeremy Whitley",
    "penciler": "Alti Firmansyah",
    "image": "https://storage.googleapis.com/omniverse-images/1574025511131-futurefoundation4.jpg",
    "createdAt": "2019-11-17T21:18:32.684Z",
    "updatedAt": "2019-11-17T21:18:32.684Z"
}
```
---
**GET /carts**

*  **URL**

`/carts`

*  **Method:**

`GET`
 
*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
[
    {
        "_id": "5dd1bdadce6e8e00c0a80b9c",
        "product": {
            "_id": "5dd1b928ce6e8e00c0a80b9b",
            "name": "Future Foundation (2019) #4",
            "description": "LOST IN SPACE! The Future Foundation’s fight to save Molecule Man comes to a head! And there’ll be no rainbow after a storm like this. This issue, someone dies. Don’t miss Professor Power and his team meeting their Maker — and more!",
            "price": 50000,
            "stock": 5,
            "published": "2019-11-13T00:00:00.000Z",
            "writer": "Jeremy Whitley",
            "penciler": "Alti Firmansyah",
            "image": "https://storage.googleapis.com/omniverse-images/1574025511131-futurefoundation4.jpg",
            "createdAt": "2019-11-17T21:18:32.684Z",
            "updatedAt": "2019-11-17T21:18:32.684Z"
        },
        "qty": 2,
        "customer": "5dd1b851ce6e8e00c0a80b9a"
    }
]
```
---
**POST /carts**

*  **URL**

`/carts`

*  **Method:**

`POST`
  *  **Data Params**

**body:**

| property | type | description |
|--|--|--|
|`'product'`| string | id of a product |
|`'qty'`| number | product price |
 
*  **Success Response:**

**Code:** 201 <br  />

**Content Example:**

```
{
    "_id": "5dd1bdadce6e8e00c0a80b9c",
    "product": "5dd1b928ce6e8e00c0a80b9b",
    "qty": 2,
    "customer": "5dd1b851ce6e8e00c0a80b9a"
}
```
---
**PATCH /carts/:id**

*  **URL**

`/carts/:id`

*  **Method:**

`PATCH`

   *  **Data Params**

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | id of product |


**body:**

| property | type | description |
|--|--|--|
|`'qty'`| string | quantity of the product bought |

*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
    "_id": "5dd1bdadce6e8e00c0a80b9c",
    "product": "5dd1b928ce6e8e00c0a80b9b",
    "qty": 3,
    "customer": "5dd1b851ce6e8e00c0a80b9a"
}
```
---
**DELETE /carts/:id**

*  **URL**

`/carts/:id`

*  **Method:**

`DELETE`

   *  **Data Params**

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | id of cart |


*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
    "_id": "5dd1bdadce6e8e00c0a80b9c",
    "product": "5dd1b928ce6e8e00c0a80b9b",
    "qty": 3,
    "customer": "5dd1b851ce6e8e00c0a80b9a"
}
```
---
**GET /transactions**

*  **URL**

`/transactions`

*  **Method:**

`GET`
 
*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
[
    {
        "status": "Waiting for confirmation",
        "carts": [
            {
                "_id": "5dd1c3dace6e8e00c0a80ba9",
                "product": {
                    "_id": "5dd1c3aace6e8e00c0a80ba7",
                    "name": "aaaabbb",
                    "description": "aaaa",
                    "price": 100000,
                    "stock": 1,
                    "published": "2019-11-16T00:00:00.000Z",
                    "writer": "aa",
                    "penciler": "aaa",
                    "image": "https://storage.googleapis.com/omniverse-images/1574028201116-Screen Shot 2019-11-05 at 5.49.16 PM.png",
                    "createdAt": "2019-11-17T22:03:22.251Z",
                    "updatedAt": "2019-11-17T22:03:32.636Z"
                },
                "qty": 1,
                "customer": "5dd1c3d4ce6e8e00c0a80ba8"
            }
        ],
        "_id": "5dd1c3f7ce6e8e00c0a80baa",
        "customer": {
            "_id": "5dd1c3d4ce6e8e00c0a80ba8",
            "name": "Omni Cust",
            "email": "omni@cust.com",
            "password": "$2a$10$2bgWz6USYPRnYn3TD/GtBuKdHwIgNtx0q5RAv8igmE7RugvynaCVy"
        },
        "total": 100000
    }
]
```
---
**GET /transactions/:id**

*  **URL**

`/transactions/:id`

*  **Method:**

`GET`
 
   *  **Data Params**

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | product id |

*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
    {
        "status": "Waiting for confirmation",
        "carts": [
            {
                "_id": "5dd1c3dace6e8e00c0a80ba9",
                "product": {
                    "_id": "5dd1c3aace6e8e00c0a80ba7",
                    "name": "aaaabbb",
                    "description": "aaaa",
                    "price": 100000,
                    "stock": 1,
                    "published": "2019-11-16T00:00:00.000Z",
                    "writer": "aa",
                    "penciler": "aaa",
                    "image": "https://storage.googleapis.com/omniverse-images/1574028201116-Screen Shot 2019-11-05 at 5.49.16 PM.png",
                    "createdAt": "2019-11-17T22:03:22.251Z",
                    "updatedAt": "2019-11-17T22:03:32.636Z"
                },
                "qty": 1,
                "customer": "5dd1c3d4ce6e8e00c0a80ba8"
            }
        ],
        "_id": "5dd1c3f7ce6e8e00c0a80baa",
        "customer": {
            "_id": "5dd1c3d4ce6e8e00c0a80ba8",
            "name": "Omni Cust",
            "email": "omni@cust.com",
            "password": "$2a$10$2bgWz6USYPRnYn3TD/GtBuKdHwIgNtx0q5RAv8igmE7RugvynaCVy"
        },
        "total": 100000
    }
```
---
**POST /transactions**

*  **URL**

`/transactions`

*  **Method:**

`POST`
  *  **Data Params**

**body:**

| property | type | description |
|--|--|--|
|`'carts'`| string | array of cart |
|`'total'`| number | total price in carts |
 
*  **Success Response:**

**Code:** 201 <br  />

**Content Example:**

```
{
        "status": "Waiting for confirmation",
        "carts": [5dd1c3dace6e8e00c0a80ba9"],
        "_id": "5dd1c3f7ce6e8e00c0a80baa",
        "customer": {
            "_id": ,
            "name": "Omni Cust",
            "email": "omni@cust.com",
            "password": "$2a$10$2bgWz6USYPRnYn3TD/GtBuKdHwIgNtx0q5RAv8igmE7RugvynaCVy"
        },
        "total": 100000
    }
```
---
**PATCH /transactions/:id**

*  **URL**

`/transactions/:id`

*  **Method:**

`PATCH`

   *  **Data Params**

**params:**

| property | type | description |
|--|--|--|
|`'id'`| string | id of product |


*  **Success Response:**

**Code:** 200 <br  />

**Content Example:**

```
{
        "status": "Waiting for confirmation",
        "carts": [5dd1c3dace6e8e00c0a80ba9"],
        "_id": "5dd1c3f7ce6e8e00c0a80baa",
        "customer": {
            "_id": ,
            "name": "Omni Cust",
            "email": "omni@cust.com",
            "password": "$2a$10$2bgWz6USYPRnYn3TD/GtBuKdHwIgNtx0q5RAv8igmE7RugvynaCVy"
        },
        "total": 100000
    }
```