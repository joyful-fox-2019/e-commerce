<template>
  <div>
        <div class="container">
         <h1>All your transactions</h1>
            <div class="row">
                <div class="col-sm-12">
                    <div class="container">
                        <div class="row border border-danger rounded p-1 my-2" v-for="transaction in allTransactions" :key="transaction._id">
                            <div class="col-sm-10" >
                                <div class="card mb-1" v-for="cart in transaction.carts" :key="cart.product._id">
                                    <div class="row no-gutters border-bottom border-success py-1">
                                        <div class="col-md-4">
                                        <img :src="cart.product.image" class="card-img p-1" alt="...">
                                        </div>
                                        <div class="col-md-8">
                                        <div class="card-body pl-0">
                                            <h5 class="card-title">{{cart.product.name}}</h5>
                                            <p class="card-text">{{cart.totalItem}}</p>
                                            <p class="card-text text-danger">{{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(cart.totalPrice)}}</p>                                            
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            <div class="btn btn-block my-3  btn-success" @click.prevent="pay(transaction._id, transaction.carts)">Pay</div>
                            </div>
                            <div class="col-sm-2">
                                <div class="card">
                                    <div id="status" class="card-body text-center border rounded bg-white text-danger">
                                        <div class="card-title pt-1">{{transaction.status}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from '@/api/server.js'
import Swal from 'sweetalert2'

export default {
    computed : {
        allTransactions() {
            return this.$store.state.userTransactions
        }
    },
    methods : {
        pay(id, carts) {
            console.log(carts)
            axios.put(`transaction/${id}`, {
                carts,
                status : 'paid'
            },
            {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                Swal.fire(
                    'Complete',
                    'You have complete the transaction',
                    'success'
                )  
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.card-img{
    width: 50%;
    height: 8vw;
    object-fit: cover;
}

.card-body {
    padding : 2px !important
}

.card {
    border : none 
}

.btn { cursor: pointer; }


</style>