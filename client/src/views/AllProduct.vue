<template>
  <div>
    <div class='productL'>
      <div v-for='(product, i) in products' :key='i'>
        <ProductComponent :get-product='product'></ProductComponent>
      </div>
    </div>
  </div>
</template>

<script>
import ProductComponent from '@/components/ProductComponent/ProductComponent.vue'

export default {
  components: {
    ProductComponent
  },
  computed: {
    products () {
      return this.$store.state.allProduct
    }
  }
}
</script>

<style>
.productL{
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>