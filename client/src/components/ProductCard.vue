<template>
  <mdb-card id="product-card" class>
    <mdb-view hover>
      <a href="#!">
        <mdb-card-image :src="product.imageUrl" alt="Card image cap" class="image"></mdb-card-image>
        <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
      </a>
    </mdb-view>
    <mdb-card-body>
      <h6 class="font-weight-bold indigo-text py-2">{{ product.name }}</h6>
      <mdb-card-title>{{ product.author }}</mdb-card-title>
      <mdb-card-text>Price: {{ product.price }}</mdb-card-text>
      <mdb-card-text>Stock: {{ product.qty }}</mdb-card-text>
      <div class="add-to-cart columns is-desktop is-vcentered">
        <div class="column">
          <button @click="addToCart(product._id)" class="button is-primary">Add to cart</button>
        </div>
        <div class="column">
          <b-field label>
            <b-numberinput
              v-model="productInputQty"
              min="1"
              :max="product.qty"
              controls-position="compact"
              controls-rounded
            ></b-numberinput>
          </b-field>
        </div>
      </div>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import {
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbView,
  mdbMask
} from "mdbvue";

import axios from "../../config/axios";

export default {
  name: "product-card",

  props: ["product"],

  data: () => ({
    productInputQty: 1
  }),

  methods: {
    toast(message) {
      this.$buefy.toast.open(message);
    },
    success(message) {
      this.$buefy.toast.open({
        message: message,
        type: "is-success"
      });
    },
    danger(message) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message,
        position: "is-bottom",
        type: "is-danger"
      });
    },

    addToCart(productId) { // Reuse this for update to cart
      axios({
        method: "post",
        url: `/carts/${productId}/${this.productInputQty}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          this.success(data.message);
        })
        .catch(err => {
          if (err.message.includes('401')) {
            this.danger('Please sign in or join first!');
            this.$router.push('/signinjoin')
          }
          else {
            console.log(err.message);
            this.danger(err.message)
          }
        });
    }
  },

  watch: {},

  components: {
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbView,
    mdbMask
  }
};
</script>

<style scoped>
#product-card {
  max-width: 300px;
  max-height: 500px;
  margin: 20px;
}

.add-to-cart {
  margin-top: 10px;
}
</style>