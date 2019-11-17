<template>
    <section id="home-page" >
      <div class="container-fluid">
          <div class="row">
              <div class="col-md-2 pl-0">
                  <sideBar> </sideBar>
              </div>
              <div  class="col-md-10">
                  <!-- ini filter-->
                  <!-- v-on:submit.prevent='searchArticle' -->
                  <form class="form-inline md-form form-sm" >
                          <i class="fa fa-search" aria-hidden="true"></i>
                          <input class="form-control ml-3" style="width:90%" type="text" placeholder="Search"
                              aria-label="Search">
                               <!-- v-model='search' -->
                              <!-- ini v-model yang menghubungkan -->
                  </form>
                <!-- this is room for products -->
                  <div class="container" >
                      <div class="row">
                          <div class="col-sm-12 pt-4" > 
                              <ProductCard></ProductCard>                                
                          </div>
                      </div>
                  </div>
                <!-- product container end -->
              </div>
          </div>
      </div>   
    </section>
    
</template>

<script>
import Modal from '@/components/Modal'
import axios from '../api/server'
import Swal from 'sweetalert2'
import ProductCard from '@/components/ProductCard'
import sideBar from '@/components/sideBar'
import Corosel from '@/components/Corosel'

export default {
  name: 'Home',
  components: {
    ProductCard,
    sideBar,
    Corosel,
    Modal
  },
  data () {
    return {
      allProducts: []
    }
  },
  created () {
    this.allProducts = this.$store.state.allProducts
    console.log(this.allProducts, 'ini home')
  },
  computed: {
  }
}
</script>

<style>

</style>
