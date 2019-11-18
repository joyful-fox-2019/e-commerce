<template>
    <div class="profile">
        <nav class="navbar is-black" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="#" @click="back">
                <!-- <img src="" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="112" height="28"> -->
                <h4><<< Back</h4>
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>
        </nav>
      
        <div>
        <div class="columns" style="height:100vh;">
            <div class="column is-one-third" style="background-color:whitesmoke;">
                <div class="container" style="margin-top: 25px;">
                <div class="topup" style="margin-top: 5px; margin-bottom: 10px;">
                    <h4>TopUp</h4>
                    <div class="field">
                        <div class="control">
                            <input class="input" type="text" placeholder="fill your topup" v-model="topup">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <input class="input" type="text" placeholder="Credit Number">
                        </div>
                    </div>
                    <div>
                        Your current balance: Rp.{{balance}}
                    </div>
                    <br>
                    <button class="button is-info" style="margin-top: 5px;" @click="topUp">Top Up</button>
                </div>
                <br>
                <hr>

                <h4>Add Product</h4>
              
                    <div class="field">
                        <label class="label">Product Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Product Name" v-model="productName">
                        </div>
                    </div>


                    <div class="field">
                        <label class="label">Price</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Price" v-model="price">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Stock</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Stock" v-model="amounts">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="Textarea" v-model="description"></textarea>
                        </div>
                    </div>
                    <div class="file has-name">
                    <label class="file-label">
                        <input class="file-input" type="file" @change="handleFileUpload">
                        <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Choose a file…
                        </span>
                        </span>
                        <span class="file-name">
                        </span>
                    </label>
                    </div>

                    <button class="button is-info">Add Product</button>
                </div>

            
            </div>
            <div class="column" style="background-color:azure;">
              
                <!-- CardProduct is here  -->
                <div v-for="product in products" :key="product.id">
                    <cardproduct :product="product"></cardproduct>
                </div>


            </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import store from 'vuex'
import cardproduct from '../components/CardMyProduct.vue'
import { mapActions } from 'vuex'

export default {

    components: {
        cardproduct
    },
    data() {
        return {
            
            productName: '',
            description: '',
            price: 0,
            amounts: 0,
            topup: '',
            url: this.$store.state.baseUrl,
            username: '',
            products: [],
            balance: '',
            image: null
            
        }
    },
    methods: {

        topUp () {
            Swal.showLoading()
            axios({
                url: `${this.url}/users/topups`,
                method:'PATCH',
                data: {
                    topup: this.topup
                },
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                Swal.close()
                this.balance = data.totalBalance
                Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${data.message}`,
                showConfirmButton: false,
                timer: 1500
                })
            })
        },
        
        back() {
            this.$router.push({path: '/mainpage'})
        },

        handleFileUpload (e) {
            console.log(e.target.files[0])
            this.image = e.target.files[0]
        },
        createProduct() {
            let newProduct = {
                productName: this.productName,
                description: this.description,
                price: this.price,
                amounts: this.amounts,
                image: this.image
            }
            this.createProduct(newProduct)
        },
        ...mapActions(['CreateProduct'])


    },
    created() {
           Swal.showLoading()
            axios({
                url: `${this.url}/users/me`,
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=> {
                Swal.close()
                this.products = data.shop
                this.username = data.username
                this.balance = data.balanced
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
    }    
}
</script>

<style>
label {
    float: left;
}
</style>