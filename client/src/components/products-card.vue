<template>

   <div class="products-container d-flex flex-wrap justify-content-center">

      <div v-for="product in products" :key="product._id" class="product-card">
        <img class="imageProduct" @click="toProductDetail(product._id)" :src="product.image" alt="">
        <div @click="toProductDetail(product._id)" class="product-info">
          <p>{{ product.name }}</p>
          <p class="price">${{ product.price }}</p>
          <div class="d-flex align-items-center">
            <div class="icon-toko-resmi">
             <img src="../assets/toko_resmi.png" alt="">
            </div>
            <span class="origin"> Jakarta</span>
          </div>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <span style="color: #cfcfcf;">(20)</span>
          </div>
        </div>
      </div>

    </div>

</template>

<script>
export default {
  props: ['products'],
  data () {
    return {

    }
  },
  methods: {
    toProductDetail (id) {
      this.$router.push(`/${id}/productdetail`)
    }
  }
}
</script>

<style scoped>

.products-container{
  width: 100%;
  padding: 50px;
  min-height: 500px;
}

.product-card {
  position: relative;
  width: 250px;
  margin: 30px 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.418);
  cursor: pointer;
}

.product-card img{
  width: 200px;
  height: 200px;
  border-radius: 5px;
}
.product-card .imageProduct{
  padding-top: 10px;
}
.product-info{
  text-align: left;
  font-weight: 600;
  padding: 10px;
  width: 250px;
  height: 150px;

}

.product-info p{
  margin: 0;
}

.price{
  color: #FF6535;
}

.origin{
  font-weight: 100;
  font-size: 15px;
  margin: 0 5px;
  color: rgb(133, 133, 133);
}

.star {
  color: #FEC112;
  font-size: 12px;
}

.icon-toko-resmi{
  height: 25px;
}

.icon-toko-resmi img{
  height: 15px;
  width: auto;
}

.love{
  position: absolute;
  font-size: 25px;
  color: rgb(144, 144, 144);
}

</style>
