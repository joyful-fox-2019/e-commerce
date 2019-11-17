<template>
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <a href="#">
        <img class="card-img-top card-imgg" :src=ProductData.image alt />
      </a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">{{ ProductData.name }}</a>
        </h4>
        <h5>Price: Rp.{{ ProductData.price }}</h5>
        <h6>Stock: {{ ProductData.stock }}</h6>
      </div>
      <div class="card-footer" v-if="$store.state.isLogin">
        <div v-if="ProductData.stock > 0">
          <small class="text-muted"><b-button @click.prevent="addToCart({ product_id: ProductData._id, product_name: ProductData.name, product_price: ProductData.price, product_image: ProductData.image })"> <i class="fas fa-shopping-basket"></i> Add to cart </b-button></small>
        </div>
        <div v-if="ProductData.stock <= 0">
          <small class="text-muted"><b-button @click.prevent="addToCart({ product_id: ProductData._id, product_name: ProductData.name, product_price: ProductData.price, product_image: ProductData.image })" disabled> <i class="fas fa-shopping-basket"></i> Add to cart </b-button></small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['ProductData'],
  methods: {
    addToCart (objProduct) {
      this.$store.dispatch('addToCart', objProduct)
    }
  }
}
</script>

<style scoped>
.card-imgg {
  object-fit: contain;
  height: 200px;
  width: 200px;
}
</style>
