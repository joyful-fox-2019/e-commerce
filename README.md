## API Documentation MINI-WP

Dc-Emporium build with:

```[  {    &quot;status&quot;: 400,    &quot;msg&quot;: [      &quot;email/password wrong&quot;,      &quot;username is required&quot;,      &quot;password is required&quot;,      &quot;email is required&quot;,      &quot;title is required&quot;,      &quot;content is required&quot;,      &quot;featured_image is required&quot;,      &quot;Article need Image / Problem with GCS&quot;,      &quot;cannot Update with empty value&quot;,      &quot;Exp Verify please try again&quot;    ]  },  {    &quot;status&quot;: 401,    &quot;msg&quot;: [      &quot;Authorization Error&quot;    ]  },  {    &quot;status&quot;: 403,    &quot;msg&quot;: [      &quot;Authentication Error&quot;,      &quot;Invalid Token / problem with Token&quot;,      &quot;Cant check yourSelf&quot;,      &quot;Wrong code / exp Code Verify Check your Email or request again&quot;,      &quot;the Email allready used!&quot;    ]  },  {    &quot;status&quot;: 404,    &quot;msg&quot;: [      &quot;The searched id was not found&quot;,      &quot;Target Not Found!&quot;    ]  },  {    &quot;status&quot;: 500,    &quot;msg&quot;: [      &quot;Internal Server Error&quot;    ]  }]1. List of User Routes:1.a List for Reset Password Users
1. express
2. mongoose
3. vuejs
4. sweetallert2
5. boostrap-vue
6. vue-awesome-notification
7. vuex
```

### Error Response :

```java
[
  {
    "status": 400,
    "msg": [
      "email/password wrong",
      "username is required",
      "password is required",
      "email is required",
      "title is required",
      "content is required",
      "featured_image is required",
      "Article need Image / Problem with GCS",
      "cannot Update with empty value",
      "Exp Verify please try again"
    ]
  },
  {
    "status": 401,
    "msg": [
      "Authorization Error"
    ]
  },
  {
    "status": 403,
    "msg": [
      "Authentication Error",
      "Invalid Token / problem with Token",
      "Cant check yourSelf",
      "Wrong code / exp Code Verify Check your Email or request again",
      "the Email allready used!"
    ]
  },
  {
    "status": 404,
    "msg": [
      "The searched id was not found",
      "Target Not Found!"
    ]
  },
  {
    "status": 500,
    "msg": [
      "Internal Server Error"
    ]
  }
]
```

Base URL: 'http://localhost:3000'

## Routes: 

```java
1. List of User Routes:
```

| **Routes**      | HTTP  | Headers | Body                                                         | Description                      |
| --------------- | ----- | ------- | ------------------------------------------------------------ | -------------------------------- |
| /users/signup   | POST  | none    | username:String (required) password:String (required) email:String (required) | Create new Account               |
| /users/signin   | POST  | none    | email:String (required)  password:String (required)          | Logged in to your exist account  |
| /users          | GET   | token   | none                                                         | Get Data user Login              |
| /users/upload   | PATCH | token   | none                                                         | Update profile Picture           |
| /users/sendcode | post  | token   | email: String                                                | Send Code to Email               |
| /users/verify   | PATCH | token   | code                                                         | Confrimasi code for Verification |

## 

```java
2. List of Transaction Routes:
```



| **Routes**                | HTTP  | Headers | Body | Description                   |
| ------------------------- | ----- | ------- | ---- | ----------------------------- |
| /transactions             | GET   | token   | none | Get All Transaction for Admin |
| /transactions             | POST  | token   | none | Create a **transactions**     |
| /transactions/confirm/:id | PATCH | token   | none | confirm status ( admin )      |
| /transactions/received    | PATCH | token   | none | change Status received        |

## 

```java
3. List of Store Routes:
```

| **Routes** | HTTP | Headers | Body                                                 | Description                                   |
| ---------- | ---- | ------- | ---------------------------------------------------- | --------------------------------------------- |
| /stores    | GET  | token   | none                                                 | Get Owner Store                               |
| /stores    | POST | token   | name: String<br />location: String<br />link: String | Create a Store ( for User verification only ) |

## 

```java
4. List of Cart Routes:
```

