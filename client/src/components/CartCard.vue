<template>
  <div>
    <h2 v-if="getCart.length < 1" style="text-align:center;">Empty cart :(</h2>
    <div v-if="getCart.length > 0 && getCart[0].product">
      <b-button style="margin-left:48%;" type="button" @click="checkout" variant="info">Checkout</b-button>
      <b-card-group>
        <b-card
          v-for="transaction in getCart"
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
          <b-button @click="deleteInCart(transaction._id)" variant="danger">Delete</b-button>
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
          this.$store.commit("REMOVE_CART");
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
    },
    deleteInCart(id) {
      this.$store.dispatch("DELETE_CART", id);
    }
  },
  computed: {
    getCart() {
      return this.$store.state.myCart;
    }
  },
  created() {
    this.$store.dispatch("GET_CART");
  }
};
</script>

<style>
</style>