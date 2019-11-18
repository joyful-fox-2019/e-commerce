<template>
  <div id="product-manager" style="margin: 30px 0;">
    <div class="container is-fluid">
      <div v-for="product in products" :key="product._id">
        <CardProductAdmin :product="product"></CardProductAdmin>
      </div>
    </div>
  </div>
</template>

<script>
import CardProductAdmin from '@/components/CardProductAdmin'
export default {
  name: 'ProductManager',
  data () {
    return {
      products: []
    }
  },
  components: {
    CardProductAdmin
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
.card {
  width: 100%;
  height: 120px;
}
</style>
