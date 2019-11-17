<template>
  <b-container>
    <h2 class="text-white ml-3 ml-md-0 my-3"> <b>Your Cart</b> </h2>
    <b-row class="justify-content-center">
      <b-col cols="11" md="8">

          <b-card v-for="(data,index) in cartData" :key="index" bg-variant="dark" class="text-white mb-3">
            <b-row>
              <b-col cols="12" md="6">
                <p class="mb-0 mt-1">
                  <b>{{ data.ProductName }}</b>
                  <small class="ml-2">price: ${{ data.ProductPrice }}</small>
                </p>
              </b-col>
              <b-col cols="12" md="6">
                <b-input-group size="sm" class="mt-md-0 mt-2">
                  <b-input-group-prepend>
                    <b-button @click="minusCart(data.ProductId._id, data.amount)" variant="outline-light"> <font-awesome-icon icon="minus"></font-awesome-icon> </b-button>
                  </b-input-group-prepend>
                  <b-form-input class="text-center" :value="data.amount" type="number" min="0.00"></b-form-input>
                  <b-input-group-append>
                    <b-button @click="plusCart(data.ProductId._id, data.amount)" variant="outline-light"> <font-awesome-icon icon="plus"></font-awesome-icon> </b-button>
                    <b-button @click="deleteCart(data._id)" variant="outline-light"> <font-awesome-icon icon="trash"></font-awesome-icon> </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
            </b-row>
          </b-card>

      </b-col>
      <b-col cols="11" md="4">
        <b-card bg-variant="dark" class="text-white text-center mt-3 mt-md-0">
          <p><b>Total Price:</b></p>
          <h1><b>${{ getTotal }}</b></h1>
          <b-button @click="checkout()" class="mt-2" variant="danger"><font-awesome-icon icon="money-check-alt" class="mr-2"></font-awesome-icon>Checkout</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from '../config/getdata'
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      cartData : []
    }
  },
  methods: {
    fetchCartData () {
      axios({
        method: 'get',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.cartData = data
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    },
    plusCart (id,amount) {
      amount += 1
      axios({
        url: `/carts/updateAmount/${id}/${amount}`,
        method: 'patch',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.fetchCartData()
          console.log(data)
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    },
    minusCart (id,amount) {
      if(amount > 1){
        amount -= 1
        axios({
          url: `/carts/updateAmount/${id}/${amount}`,
          method: 'patch',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            this.fetchCartData()
            console.log(data)
          })
          .catch(err => {
            console.log(err.response.data)
            this.next(err.response.data)
          })
      }
    },
    deleteCart (id) {
      axios({
        method: 'patch',
        url: `/carts/deleteProductFromCart/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.fetchCartData()
          this.successToast('Cart successfult deleted!')
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    },
    checkout () {
      Swal.showLoading()
      axios({
        url: '/transactions',
        method: 'post',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            title: 'Thank You!',
            text: "Your game has been in delivery!",
            icon: 'success'
          })
          this.fetchCartData()
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    }
  },
  created () {
    this.fetchCartData()
  },
  computed: {
    getTotal () {
      let total = 0
      for(let i = 0; i < this.cartData.length; i++){
        total += (this.cartData[i].amount * this.cartData[i].ProductPrice)
      }
      return total
    }
  }
}
</script>

<style>

</style>
