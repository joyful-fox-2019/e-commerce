# e-commerce
**Base URL: `http://earth.sufrendo.com`**

**List of Routes User:**

| **Route**         | **HTTP** | **Description**                                      |
| ----------------- | -------- | ---------------------------------------------------- |
| /register   | POST     | Sign up with new user info                           |
| /login      | POST     | Sign in and get an access token based on credentials |
| /cart      | GET     | Get current user cart info (login required) |

**List of Routes  Product:**

| **Route**    | **HTTP** | **Description**                       |
| ------------ | -------- | ------------------------------------- |
| /products | GET     | Get all products          |
| /products/user  | GET      | Get products sold by current user (login required)           |
| /products/:id  | GET      |  Get detail info of a single product|
| /products  | POST      |  Add new product (login required)|
| /products/:id  | DELETE      | Delete product (login required)|
| /products/:id  | PUT      | Update product info (login required)|
| /products/:id  | PATCH      | Add product to current user cart (login required)|
| /products/pull/:id  | PATCH    | Delete product from current user cart (login required)|

**Errors:**

| Code | Name                  | Description                               |
| ---- | --------------------- | ----------------------------------------- |
| 400  | Authentication Failed | Email or Password is incorrect            |
| 401  | Unauthorized Access   | We could not process that action          |
| 404  | Not Found             | The requested resource could not be found |
| 500  | Internal Server Error | We had a problem with our server          |

All API requests that require you to login, need to include token in their header.

```
token : <your_token_value>
```
To get token, you need to login with your account, or sign up if you haven't made one. Just follow the instructions below.

**Sign Up**
----
* **URL:** `/register`
* **Method:** `POST`
* **URL Params:** `None`
* **Data Params:**
    ```
	{
	"email":"hacktiv8@mail.com", // String, required, need to be valid email,
    "username:hacktiv8"
	"password":"12345", // String, required, min 5 chars
	}
    ```

* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "msg": "register successful"
    }
    ```


**Login**
----
* **URL:** `/login`
* **Method:** `POST`
* **URL Params:** `None`
* **Data Params:**
	```
    {
	"email":"hacktiv8@mail.com", //String
	"password":"123456" //String
	}
	```
* **Success Response:**
  * **Status:** `200`
    **Content:** 
    
    ```
    {
        "token":"eyJhbGciOiJIUzI1NiJ9. NWRiZjA1ZjNkMWI5NTAzMGQ3YmE1ODhi.kNk6Y7nMGdC2AdIxMd2HSxz9kPqSYkymSXSfyxy9PFY"
    }
    ```
