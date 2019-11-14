<template>
  <div class="flex p-2">
    <div class="flex items-center justify-center">
      <img :src="product.image" alt="image">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProductById', { id: this.$route.params.id })
      .then(({ data }) => {
        this.product = data
        console.log(data);
      })
      .catch(({ response }) => {
        this.$notify({ type: 'error', text: response.data.message })
      })
    }
  },
  created() {
    this.fetchProduct()
  },
  watch: {
    '$route.params.id' () {
      this.fetchProduct()
    }
  },
}
</script>

<style>

</style>
