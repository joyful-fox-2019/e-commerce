<template>
  <div class="product-detail-page">
    <div class="image-layer-black text-center">
    <v-img
    :src="product.image"
    class="background-cover"
    height="100%"
    >
    </v-img>
    </div>
    <div class="container detail-container">
      <v-row>
        <v-col lg="4" cols="12">
          <v-img
          :src="product.image"
          >
          </v-img>
        </v-col>
        <v-col lg="4" cols="12" class="detail-info">
          <ProductDetailAction :product="product"></ProductDetailAction>
        </v-col>
        <v-col lg="4" cols="12" class="detail-info">
          <ProductDetailInfo :product="product"></ProductDetailInfo>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductDetailInfo from '../components/ProductDetailInfo'
import ProductDetailAction from '../components/ProductDetailAction'

export default {
  name: 'ProductDetail',
  components: {
    ProductDetailInfo,
    ProductDetailAction
  },
  methods: {
    getProduct () {
      this.$store.dispatch('getProduct', this.$route.params.id)
    }
  },
  created () {
    this.getProduct()
  },
  computed: mapState(['product'])
}
</script>

<style scoped>
.background-cover {
  position: absolute;
  opacity: 0.3;
  filter: blur(10px);
}
.detail-container {
  margin-top: 20px;
}
.detail-info {
  color: white;
  font-size: 20px;
  z-index: 0;
}
</style>
