<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-4 text-center" v-for="macaron in macaronsList" :key="macaron._id" @click="viewDetail(macaron._id)">
                <img :src=macaron.image class="img-fluid" alt="Responsive image">
                <p>{{ macaron.name }}</p>
                <p>Rp. {{ macaron.price }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'macarons',
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    macaronsList () {
      return this.$store.state.products.macarons
    }
  },
  methods: {
    viewDetail (id) {
      this.$router.push(`/products/${id}`)
    }
  }
}
</script>

<style>

</style>
