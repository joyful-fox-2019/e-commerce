<template>
  <div>
    <b class="t-secondary">{{customer.email}}</b>
    <v-row>
      <v-col lg="3" md="3" cols="12">
        <v-img
          :src="cart.product.image"
          width="150px"
        ></v-img>
      </v-col>
      <v-col lg="5" md="5" cols="12">
        <div>
        {{ cart.product.name }}
        </div>
        <div class="t-primary">
        <b>IDR {{ cart.product.price.toLocaleString() }}</b>
        </div>
      </v-col>
      <v-col lg="4" md="4" cols="12">
        <div>
        Subtotal:
        </div>
        <div class="t-primary" style="font-size: 20px;">
        <b>{{ subtotal }}</b>
        </div>
      </v-col>
    </v-row>
    <v-btn @click="updateStatus" v-if="$store.state.user._id && $store.state.user.isAdmin && status === 'Waiting for confirmation'" class="full-width bg-primary">Confirm Delivery</v-btn>
    <v-btn @click="updateStatus" v-if="$store.state.user._id && !$store.state.user.isAdmin && status === 'Order shipped'" class="full-width bg-secondary">Confirm Received</v-btn>
  </div>
</template>

<script>
export default {
  name: 'TransactionCart',
  props: {
    cart: Object,
    customer: Object,
    status: String,
    transactionId: String
  },
  computed: {
    subtotal () {
      return (this.cart.product.price * this.cart.qty).toLocaleString()
    }
  },
  methods: {
    incrementQty () {
      console.log(this.cart.qty, this.cart.product.stock)
      if (this.cart.qty < this.cart.product.stock) {
        let payload = {
          cartId: this.cart._id,
          qty: this.cart.qty + 1
        }
        console.log('masuk')
        this.$store.dispatch('updateQty', payload)
      }
    },
    decrementQty () {
      if (this.cart.qty > 1) {
        let payload = {
          cartId: this.cart._id,
          qty: this.cart.qty - 1
        }
        this.$store.dispatch('updateQty', payload)
      }
    },
    deleteCart () {
      this.$store.dispatch('deleteCart', this.cart._id)
    },
    updateStatus () {
      this.$store.dispatch('updateStatus', this.transactionId)
    }
  }
}
</script>

<style>

</style>
