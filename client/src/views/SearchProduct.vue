<template>
<div>
    <Navbar></Navbar>
    <div class="container" style="min-height:100vh;margin-top: 50px; padding-bottom:100px;">
        <p class="title">Results</p>
          <div v-if="products.length > 0">
            <div class="container1 box">
              <div v-for="(product, i) in products" :key="i" class="row">
                  <CardProduct :product="product" class="card"></CardProduct>
              </div>
            </div>
          </div>
          <div v-else class="image">
            <img class="img" src="../assets/undraw_empty_xct9.svg" alt="" srcset="">
              <div class="notFound"><i class="fas fa-exclamation-triangle"></i> Sorry Product not found!</div>
          </div>
    </div>
</div>
</template>

<script>
import Navbar from '../components/Navbar'
import CardProduct from '../views/CardProduct'

export default {
  name: 'searchProduct',
  components: {
    Navbar,
    CardProduct
  },
  computed: {
    products: {
      get () {
        return this.$store.state.searchProduct
      }
    }
  },
  watch: {
    products () {}
  }
}
</script>
<style scoped>
.container1 {
    display: flex ;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.card {
    margin-top: 100px;
    height: 430px;
    width: 300px;
    overflow: hidden;
    margin: 20px;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.notFound {
    font-size: 25px;
    color: #d71149;
}
.title {
  color: #c44173;
  font-size: 22px;
}
.image {
  margin: 50px auto;
  text-align: center;
}
.img {
  margin: 80px auto;
  width: 300px;
}
</style>