| **Routes** | HTTP | Headers | Body                                                         | Description         |
| ---------- | ---- | ------- | ------------------------------------------------------------ | ------------------- |
| /carts     | GET  | token   | none                                                         | Get Cart            |
| /carts     | POST | token   | image: File<br />description: String<br />name: String<br />price: String<br />id: String<br />count : Number<br />storeName: String<br />stock: Number<br />storeId: objectId | Add product to Cart |
| /carts/:id | put  | token   | none                                                         | remove cart         |

## 

```java
5. List of Product Routes:
```

| **Routes**                | HTTP   | Headers | Body                                                         | Description                               |
| ------------------------- | ------ | ------- | ------------------------------------------------------------ | ----------------------------------------- |
| /products                 | GET    | none    | none                                                         | Get All Product                           |
| /products/category        | GET    | none    | none                                                         | Get All Category                          |
| /products/category/:name  | GET    | none    | none                                                         | Get Product by Category Name              |
| /products/:id             | GET    | none    | none                                                         | Get Product By Id                         |
| /products                 | POST   | token   | name: String<br />description: String<br />price: Number<br />stock: Number<br />category: String<br />condition: String<br />image: File | Create a Product ( only user have store ) |
| /products/wish/:id        | PATCH  | token   | none                                                         | Add Produts to WishList                   |
| /products/wish/remove/:id | PATCH  | token   | none                                                         | remove to WishList                        |
| /products/:id             | DELETE | token   | none                                                         | Delete a Product ( only have Store )      |

## 

## <span style='color:green'>POST</span> /users/signup

​		Create new Account

### Body: <span style='color:red'>(required)</span>

```java
{
  "username": String,
  "password": String,
  "email": String
}
```


Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```java
{
  "msg": String,
  "user": {
    "WishList": Array,
    "History": Array,
    "profile_image": String,
    "address": Array,
    "_id": ObjectId,
    "username": String,
    "password": String,
    "email": String,
    "verification": Boolean,
    "createdAt": Date,
    "role": String,
    "StoreId": ObjectId,
    "__v": 0
  },
  "token": String
}
```



## <span style="color:green">POST</span> /users/signin

​		Logged in User

### Body: <span style='color:red'>(required)</span>

```java
{
  "username": String,
  "password": String
}
```


Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```java
{
  "token": String,
  "user": {
    "WishList": Array,
    "History": Array,
    "profile_image": String,
    "address": Array,
    "_id": ObjectId,
    "username": String,
    "password": String,
    "email": String,
    "verification": Boolean,
    "createdAt": Date,
    "role": String,
    "StoreId": ObjectId,
    "__v": 0
  }
}
```



## <span style="color:green">GET</span> /users

​		Get User Login

### Authentication

<span style='color:red'>Token</span>

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "msg": String,
  "user": {
    "WishList": Array,
    "History": Array,
    "profile_image": String,
    "address": Array,
    "_id": ObjectId,
    "username": String,
    "password": String,
    "email": String,
    "verification": Boolean,
    "createdAt": Date,
    "role": String,
    "StoreId": ObjectId,
    "__v": 0
  }
}
```

## <span style="color:green">PATCH</span> /users/upload

​	Update Address

### Authentication

<span style='color:red'>Token</span>

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "user": {
    "WishList": Array,
    "History": Array,
    "profile_image": String,
    "address": Array,
    "_id": ObjectId,
    "username": String,
    "password": String,
    "email": String,
    "verification": Boolean,
    "createdAt": Date,
    "role": String,
    "StoreId": ObjectId,
    "__v": 0
  }
}
```

## <span style="color:green">POST</span> /users/sendcode

​		send to email

### Authentication

<span style='color:red'>Token</span>

## Body: 

```java
{
  email: String
}
```



Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "msg": String
}
```

## <span style="color:green">PATCH</span> /users/verify

​		Get User Login

### Authentication

<span style='color:red'>Token</span>

## Body:

```java
{
  "code": String
}
```



Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "msg": String,
  "user": {
    "WishList": Array,
    "History": Array,
    "profile_image": String,
    "address": Array,
    "_id": ObjectId,
    "username": String,
    "password": String,
    "email": String,
    "verification": Boolean,
    "createdAt": Date,
    "role": String,
    "StoreId": ObjectId,
    "__v": 0
  }
}
```



## <span style='color:green'>GET</span> /transactions

​		Get all transaction (admin only)

## Authentication

