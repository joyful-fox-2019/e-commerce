<template>
<div class="mainpage">
  <navbar />

  <div class="product-content">
      <div v-for="product in productList" :key="product.id">
        <cardproduct :product="product"></cardproduct>
      </div>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import navbar from '../components/navbar.vue'
import cardproduct from '../components/CardProduct.vue'
export default {
  data() {
    return {
      url: this.$store.state.baseUrl,
      productList: []
    }
  },
  components: {
    cardproduct,
    navbar
  },
  created() {
    Swal.showLoading()
    axios({
      url: `${this.url}/products/`,
      method: 'GET',
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      Swal.close()
      this.productList = data;
    })
    .catch(err => {
      Swal.close()
      
    })
  }
}
</script>

<style scoped>
 
.product-content {
  margin: 50px 10px 20px 50px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}



</style>