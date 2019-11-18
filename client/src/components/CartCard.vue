<template>
  <div>
    <div class="d-flex">
      <!-- img -->
      <div style="width: 200px">
        <img src="https://cdn.shopify.com/s/files/1/0167/4484/products/sienna-1_1480x1836_crop_center.jpg?v=1573048415" alt="" style="width: 100%; object-fit: cover;">
      </div>
      <div class="ml-4" style="font-size: 150%">
        {{ item.product_id.name }}
      </div>
      <div class="ml-auto d-flex flex-column justify-content-between">
        <div class="d-flex align-items-center">
          <button class="btn" @click.prevent="subtract(item.product_id._id)">-</button>
          <div>
            {{ item.amount }}
          </div>
          <button class="btn" @click.prevent="addCart(item.product_id._id)">+</button>
        </div>
        <div>
          Rp. {{ totalPrice }}
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    subtract(id){
      this.$store.dispatch('subtractCart', id)
    },
    addCart(id){
      this.$store.dispatch('addToCart', {product_id: id, amount: 1})
    }
  },
  computed: {
    totalPrice(){
      return this.item.amount * this.item.product_id.price
    }
  }
}
</script>

<style>

</style>