<template>
  <div>
    <h2 v-if="getCart.transaction.length < 1" style="text-align:center;">Empty cart :(</h2>
    <div v-if="getCart.transaction.length > 0">
      <b-button style="margin-left:48%;" type="button" @click="checkout" variant="info">Checkout</b-button>
      <b-card-group>
        <b-card
          v-for="transaction in getCart.transaction"
          :key="transaction._id"
          :title="transaction.product.name"
          :img-src="transaction.product.image"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-card-text>{{transaction.product.description}}</b-card-text>
          <b-card-text>QTY : {{transaction.quantity}}</b-card-text>
          <b-card-text>SUBTOTAL : {{transaction.subTotal}}</b-card-text>
          <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    checkout() {
      axios({
        url: "http://localhost:3000/transactions/checkout",
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$router.push("/");
          this.$swal({
            type: "success",
            title: "Checkout Success"
          });
        })
        .catch(err => {
          this.$swal({
            type: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        });
    }
  },
  computed: {
    getCart() {
      return this.$store.state.myCart;
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.dispatch("GET_CART");
    }
  }
};
</script>

<style>
</style>