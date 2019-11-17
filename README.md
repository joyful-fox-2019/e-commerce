# DEPLOY LINK
http://organicommerce.arnoldtherigan.site

## API-DOCUMENTATION (use apiary)
https://ecommerce67.docs.apiary.io


---------------------------------------------------------


FORMAT: 1A
HOST: http://localhost:3000/

# e-commerce (organic)

Organic, a simple e-commerce website. You can login as customer or as admin. Organic selling fruits,vegetables,proteins and grains

## User Register [/users/register]

### register [POST]
+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@mail.com",
            "password": "Gajah123"
        }
+ Response 200 (application/json)

        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTg2MDd9.zE-Eif8lae9_k109u3HLPydLg-ODbl9Apg2rczFz-8E",
            "name": "gajah lucu",
            "_id": "5dbf4eae1e8cce2b5912d071"
        }
        

+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@mail.com",
            "password": "Gajah123"
        }
+ Response 400

        {
            "message": "email is already been used"
        }

+ Request (application/json)

        {
            "name": "",
            "email": "",
            "password": ""
        }
+ Response 400

        {
            "message": [
                "name is required",
                "email is required",
                "password is required"
            ]
        }
        
+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@x",
            "password": "Gajah123"
        }
+ Response 400

        {
            "message": [
                "invalid email format"
            ]
        }

+ Request (application/json)

        {
            "name": "gajah lucu",
            "email": "gajah@mail.com",
            "password": "gajah"
        }
+ Response 400

        {
            "message": [
                 "password shold contain at least one digit, one lower case , one upper case , minumum 6 char"
            ]
        }

## User Login [/users/login]

### login [POST]
+ Request (application/json)

        {
            "email": "gajah@mail.com",
            "password": "Gajah123"
        }
+ Response 200 (application/json)

        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FqYWggbHVjdSIsImVtYWlsIjoiZ2FqYWhAbWFpbC5jb20iLCJfaWQiOiI1ZGJmNGVhZTFlOGNjZTJiNTkxMmQwNzEiLCJpYXQiOjE1NzI4MTg2MDd9.zE-Eif8lae9_k109u3HLPydLg-ODbl9Apg2rczFz-8E",
            "name": "gajah lucu",
            "_id": "5dbf4eae1e8cce2b5912d071"
        }
        

+ Request (application/json)

        {
            "name": "",
            "email": "",
            "password": ""
        }
+ Response 400

        {
            "message": [
                "invalid email/password"
            ]
        }

## Products [/products]

### Post product [POST]
+ Request (multipart/form-data)

        {
              "tags": "beras,grain",
              "name": "Beras  Wanemo",
              "desc": "Beras putih yang tergolong medium pulen dengan jenis beras IR 64 dengan patahannya 14% dan termasuk beras premium. Diproduksi dengan memerhatikan kebersihan beras dari kotoran, batu dan juga gabah.",
              "price": 66700,
              "stock": 25,
              "image": "https://storage.googleapis.com/ecommercetempbucket/1573713406089wanemo.jpg"
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 201 (application/json)

        {
            {
                {
                  "tags": [
                    "beras",
                    "wanemo",
                    "grain"
                  ],
                  "_id": "5dccf6001d9050277601c1f3",
                  "name": "Beras  Wanemo",
                  "desc": "Beras putih yang tergolong medium pulen dengan jenis beras IR 64 dengan patahannya 14% dan termasuk beras premium. Diproduksi dengan memerhatikan kebersihan beras dari kotoran, batu dan juga gabah.",
                  "price": 66700,
                  "stock": 25,
                  "image": "https://storage.googleapis.com/ecommercetempbucket/1573713406089wanemo.jpg",
                  "createdAt": "2019-11-14T06:36:48.968Z",
                  "updatedAt": "2019-11-14T06:36:48.968Z"
                }
            }
        }

## Update/:id [/products/{id}]
### Update product [PUT]

+ Parameters
    + id (number) - ID of the Todo in the form of an integer


+ Request (multipart/form-data)

        {
            "title": "code is bad",
            "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "image": "https://storage.googleapis.com/mini-temp-bucket/1573282779174rubi.png",
            "tags": "Vue,google"
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
            {
                {
                  "message": "update success"
                }
            }
        }

+ Response 400 (application/json)

        {
          "message": "not authorized"
        }

###  Product Detail [GET]

+ Parameters
    + id (number) - ID of the Todo in the form of an integer


+ Request (multipart/form-data)

        {
            "title": "code is bad",
            "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "image": "https://storage.googleapis.com/mini-temp-bucket/1573282779174rubi.png",
            "tags": "Vue,google"
        }

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
            {
                  "tags": [
                    "manga",
                    "indramayu",
                    "segar",
                    "buah"
                  ],
                  "_id": "5dcba3699ad2e21c397aa573",
                  "name": "Mangga Indramayu",
                  "desc": "Mangga Indramayu (Baru panen tunggu mateng 1-2 hari) ",
                  "price": 15000,
                  "stock": 10,
                  "image": "https://storage.googleapis.com/ecommercetempbucket/1573626726991mango.jpg",
                  "createdAt": "2019-11-13T06:32:09.685Z",
                  "updatedAt": "2019-11-13T06:32:09.685Z"
            }
        }

