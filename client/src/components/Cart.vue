<template>
  <div>
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
        <div class="t-secondary">
          <v-icon @click="decrementQty">
            mdi-minus
          </v-icon>
          <span class="mr-1 ml-1"><b>{{ cart.qty }}</b></span>
          <v-icon @click="incrementQty">
            mdi-plus
          </v-icon>
        </div>
        <div class="mt-10">
        <v-btn @click="deleteCart" class="bg-primary">
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
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
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: {
    cart: Object
  },
  computed: {
    subtotal () {
      return (this.cart.product.price * this.cart.qty).toLocaleString()
    }
  },
  methods: {
    incrementQty () {
      if (this.cart.qty < this.cart.product.stock) {
        let payload = {
          cartId: this.cart._id,
          qty: this.cart.qty + 1
        }
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
    }
  }
}
</script>

<style>

</style>
