<template>

<div class="card" style="width: 18rem; margin: 10px;">
    <img :src="product.image" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title">{{product.productName}}</h5>
      <p class="card-text">{{product.description}}</p>
      <p class="card-text"><small class="text-muted"><a href="#">See Product Detail</a></small></p>
      
     <button type="button" class="btn btn-outline-success">Add to Cart</button>
    </div>
</div>



</template>

<script>
import axios from ('axios')
import store from '../store/index'
export default {
  name: 'CardProduct',
  props: ['product'],
  data() {
    return {
      url: this.$store.state.baseUrl

    }
  },

  methods: {
    addCart() {
      axios({
        url:`${this.baseUrl}/carts/${this.product.id}`,
        method: 'POST',
        

      })
    }
  }

}
</script>

<style scoped>
</style>