+ Response 400 (application/json)

        {
          "message": "not authorized"
        }

### Delete product [DELETE]

+ Parameters
    + id (number) - ID of the Todo in the form of an integer


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
            {
              "message": "delete success"
            }
        }

+ Response 400 (application/json)

        {
          "message": "not authorized"
        }



## Get Product Query [/products/{?query1}]
### Get Product [GET]

+ Parameters
    + query1 (optional) - A query variable


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
            {
                [
                  {
                    "tags": [
                      "tempe",
                      "protein"
                    ],
                    "_id": "5dccf1a91d9050277601c1eb",
                    "name": "Tempe",
                    "desc": "Tempe adalah salah satu sumber protein favorit di Indonesia. Harganya merakyat, tapi soal gizi dan manfaat jangan diragukan. Tempe adalah bentuk fermentasi dari kacang kedelai, jadi manfaatnya selain dari proses fermentasinya juga dari kacang kedelainya ituloh.",
                    "price": 7900,
                    "stock": 25,
                    "image": "https://storage.googleapis.com/ecommercetempbucket/1573712294218tempe.jpeg",
                    "createdAt": "2019-11-14T06:18:17.208Z",
                    "updatedAt": "2019-11-14T06:18:17.208Z"
                  },
                  {
                    "tags": [
                      "telur",
                      "ayam",
                      "kampung",
                      "telur ayam kampung",
                      "protein"
                    ],
                    "_id": "5dccf20c1d9050277601c1ec",
                    "name": "Telur Ayam Kampung",
                    "desc": "Konsumsi telur bisa memenuhi kebutuhan protein harian untuk tubuh, telur juga punya rasa yang enak baik dikonsumsi anak-anak maupun dewasa. Terutama telur ayam kampung punya tempat tersendiri di hati pecinta telur. Selain bentuknya mungil, rasanya juga khasss loh.",
                    "price": 15800,
                    "stock": 25,
                    "image": "https://storage.googleapis.com/ecommercetempbucket/1573712394348egg.jpg",
                    "createdAt": "2019-11-14T06:19:56.720Z",
                    "updatedAt": "2019-11-14T06:19:56.720Z"
                  },
                  {
                    "tags": [
                      "dada ayam",
                      "ayam",
                      "protein"
                    ],
                    "_id": "5dccf2a61d9050277601c1ed",
                    "name": "Dada Ayam Tanpa Tulang",
                    "desc": "Etanee Boneless Breast adalah ayam dada tanpa tulang dan juga tanpa kulit yang berasal dari ayam halal berkualitas. Menjadikan Boneless Breast ini mudah diolah untuk dikonsumsi sekeluarga.",
                    "price": 71700,
                    "stock": 25,
                    "image": "https://storage.googleapis.com/ecommercetempbucket/1573712546889dadaayam.jpg",
                    "createdAt": "2019-11-14T06:22:30.203Z",
                    "updatedAt": "2019-11-14T06:22:30.203Z"
                  },
                  {
                    "tags": [
                      "towang tahu",
                      "towang",
                      "tahu",
                      "protein"
                    ],
                    "_id": "5dccf32e1d9050277601c1ee",
                    "name": "Towang Tahu",
                    "desc": "Tofu made from soybean, and also know as bean curb. Tofu has a subtle flavor and can be used in savory and sweet dishes and commonly used in stir-fries, soups, and casseroles.",
                    "price": 23500,
                    "stock": 25,
                    "image": "https://storage.googleapis.com/ecommercetempbucket/1573712684614towang.jpg",
                    "createdAt": "2019-11-14T06:24:46.813Z",
                    "updatedAt": "2019-11-14T06:24:46.813Z"
                  }
                ]
            }
        }
        

## Cart/:id [/carts/{id}]
### Add cart [PATCH]

