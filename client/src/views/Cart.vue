<template>
  <div class="my-10 mx-auto w-1/2">
    <div class="flex-column border border-green-500 p-4">
      <div class="cart-items flex-column border-red-500 border items-">
        <div v-if="cart.length === 0">
          <h1>No items yet in your cart.</h1>
          <button class="p-2 bg-yellow-400 my-4 hover:bg-yellow-500" @click="toProduct">Continue Shopping?</button>
        </div>
        <div v-for="item in cart" :key="item._id" class="flex border border-yellow-700">
          <div class="item-image w-1/2 p-1 flex-column justify-center">
            <img :src="item.product.image" alt="img" class="w-32 my-2 mx-auto">
          </div>
          <div class="item-info flex justify-between border border-black w-full p-2 items-center">
            <div class="flex flex-wrap w-1/3"><h1>{{ item.product.name }} </h1></div>
            <div class="w-1/5"><p>{{ item.qty }} pcs</p></div>
            <div><p>{{ usdFormat(item.product.price) }}</p></div>
            <div class="flex flex-wrap w-1/6"><p>SubTotal: {{ usdFormat(item.qty * item.product.price) }}</p></div>
            <div>
              <button class="p-1 m-2 text-red-500 bg-blue-200 hover:bg-blue-300" @click="deleteFromFav(item.product._id)">Delete?</button>
            </div>
          </div>
        </div>
      </div>
      <div class="total-price flex justify-end m-2">
        <h1>Total Price: <span>USD {{ usdFormat(totalPrice()) }}</span></h1>
      </div>
      <div class="cart-action border border-blue-500 flex justify-end m-2">
        <button class="bg-gray-800 hover:bg-gray-600 p-2 text-white" @click="checkout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'cart',
  methods: {
    toProduct () {
      this.$router.push('/products')
    },
    totalPrice () {
      let result = 0
      this.cart.forEach(item => {
        result += (item.qty * item.product.price)
      })
      return result
    },
    usdFormat (val) {
      return (val).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    checkout () {
      this.$store.dispatch('checkout', { items: this.cart, price: this.totalPrice })
        .then(({ data }) => {
          this.$notify({ type: 'success', title: data.message })
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', title: response.data.message })
        })
    },
    deleteFromFav (id) {
      this.$store.commit('DELETE_FROM_FAV', { id })
      this.$store.dispatch('updateCart', { cart: this.cart })
      this.$notify({ type: 'info', title: 'Successfully updated your cart'})
    }
  },
  computed: {
    ...mapState(['cart'])
  },
  created () {
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style scoped>
h1 {
  font-size: 1.2em;
}

</style>
