<template>
  <div>
    <div class="m-2 d-flex flex-column" style="width: 250px; height: 350px">
      <img :src="product.image" alt="" style="object-fit: cover; width: 100%; cursor: pointer" @click.prevent="toDetail(product._id)">
      <div style="cursor: pointer" @click.prevent="toDetail(product._id)">
        {{ product.name }}
      </div>
      <div style="cursor: pointer" @click.prevent="toDetail(product._id)">
        Rp. {{ product.price }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    toDetail(id) {
      this.$router.push(`/about/${id}`)
    }
  }
}
</script>

<style>

</style>