<span style="color:red">Token</span>

Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```java
{
  "ProductId": Array,
  "StoreId": Array,
  "_id": ObjectId,
  "payment": Number,
  "UserId": ObjectId,
  "createdAt": Date,
  "updatedAt": Date,
  "status": Boolean,
  "confirm": Boolean,
  "__v": 0
},
```



## <span style="color:green">POST</span> /transactions

​		Logged in User

## Authentication

<span style='color:red'>Token</span>

Responses : <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :

```java
{
  "transaction": String,
	"product": Array,
  "cart": String,
  "user": ObjectId
}
```



## <span style="color:green">PATCH</span> /transactions/confirm/{:id}

​		Confirmation transaction (admin only)

### Authentication

<span style='color:red'>Token</span>

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "transactions": List Transaction
}
```

## <span style="color:green">PATCH</span> /transactions/received/{:id}

​	Received product

### Authentication

<span style='color:red'>Token</span>

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "transactions": List Transaction
}
```

## <span style="color:green">GET</span> /stores

​		Get Owner Store

### Authentication

<span style='color:red'>Token</span>



Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
 	"store": List of StoreId
}
```

## <span style="color:green">POST</span> /stores

​	Create Stores ( verification user only )

### Authentication

<span style='color:red'>Token</span>

## Body:

```java
{
	"name": String,
  "location": String,
  "link": String
}
```



Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "user": List User,
  "store": List Store,
  "msg": String
}
```



## <span style="color:green">GET</span> /carts

​	Get cart User

### Authentication

<span style='color:red'>Token</span>



Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
	"carts": List of Cart
}
```



## <span style="color:green">POST</span> /**carts**

​	Create Stores ( verification user only )

### Authentication

<span style='color:red'>Token</span>

## Body:

```java
{
	"product_image": String,
  "description": String,
  "name": String,
  "price": Number,
  "id": ObjectId,
  "count": Number,
  "storeName": String,
  "stock": Number,
  "storeId": ObjectId
}
```



Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "msg": String,
  "cart": List of Cart
}
```





## <span style="color:green">PUT</span> /**carts**/{:name}

​	Remove Cart

### Authentication

<span style='color:red'>Token</span>

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
	"cart": List new Cart
}
```



## <span style="color:green">GET</span> /stores

​		Get Owner Store

### Authentication

<span style='color:red'>Token</span>



Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
 	"store": List of StoreId
}
```

## <span style="color:green">POST</span> /stores

​	Create Stores ( verification user only )

### Authentication

<span style='color:red'>Token</span>

## Body:

