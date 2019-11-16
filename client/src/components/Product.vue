<template>
  <div class="product">
    <v-img
      @click="$router.push(`/comics/${product._id}`)"
      :src="product.image"
      lazy-src="https://picsum.photos/id/11/10/6"
      aspect-ratio="0.7"
      class="grey lighten-2 product-img clickable"
    ></v-img>
    <div @click="$router.push(`/comics/${product._id}`)" class="product-name clickable mt-5">
      {{ product.name }}
    </div>
    <div>
      <b class="t-primary">{{ formattedPrice }}</b>
    </div>
    <div>
      <small></small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
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

<style scoped>
.product-img {
  box-shadow: 0px 36px 37px -24px rgba(148,148,148,0.82);
  position: relative;
  top: 0;
  transition: top ease 0.3s;
}
.product-img:hover {
  top: -10px;
}
.product-img:hover ~ .product-name {
  color: var(--secondary-color)
}

.product-name:hover {
  color: var(--secondary-color)
}
.product {
  text-align: left;
}
</style>
