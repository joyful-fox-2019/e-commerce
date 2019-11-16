<template>
  <div>
    <v-img
      :src="product.image"
      lazy-src="https://picsum.photos/id/11/10/6"
      aspect-ratio="0.7"
      class="grey lighten-2 product-img clickable"
    ></v-img>
    <div class="mt-5">
      {{ product.name }}
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
</style>