+ Parameters
    + id (number) - ID of the Todo in the form of an integer


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 201 (application/json)

        {
            {
              "qty": 1,
              "_id": "5dcbcfe36d11ef2e2bc7d94c",
              "userId": "5dc90e7b1d191f3e2946a77c",
              "productId": "5dcba3c49ad2e21c397aa575",
              "createdAt": "2019-11-13T09:41:55.475Z",
              "updatedAt": "2019-11-13T09:41:55.475Z"
            }
        }
 
### Delete cart [DELETE]

+ Parameters
    + id (number) - ID of the Todo in the form of an integer


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 201 (application/json)

        {
            {
              "message": "cart deleted"
            }
        }
        
## Cart [/carts]

### Getl All Cart [GET]

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 201 (application/json)

        {
            [
              {
                "qty": 1,
                "_id": "5dd15ecb5d32c23903e2d618",
                "userId": "5dc90e7b1d191f3e2946a77c",
                "productId": {
                  "tags": [
                    "asparagus",
                    "daun",
                    "sayur"
                  ],
                  "_id": "5dcced0a1d9050277601c1df",
                  "name": "Asparagus Hidroponik",
                  "desc": "Asparagus is an herbaceous perennial plant in the family Asparagaceae which is grown for its young shoots, or spears, which are eaten as a vegetable. The spears are between 20 and 40 cm in length. The leaves form scales which are located round the tip and the color is white or green, although there may be purple or pink touches. Asparagus has a very unique flavor that can be described as bright and clean with earthy undertones. Asparagus does a great job working with other flavor, Asparagus can absorbs flavor such as garlic, vinegar, and lemon.",
                  "price": 7900,
                  "stock": 25,
                  "image": "https://storage.googleapis.com/ecommercetempbucket/1573711112106asparagus.webp",
                  "createdAt": "2019-11-14T05:58:34.860Z",
                  "updatedAt": "2019-11-14T05:58:34.860Z"
                },
                "createdAt": "2019-11-17T14:52:59.008Z",
                "updatedAt": "2019-11-17T14:52:59.008Z"
              },
              {
                "qty": 1,
                "_id": "5dd15ecf5d32c23903e2d619",
                "userId": "5dc90e7b1d191f3e2946a77c",
                "productId": {
                  "tags": [
                    "buncis",
                    "sayur"
                  ],
                  "_id": "5dcceeb41d9050277601c1e3",
                  "name": "Buncis",
                  "desc": "Buncis is the little sister of Kacang Panjang, right? The shape is more flat and there s bumps along where the seeds are. It s about 12-13 cm long. The color is pale green and comes in a different shapes. There s more curvy, or just straight. Have you seen and tried buncis before?",
                  "price": 7500,
                  "stock": 25,
                  "image": "https://storage.googleapis.com/ecommercetempbucket/1573711536987buncis.jpg",
                  "createdAt": "2019-11-14T06:05:40.514Z",
                  "updatedAt": "2019-11-14T06:05:40.514Z"
                },
                "createdAt": "2019-11-17T14:53:03.313Z",
                "updatedAt": "2019-11-17T14:53:03.313Z"
              },
              {
                "qty": 1,
                "_id": "5dd15ed85d32c23903e2d61a",
                "userId": "5dc90e7b1d191f3e2946a77c",
                "productId": {
                  "tags": [
                    "semangka",
                    "merah",
                    "buah"
                  ],
                  "_id": "5dccd3c8f4de4b18753fc52b",
                  "name": "Semangka Merah",
                  "desc": "Semangka adalah buah favorit siapa saja! Biasa disajikan dalam acara kelaurga karena bisa untuk banyak orang, selain itu buahnya yang menyegarkan bisa untuk melegakan tenggorokan.",
                  "price": 24000,
                  "stock": 19,
                  "image": "https://storage.googleapis.com/ecommercetempbucket/1573704643998semangka.jpg",
                  "createdAt": "2019-11-14T04:10:48.452Z",
                  "updatedAt": "2019-11-14T04:10:48.452Z"
                },
                "createdAt": "2019-11-17T14:53:12.134Z",
                "updatedAt": "2019-11-17T14:53:12.134Z"
              },
              {
                "qty": 1,
                "_id": "5dd15f015d32c23903e2d61b",
                "userId": "5dc90e7b1d191f3e2946a77c",
                "productId": {
                  "tags": [
                    "blueberry",
                    "buah"
                  ],
                  "_id": "5dccd52af4de4b18753fc52d",
                  "name": "Blueberries Hidroponik",
                  "desc": "Blueberry in 100gr serving contain 57kKal. The uniquely colored blueberry are mild and sweet nutritional packages that come in bunches, and because they re a warm-weather crop, are enjoyed year-round and nearly every continent.",
                  "price": 50300,
                  "stock": 25,
                  "image": "https://storage.googleapis.com/ecommercetempbucket/1573704999222blueberry.jpg",
                  "createdAt": "2019-11-14T04:16:42.340Z",
                  "updatedAt": "2019-11-14T04:16:42.340Z"
                },
                "createdAt": "2019-11-17T14:53:53.455Z",
                "updatedAt": "2019-11-17T14:53:53.455Z"
              },
              {
                "qty": 1,
                "_id": "5dd15f0e5d32c23903e2d61c",
                "userId": "5dc90e7b1d191f3e2946a77c",
                "productId": {
                  "tags": [
                    "jagung",
                    "corn",
                    "sayur"
                  ],
                  "_id": "5dcced661d9050277601c1e0",
                  "name": "Jagung Manis",
                  "desc": "Did you know that Sweet Corn is a mutation result from different kind of corn? Yup. That s right. Sweet Corn more of a flat shape and sometimes bulky at the bottom. It s sweet and that s why it s suit more for vegetables.",
                  "price": 7200,
                  "stock": 25,
                  "image": "https://storage.googleapis.com/ecommercetempbucket/1573711204021jagung.jpeg",
                  "createdAt": "2019-11-14T06:00:06.623Z",
                  "updatedAt": "2019-11-14T06:00:06.623Z"
                },
                "createdAt": "2019-11-17T14:54:06.753Z",
                "updatedAt": "2019-11-17T14:54:06.753Z"
              }
            ]
        }

