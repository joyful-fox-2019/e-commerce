<template>
    <div>
      <div id="bannerCart" style="height:50vh" class="jumbotron rounded-0 m-0 text-center">
        <div class="container text-white">
          <h1 class="jumbotron-heading">MY CART</h1>
          <p class="lead">SOON IT WILL BE MINE HEHEHEHE~</p>
          <div class="d-flex justify-content-between">
          </div>
        </div>
      </div>

      <div class="album py-5 bg-light">

        <!--List Wish -->
        <div class="container">
          <div class="row">
            <Cart
            style="cursor:pointer"
            v-for="item in cartItem" :key="item._id"
            :itemData="item"
            />
          </div>
        </div>

      </div>

    </div>
</template>

<script>
import Cart from '@/components/Cart'
import axios from '../../myaxios/axios'
export default {
  props : ['cartItem'],
  components : {
    Cart
  },
  data(){
    return{
    }
  },
  methods : {

  }
}
</script>

<style>
  #bannerCart{
      background:linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(https://www.j-26.com/assets/resized/shopping-cart.png);
      background-size:cover;
      background-position: center;
  }
</style>