```java
{
	"name": String,
  "location": String,
  "link": String
}
```



Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "user": List User,
  "store": List Store,
  "msg": String
}
```



## <span style="color:green">GET</span> /products

​	Get All Product



Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "products": [
    {
      "category": [
        "sport",
        "car",
        "life"
      ],
      "_id": "5dd01cee5abbd704fa8e3020",
      "name": "Ferrari SF 90",
      "description": "perfect condition",
      "price": 5000000000,
      "stock": 0,
      "StoreId": {
        "ProductId": [
          "5dd01c755abbd704fa8e301e",
          "5dd01cb55abbd704fa8e301f",
          "5dd01cee5abbd704fa8e3020"
        ],
        "_id": "5dcf4a2d6ab8ac0cbeda4699",
        "Owner": "5dcf498b6ab8ac0cbeda4697",
        "name": "DC Store",
        "location": "palembang",
        "link": "dcstore",
        "createdAt": "2019-11-16T01:00:30.284Z",
        "updatedAt": "2019-11-16T15:59:43.626Z",
        "background_image": "https://storage.cloud.google.com/defaultimage/image.dcpedia.png?authuser=1",
        "store_image": "https://storage.cloud.google.com/defaultimage/open.dcpedia.jpg?authuser=1",
        "__v": 0
      },
      "product_image": "https://storage.googleapis.com/newminiwp/1573919979430SF90-STRADALE.jpg",
      "condition": "second",
      "createdAt": "2019-11-16T15:59:42.805Z",
      "updatedAt": "2019-11-17T04:28:27.531Z",
      "__v": 0
    },
    {
      "category": [
        "zara",
        "bag"
      ],
      "_id": "5dd01cb55abbd704fa8e301f",
      "name": "Bag Zara",
      "description": "pretty bag",
      "price": 2000000,
      "stock": 15,
      "StoreId": {
        "ProductId": [
          "5dd01c755abbd704fa8e301e",
          "5dd01cb55abbd704fa8e301f",
          "5dd01cee5abbd704fa8e3020"
        ],
        "_id": "5dcf4a2d6ab8ac0cbeda4699",
        "Owner": "5dcf498b6ab8ac0cbeda4697",
        "name": "DC Store",
        "location": "palembang",
        "link": "dcstore",
        "createdAt": "2019-11-16T01:00:30.284Z",
        "updatedAt": "2019-11-16T15:59:43.626Z",
        "background_image": "https://storage.cloud.google.com/defaultimage/image.dcpedia.png?authuser=1",
        "store_image": "https://storage.cloud.google.com/defaultimage/open.dcpedia.jpg?authuser=1",
        "__v": 0
      },
      "product_image": "https://storage.googleapis.com/newminiwp/1573919922680zara.jpg",
      "condition": "new",
      "createdAt": "2019-11-16T15:58:45.956Z",
      "updatedAt": "2019-11-17T05:11:15.803Z",
      "__v": 0
    },
    {
      "category": [
        "iphone",
        "electronic",
        "smartphone"
      ],
      "_id": "5dd01c755abbd704fa8e301e",
      "name": "IPHONE XI",
      "description": "With its 6.1-inch display, the iPhone 11 is between the 5.8-inch iPhone 11 Pro and 6.5-inch iPhone 11 Pro Max in size. ... The iPhone 11 measures in at 150.9mm tall, 75.7mm wide, and 8.3mm thick, which is identical to the previous-generation iPhone XR. It weighs in at 6.84 ounces, also identical to the XR.",
      "price": 29000000,
      "stock": 8,
      "StoreId": {
        "ProductId": [
          "5dd01c755abbd704fa8e301e",
          "5dd01cb55abbd704fa8e301f",
          "5dd01cee5abbd704fa8e3020"
        ],
        "_id": "5dcf4a2d6ab8ac0cbeda4699",
        "Owner": "5dcf498b6ab8ac0cbeda4697",
        "name": "DC Store",
        "location": "palembang",
        "link": "dcstore",
        "createdAt": "2019-11-16T01:00:30.284Z",
        "updatedAt": "2019-11-16T15:59:43.626Z",
        "background_image": "https://storage.cloud.google.com/defaultimage/image.dcpedia.png?authuser=1",
        "store_image": "https://storage.cloud.google.com/defaultimage/open.dcpedia.jpg?authuser=1",
        "__v": 0
      },
      "product_image": "https://storage.googleapis.com/newminiwp/1573919854311iphone-11-pro-select-2019-family.jpeg",
      "condition": "new",
      "createdAt": "2019-11-16T15:57:41.978Z",
      "updatedAt": "2019-11-17T05:03:40.257Z",
      "__v": 0
    }
  ]
}
```



## <span style="color:green">GET</span> /products/category