## transaction [/transactions]

### Get Transaction [GET]

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
            [
              {
                "products": [
                  {
                    "productId": "5dccec6b1d9050277601c1dd",
                    "name": "Brokoli",
                    "price": 9900,
                    "image": "https://storage.googleapis.com/ecommercetempbucket/1573710952305brokoli.jpg",
                    "quantity": 1
                  }
                ],
                "deliverStatus": true,
                "totalPrice": 9900,
                "_id": "5dd17b045d32c23903e2d61f",
                "userId": {
                  "role": "customer",
                  "_id": "5dc90e7b1d191f3e2946a77c",
                  "name": "arnold",
                  "email": "arnold@mail.com",
                  "password": "$2a$10$wMXOnH4/oMqbKZWxntP5Sec24ouTPJisawyzSKEieHUYdQnde8t7K",
                  "createdAt": "2019-11-11T07:32:11.073Z",
                  "updatedAt": "2019-11-11T07:32:11.073Z"
                },
                "createdAt": "2019-11-17T16:53:24.455Z",
                "updatedAt": "2019-11-17T18:52:17.272Z"
              },
              {
                "products": [
                  {
                    "productId": "5dcceff91d9050277601c1e6",
                    "name": "Daun Singkong",
                    "price": 8900,
                    "image": "https://storage.googleapis.com/ecommercetempbucket/1573711863042daunsingkong.jpg",
                    "quantity": 1
                  },
                  {
                    "productId": "5dccf5a51d9050277601c1f2",
                    "name": "Segitiga Biru",
                    "price": 11500,
                    "image": "https://storage.googleapis.com/ecommercetempbucket/1573713315337segitiga.jpeg",
                    "quantity": 1
                  }
                ],
                "deliverStatus": true,
                "totalPrice": 20400,
                "_id": "5dd181fd5d32c23903e2d626",
                "userId": {
                  "role": "customer",
                  "_id": "5dc90e7b1d191f3e2946a77c",
                  "name": "arnold",
                  "email": "arnold@mail.com",
                  "password": "$2a$10$wMXOnH4/oMqbKZWxntP5Sec24ouTPJisawyzSKEieHUYdQnde8t7K",
                  "createdAt": "2019-11-11T07:32:11.073Z",
                  "updatedAt": "2019-11-11T07:32:11.073Z"
                },
                "createdAt": "2019-11-17T17:23:09.992Z",
                "updatedAt": "2019-11-17T18:59:13.764Z"
              },
              {
                "products": [
                  {
                    "productId": "5dccec6b1d9050277601c1dd",
                    "name": "Brokoli",
                    "price": 9900,
                    "image": "https://storage.googleapis.com/ecommercetempbucket/1573710952305brokoli.jpg",
                    "quantity": 1
                  }
                ],
                "deliverStatus": false,
                "totalPrice": 9900,
                "_id": "5dd182485d32c23903e2d62a",
                "userId": {
                  "role": "customer",
                  "_id": "5dd182375d32c23903e2d628",
                  "name": "gajah besar",
                  "email": "gajah@mail.com",
                  "password": "$2a$10$zT69CMCcnm09lvdbBfDXsuTUEoPc18fHkUF5cjdiSCCttzIrt0YvW",
                  "createdAt": "2019-11-17T17:24:07.120Z",
                  "updatedAt": "2019-11-17T17:24:07.120Z"
                },
                "createdAt": "2019-11-17T17:24:24.004Z",
                "updatedAt": "2019-11-17T17:24:24.004Z"
              }
            ]
        }
 

