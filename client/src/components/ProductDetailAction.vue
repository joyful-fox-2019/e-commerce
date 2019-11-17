<template>
  <div>
    <div class="name">
      {{ product.name }}
    </div>
    <div class="price">
      {{ formattedPrice }}
    </div>
    <div class="stock">
      Stock: {{ product.stock }}
    </div>
    <div class="bg-secondary pl-3 pr-3 pt-1 pb-1 mt-2" style="border-radius: 5px;">
    <v-slider
      v-model="qty"
      class="align-center"
      :max="max"
      :min="min"
      label="Qty"
      color="white"

      hide-details
    >
      <template v-slot:append>
        <v-text-field
          v-model="qty"
          class="mt-0 pt-0"
          color="white"
          hide-details
          single-line
          type="number"
          style="width: 60px"
        ></v-text-field>
      </template>
    </v-slider>
    </div>
    <v-btn
      v-if="$store.state.user._id && !$store.state.user.isAdmin"
      class="bg-primary mt-3 full-width"
      @click="addToCart"
    >
    <v-icon class="mr-1">
      mdi-cart-plus
    </v-icon>
      ADD TO CART
    </v-btn>
    <div class="mt-5">
      <small>{{ product.description }}</small>
    </div>
    <v-btn
      v-if="$store.state.user._id && $store.state.user.isAdmin"
      class="bg-secondary mt-5"
      @click="$router.push(`/comics/${product._id}/update`)"
    >
    <v-icon class="mr-1">
      mdi-pencil
    </v-icon>
      UPDATE
    </v-btn>
    <v-btn
      v-if="$store.state.user._id && $store.state.user.isAdmin"
      class="bg-primary ml-3 mt-5"
      @click="dialog = true"
    >
    <v-icon class="mr-1">
      mdi-delete
    </v-icon>
      DELETE
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Delete this comic?</v-card-title>

        <v-card-text>
          You can't undo this action.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            class="t-secondary"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            class="bg-primary"
            text
            @click="deleteProduct"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="addCartDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Item added to cart!</v-card-title>

        <v-card-text>
          Do you want to check your cart?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            class="t-primary"
            text
            @click="addCartDialog = false"
          >
            Continue Shopping
          </v-btn>

          <v-btn
            class="bg-secondary"
            text
            @click="deleteProduct"
          >
            See Cart
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailAction',
  data () {
    return {
      dialog: false,
      qty: 1,
      min: 1
    }
  },
  props: {
    product: Object
  },
  computed: {
    formattedPrice () {
      return 'IDR ' + this.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    max () {
      return this.product.stock
    },
    addCartDialog () {
      return this.$store.state.addCartDialog
    }
  },
  methods: {
    deleteProduct () {
      this.$store.dispatch('deleteProduct', this.product._id)
      this.dialog = false
    },
    addToCart () {
      let payload = {
        qty: this.qty,
        product: this.product._id
      }
      this.$store.dispatch('addToCart', payload)
    }
  }
}
</script>

<style>
.name {
  font-family: 'Squada One', cursive !important;
  font-size: 32px;
}
.price {
  font-family: 'Squada One', cursive !important;
  font-size: 40px;
  color:rgb(181, 181, 255);
}
.stock {
  font-family: 'Squada One', cursive !important;
  font-size: 25px;
  color:rgb(255, 181, 181);
}
</style>