​	Find All Category



Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "categories": [
    "lamborghini",
    "sportcar",
    "otomotif",
    "urus",
    "aventador",
    "limited",
    "porsche",
    "race"
  ]
}
```





## <span style="color:green">GET</span> /products/category/{:name}

​	Get Product by Category Name

Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "products": [
    {
      "category": [
        "lamborghini",
        "sportcar",
        "otomotif"
      ],
      "_id": "5dd0fa85bc84d913fcf65979",
      "name": "Lamborghini Huracan",
      "description": "Specifications of Lamborghini Huracan\nThe Petrol engine is 5204 cc. It is available with the Automatic transmission. Depending upon the variant and fuel type the Huracan has a mileage of 10.6 to 11.24 kmpl. The Huracan is a 2 seater Coupe and has a length of 4459mm, width of 1924mm and a wheelbase of 2620mm.",
      "price": 19000000000,
      "stock": 5,
      "StoreId": {
        "ProductId": [
          "5dd0fa85bc84d913fcf65979",
          "5dd0fb0fbc84d913fcf6597a",
          "5dd0fc59bc84d913fcf6597b",
          "5dd0fce6bc84d913fcf6597c",
          "5dd0fe3cbc84d913fcf6597d"
        ],
        "_id": "5dcf4a2d6ab8ac0cbeda4699",
        "Owner": "5dcf498b6ab8ac0cbeda4697",
        "name": "DC Store",
        "location": "palembang",
        "link": "dcstore",
        "createdAt": "2019-11-16T01:00:30.284Z",
        "updatedAt": "2019-11-17T08:01:01.007Z",
        "background_image": "https://storage.cloud.google.com/defaultimage/image.dcpedia.png?authuser=1",
        "store_image": "https://storage.cloud.google.com/defaultimage/open.dcpedia.jpg?authuser=1",
        "__v": 0
      },
      "product_image": "https://storage.googleapis.com/newminiwp/1573976707275HURACAN.jpg",
      "condition": "new",
      "createdAt": "2019-11-17T07:45:10.346Z",
      "updatedAt": "2019-11-17T07:45:10.346Z",
      "__v": 0
    },
    {
      "category": [
        "lamborghini",
        "sportcar"
      ],
      "_id": "5dd0fb0fbc84d913fcf6597a",
      "name": "Lamborghini SIAN",
      "description": "Sian means flash of lightning in the Sant'Agata automaker's Bolognese Italian dialect — an apt name for a car that's also the company's most powerful creation. The Sian's heart is the same 6.5-liter V12 engine used in the Lamborghini Aventador SVJ with an added twist — electricity.",
      "price": 20000000000,
      "stock": 5,
      "StoreId": {
        "ProductId": [
          "5dd0fa85bc84d913fcf65979",
          "5dd0fb0fbc84d913fcf6597a",
          "5dd0fc59bc84d913fcf6597b",
          "5dd0fce6bc84d913fcf6597c",
          "5dd0fe3cbc84d913fcf6597d"
        ],
        "_id": "5dcf4a2d6ab8ac0cbeda4699",
        "Owner": "5dcf498b6ab8ac0cbeda4697",
        "name": "DC Store",
        "location": "palembang",
        "link": "dcstore",
        "createdAt": "2019-11-16T01:00:30.284Z",
        "updatedAt": "2019-11-17T08:01:01.007Z",
        "background_image": "https://storage.cloud.google.com/defaultimage/image.dcpedia.png?authuser=1",
        "store_image": "https://storage.cloud.google.com/defaultimage/open.dcpedia.jpg?authuser=1",
        "__v": 0
      },
      "product_image": "https://storage.googleapis.com/newminiwp/1573976844764SIAN.jpeg",
      "condition": "new",
      "createdAt": "2019-11-17T07:47:27.933Z",
      "updatedAt": "2019-11-17T07:47:27.933Z",
      "__v": 0
    },
    {
      "category": [
        "lamborghini",
        "urus",
        "sportcar"
      ],
      "_id": "5dd0fc59bc84d913fcf6597b",
      "name": "Lamborghini Urus",
      "description": "The Urus has a front-engine, all-wheel-drive layout, and a top speed of 305 km/h (190 mph) making it one of the world's fastest production SUVs. The Urus can accelerate from 0–100 km/h (62 mph) in 3.6 seconds and 0–200 km/h (124 mph) in 12.8 seconds",
      "price": 15000000000,
      "stock": 5,
      "StoreId": {
        "ProductId": [
          "5dd0fa85bc84d913fcf65979",
          "5dd0fb0fbc84d913fcf6597a",
          "5dd0fc59bc84d913fcf6597b",
          "5dd0fce6bc84d913fcf6597c",
          "5dd0fe3cbc84d913fcf6597d"
        ],
        "_id": "5dcf4a2d6ab8ac0cbeda4699",
        "Owner": "5dcf498b6ab8ac0cbeda4697",
        "name": "DC Store",
        "location": "palembang",
        "link": "dcstore",
        "createdAt": "2019-11-16T01:00:30.284Z",
        "updatedAt": "2019-11-17T08:01:01.007Z",
        "background_image": "https://storage.cloud.google.com/defaultimage/image.dcpedia.png?authuser=1",
        "store_image": "https://storage.cloud.google.com/defaultimage/open.dcpedia.jpg?authuser=1",
        "__v": 0
      },
      "product_image": "https://storage.googleapis.com/newminiwp/1573977174695URUS.jpg",
      "condition": "new",
      "createdAt": "2019-11-17T07:52:57.653Z",
      "updatedAt": "2019-11-17T07:52:57.653Z",
      "__v": 0
    },
    {
      "category": [
        "sportcar",
        "lamborghini",
        "aventador",
        "limited"
      ],
      "_id": "5dd0fce6bc84d913fcf6597c",
      "name": "Lamborghini Aventador SVJ",
      "description": "The future is unknown. It is a journey, an adventure. And above all, it is a challenge.\nLamborghini has never shied away from challenges, which is precisely why it created the new Aventador SVJ. To combine cutting-edge technology with extraordinary design, without ever coming to compromises.\nIn a future driven by technology, it’s easy to lose track of emotions. But in the future we are shaping, real emotions won’t be left behind. Because at the wheel, there will always be a person.\nAventador SVJ. Real emotions shape the future.",
      "price": 29000000000,
      "stock": 5,
      "StoreId": {
        "ProductId": [
          "5dd0fa85bc84d913fcf65979",
          "5dd0fb0fbc84d913fcf6597a",
          "5dd0fc59bc84d913fcf6597b",
          "5dd0fce6bc84d913fcf6597c",
          "5dd0fe3cbc84d913fcf6597d"
        ],
        "_id": "5dcf4a2d6ab8ac0cbeda4699",
        "Owner": "5dcf498b6ab8ac0cbeda4697",
        "name": "DC Store",
        "location": "palembang",
        "link": "dcstore",
        "createdAt": "2019-11-16T01:00:30.284Z",
        "updatedAt": "2019-11-17T08:01:01.007Z",
        "background_image": "https://storage.cloud.google.com/defaultimage/image.dcpedia.png?authuser=1",
        "store_image": "https://storage.cloud.google.com/defaultimage/open.dcpedia.jpg?authuser=1",
        "__v": 0
      },
      "product_image": "https://storage.googleapis.com/newminiwp/1573977314788AVENTADOR-SVJ.jpg",
      "condition": "new",
      "createdAt": "2019-11-17T07:55:18.717Z",
      "updatedAt": "2019-11-17T07:55:18.717Z",
      "__v": 0
    }
  ]
}
```



