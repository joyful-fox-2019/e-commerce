<template>
  <div>
    <div class="name">
      {{ product.name }}
    </div>
    <div class="price">
      {{ formattedPrice }}
    </div>
    <div class="stock">
      stock: {{ product.stock }}
    </div>
    <div class="mt-5">
      <small>{{ product.description }}</small>
    </div>
    <v-btn
      class="bg-secondary mt-5"
      @click="$router.push(`/comics/${product._id}/update`)"
    >
    <v-icon class="mr-1">
      mdi-pencil
    </v-icon>
      UPDATE
    </v-btn>
    <v-btn
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
  </div>
</template>

<script>
export default {
  name: 'ProductDetailAction',
  data () {
    return {
      dialog: false
    }
  },
  props: {
    product: Object
  },
  computed: {
    formattedPrice () {
      return 'IDR ' + this.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  methods: {
    deleteProduct () {
      this.$store.dispatch('deleteProduct', this.product._id)
      this.dialog = false
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
