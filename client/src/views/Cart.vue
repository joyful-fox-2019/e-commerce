<template>
  <div class="about">
    <h1>CART</h1>
    <!-- {{carts}} -->
    <div class="is-divider" data-content="OR"></div>
    <div class="detil" v-for="(cart, index) in carts" :key="index" >
      <DetailCart :cart="cart" @remove="getAllCart" />
    </div>
    <div>
      <button class="button is-light"  @click="checkout">checkout</button>
    </div>
  </div>
</template>

<script>
import DetailCart from '../components/DetailCart'
export default {
  name: 'cart',
  data: function () {
    return {
      carts: []
    }
  },
  components: {
    DetailCart
  },
  methods: {
    getAllCart () {
      this.axios.get('/carts', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data, 'data cart')
          this.carts = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkout () {
      let body = {
        carts: this.carts,
        total: this.totalBill
      }
      this.axios.post('/transactions', body, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data, 'bawa apa sehabis checkout')
          this.$router.push('/transaction')
        })
        .catch(console.log)
    }
  },
  created () {
    // console.log(this.$route)
    this.getAllCart()
  },
  computed: {
    totalBill () {
      let result = 0
      this.carts.forEach(cart => {
        // console.log(cart, "mau bikin total billing dong, ini apa? ");
        // console.log(cart.amount * cart.product.price, "satuan harga total barang");
        result += cart.amount * cart.product.price
        console.log(result)
      })
      return result
    }
  }
}
</script>

<style>
h1 {
  font-size: 50px;
  padding-bottom: 20px;
}

.detil {
  width: 1600px;
  margin: auto;

}

</style>
