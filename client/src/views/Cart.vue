<template>
    <div>
      <div id="bannerCart" style="height:50vh" class="jumbotron rounded-0 m-0 text-center">
        <div class="container text-white">
          <h1 class="jumbotron-heading">MY CART</h1>
          <p class="lead font-weight-bold">SOON IT WILL BE MINE!</p>
          <div class="d-flex justify-content-center">
            <button v-if="cartItem.length>=1" @click="toCheckout" class="btn btn-warning">Checkout</button>
          </div>
        </div>
      </div>

      <div v-if="cartItem.length > 0" class="album py-5 bg-light">
        <!--List Wish -->
        <div class="container">
          <div class="row">
            <Cart
            style="cursor:pointer"
            v-for="item in cartItem" :key="item._id"
            :itemData="item"
            @fetchCart="fetchCart"
            />
          </div>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center" style="background-color:grey; height:35vh">
        <h1 class="align-self-center text-white font-weight-bold">Cart is Empty</h1>
      </div>

    </div>
</template>

<script>
import Cart from '@/components/Cart'
import axios from '../../myaxios/axios'
export default {
  props: ['cartItem'],
  components: {
    Cart
  },
  data () {
    return {
    }
  },
  methods: {
    fetchCart () {
      this.$emit('fetchCart')
    },
    toCheckout () {
      axios.get('/transactions', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$emit('checkingOut', data)
          this.$router.push('/checkout')
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    }
  }
}
</script>

<style>
  #bannerCart{
      background:linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(https://www.j-26.com/assets/resized/shopping-cart.png);
      background-size:cover;
      background-position: center;
  }
</style>