### Add Transaction [PATCH]

+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 201 (application/json)

        {
            {
                "message": "transaction success"
            }
        }
 
## transaction/:id [/transactions/{id}]
### Update Delivery Status [PATCH]

+ Parameters
    + id (number) - ID of the Todo in the form of an integer


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 201 (application/json)

        {
            {
              "products": [
                {
                  "productId": "5dccf1491d9050277601c1ea",
                  "name": "Daun Basil Ungu",
                  "price": 8300,
                  "image": "https://storage.googleapis.com/ecommercetempbucket/1573712197684basil.png",
                  "quantity": 1
                },
                {
                  "productId": "5dccd5b9f4de4b18753fc52f",
                  "name": "Nanas Honi",
                  "price": 15800,
                  "image": "https://storage.googleapis.com/ecommercetempbucket/1573705143625nanas.jpg",
                  "quantity": 1
                },
                {
                  "productId": "5dccd65af4de4b18753fc530",
                  "name": "Strawberry",
                  "price": 33200,
                  "image": "https://storage.googleapis.com/ecommercetempbucket/1573705303271strawberry.jpg",
                  "quantity": 2
                }
              ],
              "deliverStatus": true,
              "totalPrice": 90500,
              "_id": "5dd17c475d32c23903e2d623",
              "userId": "5dc90e7b1d191f3e2946a77c",
              "createdAt": "2019-11-17T16:58:47.950Z",
              "updatedAt": "2019-11-17T18:58:13.019Z"
            }
        }
 

     
## Customer [/transactions/customer]
### Transaction [GET]


+ Request
    + Headers

            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXJub2xkIHRoZXJpZ2FuIiwiZW1haWwiOiJhcm5vbGR0aGVyaWdhbjE1QGdtYWlsLmNvbSIsIl9pZCI6IjVkYmQ2NzA3MjJlYzA2M2M0ZGJiOWQ5MSIsImlhdCI6MTU3Mjc5NTIwNH0.t8gPkA68mipNpz67WGjdXCsA1yLp_ZlnSJfLo4w9x3U"

+ Response 200 (application/json)

        {
            [
              {
                "products": [
                  {
                    "productId": "5dccf1491d9050277601c1ea",
                    "name": "Daun Basil Ungu",
                    "price": 8300,
                    "image": "https://storage.googleapis.com/ecommercetempbucket/1573712197684basil.png",
                    "quantity": 1
                  },
                  {
                    "productId": "5dccd5b9f4de4b18753fc52f",
                    "name": "Nanas Honi",
                    "price": 15800,
                    "image": "https://storage.googleapis.com/ecommercetempbucket/1573705143625nanas.jpg",
                    "quantity": 1
                  },
                  {
                    "productId": "5dccd65af4de4b18753fc530",
                    "name": "Strawberry",
                    "price": 33200,
                    "image": "https://storage.googleapis.com/ecommercetempbucket/1573705303271strawberry.jpg",
                    "quantity": 2
                  }
                ],
                "deliverStatus": false,
                "totalPrice": 90500,
                "_id": "5dd17c475d32c23903e2d623",
                "userId": "5dc90e7b1d191f3e2946a77c",
                "createdAt": "2019-11-17T16:58:47.950Z",
                "updatedAt": "2019-11-17T16:58:47.950Z"
              },
              {
                "products": [
                  {
                    "productId": "5dcceff91d9050277601c1e6",
                    "name": "Daun Singkong",
                    "price": 8900,
                    "image": "https://storage.googleapis.com/ecommercetempbucket/1573711863042daunsingkong.jpg",
                    "quantity": 1
                  },
                  {
                    "productId": "5dccf5a51d9050277601c1f2",
                    "name": "Segitiga Biru",
                    "price": 11500,
                    "image": "https://storage.googleapis.com/ecommercetempbucket/1573713315337segitiga.jpeg",
                    "quantity": 1
                  }
                ],
                "deliverStatus": false,
                "totalPrice": 20400,
                "_id": "5dd181fd5d32c23903e2d626",
                "userId": "5dc90e7b1d191f3e2946a77c",
                "createdAt": "2019-11-17T17:23:09.992Z",
                "updatedAt": "2019-11-17T17:23:09.992Z"
              }
            ]
        }
 
