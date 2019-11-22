<template>
  <div>
    <div class='productC'>
      <div v-for='(product, i) in getProduct' :key='i'>
        <ProductComponent :get-product='product'></ProductComponent>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/apis/server.js'
import ProductComponent from '@/components/ProductComponent/ProductComponent.vue'

export default {
  data() {
    return {
      name: this.$route.params.name,
      getProduct: null
    }
  },
  components: {
    ProductComponent
  },
  methods: {
    getCategory (name) {
      axios({
        method: 'get',
        url: `/products/category/${name}`
      })
        .then(({data}) => {
          this.getProduct = data.products
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  watch: {
    '$route.params.name'(name){
      // getCategory(name);
      this.getCategory(name)
    }
  },
  created () {
    this.getCategory(this.name);
  }
}
</script>

<style>
.productC {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap
}
</style>