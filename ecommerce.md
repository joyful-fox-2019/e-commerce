## **Ecommerce**

Base URL: ``

## **1. Google OAuth**

Sign-in via GoogleOAuth 2.0 and return json web token

- **URL:**
  `/google-signin`
- **Method:**
  `POST`
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ jwtToken : token }`
- **Error Response:**
  - **Code:** 500 Internal Server Error
  - **Content:** `{ error : "fail to generate token" }`
- **Sample Call:**

  ```javascript
  ```

## **2. Register**

Before use the app, user must register first to web

- **URL**
  `/users/register`
- **Method:**
  `POST`
- **Data:**
  - **Username:** String
  - **Email:** String
  - **Password:** String
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ username: String, email: String, password: String }`
- **Error Response:**
  - **Code:** 500 Internal Server Error
  - **Content:** `{ error : "Register Failed" }`
- **Sample Call:**

  ```javascript
  axios({
    url: "/users/register",
    method: "POST",
    data: {
      username,
      email,
      password
    }
  });
  ```

## **3. Login**

- **URL:**
  `/users/login`
- **Method:**
  `POST`
- **Data:**
  - **Email:** String
  - **Password:** String
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ jwtToken : token }`
- **Error Response:**
  - **Code:** 500 Internal Server Error
  - **Content:** `{ error : "fail to login to web" }`
- **Sample Call:**

  ```javascript
  axios({
    url: "/users/login",
    method: "POST",
    data: {
      email,
      password
    }
  });
  ```
