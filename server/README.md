# E-commerce

E-commerce is a simple website to buy item via online market.

Fitur:

1. 

 Here's the documentation:

## User

- **/click/users/signup**

| Method | Header | Params | Data                                                      |
| ------ | ------ | ------ | --------------------------------------------------------- |
| `POST` | `none` | `none` | name: `string`<br>email: `string` <br> password: `string` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `201` <br> Content: `{ newUser, message: 'succes sign up' `} | Status: `400` <br> Content: `{"error": ["name is required", "email is required", " invalid email format", "email already registered", "password required", "password min 8 char"]}` |


- **/click/users/signin**

| Method | Header | Params | Data                                       |
| ------ | ------ | ------ | ------------------------------------------ |
| `POST` | `none` | `none` | identity: `string` <br> password: `string` |

| Success Response                               | Error Response                                               |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{message, token}` | Status: `400` <br> Content: `{"error": ["identity required","password required", "invalid email/password"]}` |


- **/click/users/loginGoogle**

| Method | Header                            | Params | Data   |
| ------ | --------------------------------- | ------ | ------ |
| `POST` | Google `id_token`,`name`, `email` | `none` | `none` |

| Success Response                      | Error Response                                               |
| ------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{token}` | Status: `400` <br> Content: `{"error": ["The verifyIdToken method requires an ID Token]"}` |

## Items

This end point need authentication from verified user .

- **/click/items**
  Get all items for costumer and admin.

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                      | Error Response                                           |
| ------------------------------------- | -------------------------------------------------------- |
| Status: `200` <br> Content: `{items}` | Status: `400` <br> Content: `{"error": ["login first"]}` |

- **/click/items/:id**
  Get one item from authenticated user with specific item`id`. 

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                     | Error Response                                               |
| ------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{item}` | Status: `403` <br> Content: `{error: ["login first", "data not found"]}` |

- **/click/items/**
  Create items for admin only.

| Method | Header  | Params | Data                                                         |
| ------ | ------- | ------ | ------------------------------------------------------------ |
| `POST` | `token` | `none` | name: `string`<br/>description: `string` <br/> price: `number`<br> stock: `number`<br>image: `string` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{ newItem, message: 'succes add item'}` | Status: `403` <br> Content: `{error: ["login first", "restricted admin only", "image is required", "name is required", "description is required", "price is required", "stock is required"]}` |

- **/click/items/:id**
  Update `item`.  This end point is for admin only.

| Method | Header  | Params       | Data                                                         |
| ------ | ------- | ------------ | ------------------------------------------------------------ |
| `PUT`  | `token` | id: `string` | name: `string`<br/>description: `string` <br/> price: `number`<br/> stock: `number`<br/> |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{item, message:"success update item"}` | Status: `404` <br> Content: `{error: "login first","restricted admin only", "data not found"}` |


- **/click/items/:id**
  Delete `item`. This end point is for admin only.

| Method   | Header  | Params       | Data   |
| -------- | ------- | ------------ | ------ |
| `DELETE` | `token` | id: `string` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{item, message: "succes delete item"}` | Status: `404` <br> Content: `{error: "login first", "restricted admin only", "data not found"}` |

## Carts

This end point need authentication from verified user .

- **/click/items**
  Get all items for costumer and admin.

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                      | Error Response                                           |
| ------------------------------------- | -------------------------------------------------------- |
| Status: `200` <br> Content: `{items}` | Status: `400` <br> Content: `{"error": ["login first"]}` |

- **/click/items/:id**
  Get one item from authenticated user with specific item`id`. 

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                     | Error Response                                               |
| ------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{item}` | Status: `403` <br> Content: `{error: ["login first", "data not found"]}` |

- **/click/items/**
  Create items for admin only.

| Method | Header  | Params | Data                                                         |
| ------ | ------- | ------ | ------------------------------------------------------------ |
| `POST` | `token` | `none` | name: `string`<br/>description: `string` <br/> price: `number`<br> stock: `number`<br>image: `string` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{ newItem, message: 'succes add item'}` | Status: `403` <br> Content: `{error: ["login first", "restricted admin only", "image is required", "name is required", "description is required", "price is required", "stock is required"]}` |

- **/click/items/:id**
  Update `item`.  This end point is for admin only.

| Method | Header  | Params       | Data                                                         |
| ------ | ------- | ------------ | ------------------------------------------------------------ |
| `PUT`  | `token` | id: `string` | name: `string`<br/>description: `string` <br/> price: `number`<br/> stock: `number`<br/> |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{item, message:"success update item"}` | Status: `404` <br> Content: `{error: "login first","restricted admin only", "data not found"}` |


- **/click/items/:id**
  Delete `item`. This end point is for admin only.

| Method   | Header  | Params       | Data   |
| -------- | ------- | ------------ | ------ |
| `DELETE` | `token` | id: `string` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{item, message: "succes delete item"}` | Status: `404` <br> Content: `{error: "login first", "restricted admin only", "data not found"}` |



## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```

## 

