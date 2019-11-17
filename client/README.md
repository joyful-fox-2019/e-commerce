# E-COMMERCE

## Author : Luky Winata

#### **How To**

```
HOSTING URL: 

1. npm install in server and client folder
2. npm run dev in server folder
3. npm run serve in client folder
```

#### **Errors:**

| Code | Name                  | Description          |
| :--- | :-------------------- | :------------------- |
| 400  | Bad Request           | Client's Mistake     |
| 401  | Authentication Failed | Unauthorized Access  |
| 403  | Unauthorized Access   | Invalid Access Token |
| 500  | Internal Server Error | Internal Error       |

**400:**

```
{
    [
        "Name is required",
        "E-mail is required",
        "Password is required"
    ]
}
```

**401:**

```
{
    "message": "User is unauthorized for this access"
}
```

**403:**

```
{
    "message": "User's session has been expired"
}
```

**500:**

```
{
    "message": "Internal Server Error"
}
```

### **Register User**

- **URL:** `/users/register`

- **Method:** `POST`

- **Body Data:**

  ```
  name: Luky Winata
  email: luky@admin.com
  password: 12345
  city: Jakarta
  ```

- **Success Response:**

  - **Status:** 201 

  - **Content:**

    ```
    {
        "_id": "5dd0e6fa696ea0163e011817",
        "name": "Luky",
        "email": "luky@admin.com",
        "password": "$2a$10$aegRYNNBsOgIWVE0/oqNjOse1RjygMH/...,
        "city": "Jakarta",
        "__v": 0
    }
    ```

### **Login User**

- **URL:** `/users/login`

- **Method:** `POST`

- **Body Data:**

  ```
  email: luky@admin.com
  password: 12345
  ```

- **Success Response:**

  - **Status:** 200 

  - **Content:**

    ```
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjV....
        "secret": "ecommerce-hacktiv8-phase-2",
        "name": "admin_ecommerce_toko46"
    }
    ```

### **Create New Product**

- **URL:** `/products`

- **Method:** `POST`

- **Headers:** `access_token = [string]`

- **Body Data:**

  ```
  name: Helm Arai
  image: http://localhost:3000/helm.jpg
  price: 10000000
  stock: 10
  ```

- **Success Response:**

  - **Status:** 201 

  - **Content:**

    ```
    {
        "_id": "5dd0e8b8696ea0163e011818",
        "name": "Helm Arai",
        "image": "http://localhost:3000/helm.jpg",
        "price": 10000000,
        "stock": 10,
        "createdAt": "2019-11-17T06:29:12.765Z",
        "updatedAt": "2019-11-17T06:29:12.765Z",
        "__v": 0
    }
    ```

### **List All Products**

- **URL:** `/products`

- **Method:** `GET`

- **Headers:** `access_token = [string]`

- **Success Response:**

  - **Status:** 200

  - **Content:**

    ```
    [
        {
            "_id": "5dd0224dc1672c430a7fbdc3",
            "name": "Arai II",
            "image": "https://storage.googleapis.com/image-upload-ecommerce.lukywinata.com/1573921355227Helm-2.jpg",
            "price": 5000000,
            "stock": 75,
            "createdAt": "2019-11-16T16:22:37.736Z",
            "updatedAt": "2019-11-17T01:43:52.855Z",
            "__v": 0
        },
        {
            "_id": "5dd0e8b8696ea0163e011818",
            "name": "Helm Arai",
            "image": "http://localhost:3000/helm.jpg",
            "price": 10000000,
            "stock": 10,
            "createdAt": "2019-11-17T06:29:12.765Z",
            "updatedAt": "2019-11-17T06:29:12.765Z",
            "__v": 0
        }
    ]
    ```

## **Get One Product's Detail** 

- **URL:** `/products/:id`

- **Method:** `GET`

- **Headers:** `access_token = [string]`

- **Params:** `id = [string]`

- **Success Response:**

  - **Status:** 200 

  - **Content:**

    ```
    {
        "_id": "5dd0e8b8696ea0163e011818",
        "name": "Helm Arai",
        "image": "http://localhost:3000/helm.jpg",
        "price": 10000000,
        "stock": 10,
        "createdAt": "2019-11-17T06:29:12.765Z",
        "updatedAt": "2019-11-17T06:29:12.765Z",
        "__v": 0
    }
    ```

## **Update One Product's Detail** 

- **URL:** `/products/:id`

- **Method:** `PUT`

- **Headers:** `access_token = [string]`

- **Params:** `id = [string]`

