<template>
<div class="container">
  <div class="row">
      <div class="py-2 col-sm-3 px-1" v-for=" product in userProducts" :key="product._id">
          <!-- card template -->
          <div class="card">
              <img :src="product.image" class="card-img-top" alt="...">
              <div class="card-body p-1">
                  <p class="card-text mb-0">{{product.name}}</p>
                  <p class="card-text text-danger mb-0">Rp.{{product.price}}</p>
                  <div class="d-flex flex-row justify-content-between pt-1">
                      <a class="btn"  ><i class="fa fa-backward"></i></a>
                      <a href=""  ><i class="fa fa-trash-o"></i></a>
                      <a class="btn" ><i class="fa fa-forward"></i></a>
                  </div>
              </div>
          </div>
      </div>
  </div>    
</div>    
</template>

<script>
import axios from '@/api/server.js'

export default {

created () {
    console.log('masuk card ke user product', this.$store.state.userProducts)
  },
  data() {
    return {
      qty : 0
    }
  },
  methods : {
    
  },
  computed : {
      userProducts() {
          return this.$store.state.userProducts
      }
  }
}
</script>

<style scoped>
/* card-body p {
  font-size: px !important;
  margin : 0px !important;
} */

/* row {
  padding-left: 0% !important
} */
.btn { cursor: pointer; }

.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

</style>
