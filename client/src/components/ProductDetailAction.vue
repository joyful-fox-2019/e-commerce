<template>
  <div>
    <div class="name">
      {{ product.name }}
    </div>
    <div class="price">
      {{ formattedPrice }}
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
    >
    <v-icon class="mr-1">
      mdi-delete
    </v-icon>
      DELETE
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailAction',
  props: {
    product: Object
  },
  computed: {
    formattedPrice () {
      return 'IDR ' + this.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
</style>