- **Success Response:**

  - **Status:** 200 

  - **Content:**

    ```
    {
        "_id": "5dd0e8b8696ea0163e011818",
        "name": "Helm Arai",
        "image": "http://localhost:3000/helm.jpg",
        "price": 10000000,
        "stock": 100,
        "createdAt": "2019-11-17T06:29:12.765Z",
        "updatedAt": "2019-11-17T06:29:12.765Z",
        "__v": 0
    }
    ```

## Delete Product

- **URL:** `/products/:id`

- **Method:** `DELETE`

- **Headers:** `access_token = [string]`

- **Params:** `id = [string]`

- **Success Response:**

  - **Status:** 200 **Content:**

    ```
    {
        "_id": "5dd0e8b8696ea0163e011818",
        "name": "Helm Arai",
        "image": "http://localhost:3000/helm.jpg",
        "price": 10000000,
        "stock": 100,
        "createdAt": "2019-11-17T06:29:12.765Z",
        "updatedAt": "2019-11-17T06:29:12.765Z",
        "__v": 0
    }
    ```
    
    
### **Create New Cart**

- **URL:** `/carts`

- **Method:** `POST`

- **Headers:** `access_token = [string]`

- **Body Data:**

  ```
  product: 5dd0e8b8696ea0163e011818
  quantity: 10
  ```

- **Success Response:**

  - **Status:** 201 

  - **Content:**

    ```
    {
        "UserId": "5dd0e6fa696ea0163e011817",
        "product": "5dd0e8b8696ea0163e011818",
        "quantiy": 10,
        "isCheckedOut": false,
        "__v": 0
    }
    ```

### **List All Carts**

- **URL:** `/carts`

- **Method:** `GET`

- **Headers:** `access_token = [string]`

- **Success Response:**

  - **Status:** 200

  - **Content:**

    ```
    [
        {
            "UserId": "5dd0e6fa696ea0163e011817",
            "product": "5dd0e8b8696ea0163e011818",
            "quantiy": 10,
            "isCheckedOut": false,
            "__v": 0
        },
        ...
    ]
    ```

## **Update One Cart's Detail** 

- **URL:** `/products/:id`

- **Method:** `PATCH`

- **Headers:** `access_token = [string]`

- **Params:** `id = [string]`

- **Success Response:**

  - **Status:** 200 

  - **Content:**

    ```
        {
            "UserId": "5dd0e6fa696ea0163e011817",
            "product": "5dd0e8b8696ea0163e011818",
            "quantiy": 5,
            "isCheckedOut": false,
            "__v": 0
        }
    ```


## **Delete Cart** 

- **URL:** `/carts/:id`

- **Method:** `DELETE`

- **Headers:** `access_token = [string]`

- **Params:** `id = [string]`

- **Success Response:**

  - **Status:** 200 

  - **Content:**

    ```
        {
            "UserId": "5dd0e6fa696ea0163e011817",
            "product": "5dd0e8b8696ea0163e011818",
            "quantiy": 5,
            "isCheckedOut": false,
            "__v": 0
        }
    ```

### **Create New Transaction**

- **URL:** `/transactions`

- **Method:** `POST`

- **Headers:** `access_token = [string]`

- **Body Data:**

  ```
  productsList: [5dd0e8b8696ea0163e011818,..]
  totalCost: 1000000000000,
  status: booked
  ```

- **Success Response:**

  - **Status:** 201 

  - **Content:**

    ```
    {   
        "UserId": "5dd0e6fa696ea0163e011817"
        "productsList": ["5dd0e8b8696ea0163e011818", ...]
        "totalCost": 1000000000000,
        "status": "booked"
    }
    ```

### **List All Transactions**

- **URL:** `/transactions`

- **Method:** `GET`

- **Headers:** `access_token = [string]`

- **Success Response:**

  - **Status:** 200

  - **Content:**

    ```
    [
        {   
            "UserId": "5dd0e6fa696ea0163e011817"
            "productsList": ["5dd0e8b8696ea0163e011818", ...]
            "totalCost": 1000000000000,
            "status": "booked"
        },
        ...
    ]
    ```

## **Update Transaction's status** 

- **URL:** `/transactions/:id`

- **Method:** `PATCH`

- **Headers:** `access_token = [string]`

- **Params:** `id = [string]`

- **Success Response:**

  - **Status:** 200 

  - **Content:**

    ```
        {   
            "UserId": "5dd0e6fa696ea0163e011817"
            "productsList": ["5dd0e8b8696ea0163e011818", ...]
            "totalCost": 1000000000000,
            "status": "paid"
        }
    ```