## <span style="color:green">GET</span> /products/{:id}

​	Get Product By Id



Responses: <blockquote>application/json</blockquote>

<span style='color:green'>Success</span> :		

```java
{
  "product": {
    "category": [
      "sportcar",
      "lamborghini",
      "aventador",
      "limited"
    ],
    "_id": "5dd0fce6bc84d913fcf6597c",
    "name": "Lamborghini Aventador SVJ",
    "description": "The future is unknown. It is a journey, an adventure. And above all, it is a challenge.\nLamborghini has never shied away from challenges, which is precisely why it created the new Aventador SVJ. To combine cutting-edge technology with extraordinary design, without ever coming to compromises.\nIn a future driven by technology, it’s easy to lose track of emotions. But in the future we are shaping, real emotions won’t be left behind. Because at the wheel, there will always be a person.\nAventador SVJ. Real emotions shape the future.",
    "price": 29000000000,
    "stock": 5,
    "StoreId": {
      "ProductId": [
        "5dd0fa85bc84d913fcf65979",
        "5dd0fb0fbc84d913fcf6597a",
        "5dd0fc59bc84d913fcf6597b",
        "5dd0fce6bc84d913fcf6597c",
        "5dd0fe3cbc84d913fcf6597d"
      ],
      "_id": "5dcf4a2d6ab8ac0cbeda4699",
      "Owner": "5dcf498b6ab8ac0cbeda4697",
      "name": "DC Store",
      "location": "palembang",
      "link": "dcstore",
      "createdAt": "2019-11-16T01:00:30.284Z",
      "updatedAt": "2019-11-17T08:01:01.007Z",
      "background_image": "https://storage.cloud.google.com/defaultimage/image.dcpedia.png?authuser=1",
      "store_image": "https://storage.cloud.google.com/defaultimage/open.dcpedia.jpg?authuser=1",
      "__v": 0
    },
    "product_image": "https://storage.googleapis.com/newminiwp/1573977314788AVENTADOR-SVJ.jpg",
    "condition": "new",
    "createdAt": "2019-11-17T07:55:18.717Z",
    "updatedAt": "2019-11-17T07:55:18.717Z",
    "__v": 0
  }
}
```



## <span style='color: green'>POST</span> /products

## Authentication

<span style="color: red">Token</span>

## Body:

```java
{
  "image": File,
  "name": String,
  "description": String,
  "price": Number,
  "stock": Number,
  "category": String,
  "condition": String
}
```



## Response:

```java
{
  "product": List of Product,
  "store": List of Store,
  "msg": String
}
```







# Usage:

```java
$ npm install
$ npm run dev
```

