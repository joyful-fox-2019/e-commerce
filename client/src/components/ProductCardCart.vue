<template>
  <mdb-card id="product-card" class>
    <mdb-view hover>
      <a href="#!">
        <mdb-card-image :src="product.productId.imageUrl" alt="Card image cap" class="image"></mdb-card-image>
        <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
      </a>
    </mdb-view>
    <mdb-card-body>
      <h6 class="font-weight-bold indigo-text py-2">{{ product.productId.name }}</h6>
      <mdb-card-title>{{ product.productId.author }}</mdb-card-title>
      <mdb-card-text>Price: Rp{{ product.productId.price.toLocaleString('id') }}</mdb-card-text>
      <div class="add-to-cart columns is-desktop is-vcentered">
        <div class="column">
          
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field grouped>
            <!-- <input type="text"> -->
            <b-numberinput
              :value="product.qty"
              @input="updateProductInputQty"
              min="1"
              :max="product.productId.qty"
              controls-position="compact"
            ></b-numberinput>
            <button
              :id="product._id"
              @click="updateProductQtyInCart" 
              class="button is-primary">
                Update quantity
              </button>
            <button class="button is-text">
              <b-icon
                icon="delete"
                type="is-primary"
                size="is-medium">
            </b-icon>
            </button>
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

// import { mapState } from "vuex";

import axios from "../../config/axios";

export default {
  name: "product-card-cart",

  props: ["product"],

  data: () => ({
    productInputQty: null
  }),

  methods: {
    toast: function(message) {
      this.$buefy.toast.open(message);
    },
    success: function(message) {
      this.$buefy.toast.open({
        message: message,
        type: "is-success"
      });
    },
    danger: function(message) {
      this.$buefy.toast.open({
        duration: 5000,
        message: message,
        position: "is-bottom",
        type: "is-danger"
      });
    },
    // tesMasuk: function (event) {
    //   console.log('masuk', event);
    // },
    updateProductInputQty: function(event) {
      this.productInputQty = event
      // console.log('masuk update qty', event);
    },
    updateProductQtyInCart: function(event) {
      console.log("ini update product qty", event.target.id);
      const product_id = event.target.id;
      axios({
        method: "patch",
        url: `/carts/${product_id}/${this.productInputQty}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          console.log('ini updated cart', data);
          
          this.success(data.message);
        })
        .catch(err => {
          console.log(err);
          this.danger(err);
        });
    }
  },
  watch: {
  },

  computed: {
    // ...mapState({
    //   productQty: state => state.myCart.
    // })
  },

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
  max-width: 400px;
  max-height: 500px;
  margin: 20px;
}

.add-to-cart {
  margin-top: 10px;
}

.button {
  margin-right: 10px;
}
</style>