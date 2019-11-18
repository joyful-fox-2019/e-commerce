<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-4 text-center" v-for="cake in cakesList" :key="cake._id" @click="viewDetail(cake._id)">
                <div class="img-wrap">
                  <img :src=cake.image class="img-fluid" alt="Responsive image">
                </div>

                <p>{{ cake.name }}</p>
                <p>Rp. {{ cake.price }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'cakes',
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    cakesList () {
      return this.$store.state.products.cakes
    }
  },
  methods: {
    viewDetail (id) {
      this.$router.push(`/products/${id}`)
    }
  }
}
</script>

<style scoped>
</style>
