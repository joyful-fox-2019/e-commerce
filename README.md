# ECOMMERCE <img align="right" height=40; src="./client/public/logo-store-png-5.png">
> Demo  [ecommerce.anggabanny.online](http://ecommerce.anggabanny.online/),

#  ROUTES
|Method|USER|<i>detail</i>|<i>status success</i>|<i>status fail</i>|<i>Authentication</i>|<i>Authorization</i>|
|-|-|-|-|-|-|-|
|`GET`|`/user`|Get all user in database| `200 OK`| `404 Not Found` <br> `500 Internal Server Error`|NO |NO
|`POST`|`/user/signup`|Create User| `201 CREATED`| `404 Not Found` <br> `500 Internal Server Error` <br> `400` `BAD REQUEST`|NO |NO
|`POST`|`/user/signin`|Login User| `200 OK`| `404 Not Found` <br> `500 Internal Server Error` <br> `400 BAD REQUEST`|NO |NO
|`DELETE`|`/user/:id`|Delete User by id| `200 OK`|`404 Not Found` <br> `500 Internal Server Error`|NO |NO
<br>

>

<br>

|Method|PRODUCT|<i>detail</i>|<i>status success</i>|<i>status fail</i>|<i>Authentication</i>|<i>Authorization</i>|
|-|-|-|-|-|-|-|
|`GET`|`/product`|Get all products in database| `200 OK`| `404 Not Found` <br> `500 Internal Server Error`| NO|NO
|`GET`|`/product/myproducts`|Get all my products in database| `200 OK`| `404 Not Found` <br> `500 Internal Server Error`| YES|NO
|`POST`|`/product`|Create Product| `201 CREATED`| `404 Not Found` <br> `500 Internal Server Error` <br> `400 BAD REQUEST`|YES|NO
|`PUT`|`/product/:id`|Update Product and all item in your product with id product | `200 OK`| `404 Not Found` <br> `500 Internal Server Error` <br> `400 BAD REQUEST`|YES|YES
|`DELETE`|`/product/:id`|Delete Product by id product| `200 OK`|`404 Not Found` <br> `500 Internal Server Error`|YES|YES
<br>

>

<br>

|Method|CART|<i>detail</i>|<i>status success</i>|<i>status fail</i>|<i>Authentication</i>|<i>Authorization</i>|
|-|-|-|-|-|-|-|
|`GET`|`/cart`|Get all Cart in database| `200 OK`| `404 Not Found` <br> `500 Internal Server Error`| NO|NO
|`GET`|`/cart/mycarts`|Get all my carts in database| `200 OK`| `404 Not Found` <br> `500 Internal Server Error`| YES|NO
|`POST`|`/cart`|Create Cart| `201 CREATED`| `404 Not Found` <br> `500 Internal Server Error` <br> `400 BAD REQUEST`|YES|NO
|`PATCH`|`/cart/:id`|Update Cart Status for false to true by id cart| `200 OK`| `404 Not Found` <br> `500 Internal Server Error` |YES|YES
|`DELETE`|`/cart/:id`|Delete cart by id cart| `200 OK`|`404 Not Found` <br> `500 Internal Server Error`|YES|YES


# INTRODUCTION !

Sebelum memulai semuanya alangkah lebih baik jika menguji server terlebih dahulu silahkan akses `/`
untuk menguji bahwa server benar benar berjalan dengan baik, server akan mengirim "**connect to server OK!**" jika tidak maka kamu akan melihat error dengan status code `500` artinya ada yang tidak beres dengan server mu. mari lihat bagaimana cara mengatasinya `disini`

# INSTALLATION
## PACKAGE with NPM SERVER SIDE
> npm install 
> [bcrypt]()
> [cors]()
> [express]()
> [gcs-upload]()
> [jsonwebtoken]()
> [mongoose]()
> [morgan]()

> npm install -D
> [dontenv]()

> npm install -D [**TESTING**]
> [mocha]()
> [chai]()
> [chai-http]()

## PACKAGE with VUE-CLI and NPM CLIENT SIDE
> [vue]() create client
> Babel
> Linter
> Vuex
> Router

> npm install
> [axios]()
> [bootstrap-vue]()
> [sweetalert2]()

# DETAIL ROUTE

## USER Component

### created
	> name : your_name [STRING]
	> password : your_password [STRING]
	> email : your_email [STRING]
	> image : your_image_profile [IMAGE-URL]

### login
	> email : your_email [STRING]
	> password : your_password [STRING]

## Product Component
### created and update
	> name : product_name [STRING]
	> description : product_description [STRING]
	> price : product_price [NUMBER]
	> quantities : product_quantities [NUMBER]
	> image : product_image [IMAGE-UR]
	> ** user_id > automatic create

## Cart Component
### created
	> quantities : cart_quantities [NUMBER]
	> product_id : product_id [STRING]
	> ** user_id > automatic create
	
### update quantities
	> quantities : cart_quantities [NUMBER]
	
# information
## STATUS CODE 

| CODE |STATUS | DESCRIPTION | SOLVE HERE
|-|-|-|-|
|<center><i>**``200``**|SUCCESS|Ok|smile:)
|<center><i>**``201``**|SUCCESS|Created| smile:)
|<center><i>**``204``**|SUCCESS|No Content| smile:)
|<center><i>**``400``**|CLIENT ERROR|Bad Request| [Here!]([https://stackoverflow.com/questions/19671317/400-bad-request-http-error-code-meaning](https://stackoverflow.com/questions/19671317/400-bad-request-http-error-code-meaning))
|<center><i>**``401``**|CLIENT ERROR|UnAuthorized| [Here!]([https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses](https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses))
|<center><i>**``403``**|CLIENT ERROR|Forbidden| [Here!]([https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses](https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses))
|<center><i>**``404``**|CLIENT ERROR|Not Found|[Here!]([https://stackoverflow.com/questions/25878787/how-can-i-solve-http-404-and-405-error-msgs](https://stackoverflow.com/questions/25878787/how-can-i-solve-http-404-and-405-error-msgs))
|<center><i>**``405``**|CLIENT ERROR|Not Allowed|[Here!]([https://stackoverflow.com/questions/25878787/how-can-i-solve-http-404-and-405-error-msgs](https://stackoverflow.com/questions/25878787/how-can-i-solve-http-404-and-405-error-msgs))
|<center><i>**``409``**|CLIENT ERROR|Conflict| [Here!]([https://stackoverflow.com/questions/45063805/distinguishing-http-status-code-403-and-409-in-practice-or-400](https://stackoverflow.com/questions/45063805/distinguishing-http-status-code-403-and-409-in-practice-or-400))
|<center><i>**``500``**|SERVER ERROR|Internal Server Error| [Here!]([https://stackoverflow.com/questions/1210380/500-internal-server-error](https://stackoverflow.com/questions/1210380/500-internal-server-error)) 

> silahkan kunjungi situs ini bila anda bingung apa itu [status code]([https://bertzzie.com/knowledge/serverside-nodejs/LampiranBHTTPStatusCode.html](https://bertzzie.com/knowledge/serverside-nodejs/LampiranBHTTPStatusCode.html))

<hr>

> Created by [@anggabannny]([https://github.com/anggabanny](https://github.com/anggabanny))