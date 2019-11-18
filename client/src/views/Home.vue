<template>
  <div class="home" style="margin: 30px 0;">
    <div class="container is-fluid">
      <CardProduct v-for="product in products" :key="product._id" :productId="product._id" :name="product.name" :price="product.price" :image="product.images[0]"></CardProduct>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src\
import CardProduct from '@/components/CardProduct'

export default {
  name: 'home',
  data () {
    return {
      products: []
    }
  },
  components: {
    CardProduct
  },
  methods: {
    fetchProducts () {
      this.$store
        .dispatch('getProducts')
        .then(data => {
          this.products = data
        })
        .catch(({ data }) => {
          data.message.forEach(errMsg => {
            this.$store.state.Toast.fire({
              icon: 'error',
              title: errMsg
            })
          })
        })
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
