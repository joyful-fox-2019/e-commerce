# E-commerce

## User routes
- - -
| Routes         | HTTP | Headers | Body | Description |
|----------------|------|---------|------|-------------|
| /users/register | POST | None | name: string, email: string, password: string | Create a new user |
| /users/login    | POST | None | email: string, password: string | Log in from an existing account |
| /users/googleSignIn | POST | googleidtoken: string | None | Sign in using a Google account |
| /users/user | GET | access_token: string | None | Find a user by id |

## Admin routes
- - -

Sign in with the following email address and password to access admin routes:
- email: admin@admin.com
- password: admin123


## Product routes
| Routes         | HTTP | Headers | Body | Description |
|----------------|------|---------|------|-------------|
| /products | GET | None | None | Fetch all products |
| /products | POST | access_token: string | name: string, price: integer, qty: integer | Create a new product |
| /products/:id | GET | None | None | Find a product by id |
| /products/:id | PATCH | access_token: string | [name: string [, price: integer [, qty: integer | Update a product by id |
| /products/:id | DELETE | access_token: string | None | Delete a product by id |

## Cart routes
| Routes         | HTTP | Headers | Body |
|----------------|------|---------|------|
| /carts | POST | access_token: string | productId: ObjectId, qty: integer | Add a product to a cart |
| /carts/:id/:productId | DELETE | access_token: string | None | Delete a product in a cart |
| /carts/:id/:productId | PATCH | access_token: string | qty: integet | Update a product's quantity in a cart |