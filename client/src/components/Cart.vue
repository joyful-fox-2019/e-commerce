<template>
    <div class="container mt-3">
        <div class="text-center">
          <h1>Total Cart</h1>
        </div>
        <div class="card mb-3" v-for="(product,index) in cart" :key="index">
            <div class="row no-gutters">
                <div class="col-md-4">
                  <img :src="product.imageUrl" class="card-img" alt="productImage" style="max-height: 250px;">
                </div>
                <div class="col-md-8">
                  <div class="card-body text-left">
                      <h4 class="card-title">{{ product.productName }}</h4>
                      <p class="card-text">Quantity : {{ product.quantity }} </p>
                      <p class="card-text">Price : Rp.{{ product.price }} </p>
                      <button class="btn btn-danger" v-on:click="removeFromCart(product._id)">Remove from cart</button>
                  </div>
                </div>
            </div>
        </div>
        <div class="d-flex flex-column justify-content-end">
            <h3>Total Item : {{ totalItem }} </h3>
            <h3>Total Cost : Rp. {{ totalCost }} </h3>
            <button class="btn btn-success" v-on:click.prevent="checkoutNow">Checkout Now</button>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data () {
    return {}
  },
  methods: {
    removeFromCart (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteProductFromCart', id)
        }
      })
    },
    checkoutNow () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, checkout this cart!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('checkoutCart')
        }
      })
    }
  },
  computed: {
    ...mapState(['cart', 'totalItem', 'totalCost'])
  }
}
</script>

<style>

</style>
