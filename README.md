E-COMMERCE REST API

---
You can try this API from 35.198.214.119
example 35.198.214.119/users/readAll

USER

Create New User

    '/users/'
    Method: 'POST'
    require body {
    	username: <string>,
    	email: <string>, 
    	password: <string>
    	}	

output example:

    {
        "user": {
            "balanced": 0,
            "shop": [],
            "_id": "5dca6151a289ef3f793aee0d",
            "username": "orca",
            "password": "<Password with Hash>",
            "email": "orca@mail.com"
        },
        "message": "Hallo orca, Thank You For Registering"
    }

validation error example :

    {
        "message": "Username Cannot be Empty, orca@mail.com already taken, please take another one"
    }



Login User

    '/users/login'
    Method: 'POST'
    require body {
    	username: <string>,
    	password: <string>
    	}	

output example:

    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkY2E2MmU5YTI4OWVmM2Y3OTNhZWUwZiIsInVzZXJuYW1lIjoibGlvbiIsImlhdCI6MTU3MzU0NDcwMCwiZXhwIjoxNTczNTQ4MzAwfQ.Uebg80EMxpjERhu-YZXcvb_tEyor-sAmdKqhaCmIkTg",
        "message": "Welcome <username>, we hope you enjoy our app!"
    }

validation error example :

    {
        "message": "Invalid Username / Password !!"
    }



Topup

    '/users/topups'
    Method: 'POST',
    headers: token
    require body {
    	topup: <number>
    	}	

output example:

    {
        "message": "Thank You for your TopUp, Your balance now Rp. 2000000"
    }

authenticate error example

    {
        "message": "You must Login First as User"
    }



Product

Create Product

    '/products/'
    Method: 'POST',
    headers: token
    Require Body {
        	productName: <string>,
        	description: <string>,
        	price: <number>,
        	
    	}

output example:

    {
        "user": {
            "n": 1,
            "nModified": 1,
            "ok": 1
        },
        "message": "Your Product added with success!"
    }

authenticate error example:

    {
        "message": "You must Login First as User"
    }



Get all Products

    '/products/'
    Method: 'GET',
    headers: token

output example:

    [
        {
            "rating": 0,
            "voting": [],
            "_id": "5dcbc524c83a3150054c71f7",
            "productName": "Sepatu Adidas",
            "description": "Sepatu Asli Buatan Jerman",
            "stocks": 5,
            "price": 200000,
            "userId": {
                "balanced": 2000000,
                "shop": [
                    "5dcbc524c83a3150054c71f7",
                    "5dcbc5dac83a3150054c71f8",
                    "5dcbc5f7c83a3150054c71f9",
                    "5dcc2a6aeb670b2f950f5d7c"
                ],
                "_id": "5dcbc47cc83a3150054c71f4",
                "username": "owl",
                "password": 										"$2a$10$F6cvH6aadbEHKtJFrTLSsO1.K84eV8L/1nBt5ERNeDja.37OuU826",
                "email": "owl@mail.com"
            }
        },
        {
            "rating": 0,
            "voting": [],
            "_id": "5dcbc5dac83a3150054c71f8",
            "productName": "sepatu zarra",
            "description": "Sepatu Asli Buatan USA",
            "stocks": 2,
            "price": 350000,
            "userId": {
                "balanced": 2000000,
                "shop": [
                    "5dcbc524c83a3150054c71f7",
                    "5dcbc5dac83a3150054c71f8",
                    "5dcbc5f7c83a3150054c71f9",
                    "5dcc2a6aeb670b2f950f5d7c"
                ],
                "_id": "5dcbc47cc83a3150054c71f4",
                "username": "owl",
                "password": "$2a$10$F6cvH6aadbEHKtJFrTLSsO1.K84eV8L/1nBt5ERNeDja.37OuU826",
                "email": "owl@mail.com"
            }
        },
        {
            "rating": 0,
            "voting": [],
            "_id": "5dcbc5f7c83a3150054c71f9",
            "productName": "sepatu boot",
            "description": "Sepatu Asli BuatanIDR",
            "stocks": 4,
            "price": 400000,
            "userId": {
                "balanced": 2000000,
                "shop": [
                    "5dcbc524c83a3150054c71f7",
                    "5dcbc5dac83a3150054c71f8",
                    "5dcbc5f7c83a3150054c71f9",
                    "5dcc2a6aeb670b2f950f5d7c"
                ],
                "_id": "5dcbc47cc83a3150054c71f4",
                "username": "owl",
                "password": "$2a$10$F6cvH6aadbEHKtJFrTLSsO1.K84eV8L/1nBt5ERNeDja.37OuU826",
                "email": "owl@mail.com"
            }
        }
     ]

authenticate error example:

    {
        "message": "You must Login First as User"
    }



Get User Products

    '/products/me'
    Method: 'POST',
    headers: token

output example:

    [
            "rating": 0,
            "voting": [],
            "_id": "5dcc2a6aeb670b2f950f5d7c",
            "productName": "Sepeda Pixy",
            "description": " Sepeda Buatan Tahun 2011",
            "stocks": 2,
            "price": 450000,
            "image": "https://cdn11.bigcommerce.com/s-gud7r2x2lu/images/stencil/500x659/products/595/2346/Olay_Regen_Whip_Face_Moisturizer_SPF_CE__59669.1568295106.jpg?c=2",
            "userId": "5dcbc47cc83a3150054c71f4"
        },
        {
            "rating": 0,
            "voting": [],
            "_id": "5dcc2d8295b0b730fc6c4672",
            "productName": "Baju Pierre Cardine",
            "description": "Kemeja merek Pierre Cardine",
            "stocks": 15,
            "price": 90000,
            "image": "https://cdn11.bigcommerce.com/s-gud7r2x2lu/images/stencil/500x659/products/595/2346/Olay_Regen_Whip_Face_Moisturizer_SPF_CE__59669.1568295106.jpg?c=2",
            "userId": "5dcbc47cc83a3150054c71f4"
        }
    ]

authenticate error example:

    {
        "message": "You must Login First as User"
    }



Delete User Products

    '/products/<productId>'
    Method: 'DELETE',
    headers: token

output example:

    {
        "message": "sepatu zarra has been deleted"
    }



Cart

---

Create (Or Update) cart

    '/carts/<productId>'
    Method: 'POST',
    headers: token,
    body: {
        amounts: <number>,
        totalPrice: <number>
    }

If there is no cart with same productId & userId (the two conditions must be fulfilled), server will create a new cart

here the output example:

    {
        "message": "Product already added to your cart"
    }

if there is cart with same productId & userId, server will updated amounts in cart

here the output example:

    {
        "message": "Your product in cart already Updated"
    }

error example if stocks product less than demand:

    {
        "message": "This product stock just 4 left"
    }

*in this case we assume that the demand is greater than 4



Delete

    '/carts/<cartId>'
    Method: 'Delete',
    headers: token,
    

output example:

    {
        "message": "Cart Already Deleted"
    }





Transaction

---









Error

authenticate error example:

    {
        "message": "You must Login First as User"
    }



validation error example

    {
        "message": "Invalid Username / Password !!"
    }




