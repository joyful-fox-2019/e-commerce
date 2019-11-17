<template>
  <div>
    <div id="bannerCheckout" style="height:50vh" class="jumbotron rounded-0 m-0 text-center">
        <div class="container text-white">
          <h1 class="jumbotron-heading">CHECKOUT</h1>
          <h1 class="font-weight-bold">Your Total Cost : {{checkOutData.totalCost}}</h1>
          <p class="lead font-weight-bold">Make sure to decrease or remove out of stock products from your cart to continue the transaction, thank you!</p>
          <div class="d-flex justify-content-center">
            <button @click="createTransaction" class="btn btn-primary">Checkout Products!</button>
          </div>
        </div>
      </div>

      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-sm-push-6">
              <h3>Available Products</h3>
              <div v-if="checkOutData.listedItem.length>=1">
                <Available
                v-for="item in checkOutData.listedItem" :key="item._id"
                :item="item"
                />
              </div>
              <div v-else class="d-flex justify-content-center" style="background-color:grey; height:35vh">
                <h1 class="align-self-center text-center text-white font-weight-bold">Oh no, no available product in your cart</h1>
              </div>
            </div>
            <div class="col-md-6 col-sm-pull-6">
              <h3>Out of Stocks Products</h3>
              <div v-if="checkOutData.outOfStock.length>=1">
                <OutOfStock
                v-for="item in checkOutData.outOfStock" :key="item._id"
                :item="item"
                />
              </div>
              <div v-else class="d-flex justify-content-center" style="background-color:grey; height:35vh">
                <h1 class="align-self-center text-center text-white font-weight-bold">Yeay, no out of stock product in your cart</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Available from '@/components/Available'
import OutOfStock from '@/components/OutOfStock'
import axios from '../../myaxios/axios'
import Swal from 'sweetalert2'
export default {
  props: ['checkOutData'],
  components: {
    Available,
    OutOfStock
  },
  methods: {
    createTransaction () {
      Swal.fire({
        title: 'Proceed Transaction?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
          axios.post('/transactions', {},
            {
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(({ data }) => {
              Swal.fire({
                title: 'Transaction Success',
                icon: 'success'
              })
              this.$router.push('/')
              this.$emit('fetchCart')
              this.$emit('getProfile')
            })
            .catch(err => {
              Swal.fire({
                title: err.response.data.message,
                icon: 'error'
              })
            })
        }
      })
    }
  },
  created () {
    if (!this.checkOutData) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  #bannerCheckout{
      background:linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
      url(https://static4.depositphotos.com/1000865/421/i/950/depositphotos_4211211-stock-photo-money-background.jpg);
      background-size:cover;
      background-position: center;
  }
</style>
