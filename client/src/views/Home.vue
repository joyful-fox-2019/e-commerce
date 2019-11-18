<template>
  <div class="home">
    <Navbar class="fixed-top" style="background-color:white"/>
    <SliderPage style="margin-top:100px"/>
    <div class="welcomegif">
      <b-img style="margin-top:100px" src="https://storage.googleapis.com/bucket-mini-ecommerce/greeting.gif" fluid alt="Responsive image" srcset=""></b-img>

    </div>
    <ProductPage/>
    <FooterPage/>

  </div>
</template>

<script>
// @ is an alias to /src

import SliderPage from '@/components/SliderPage.vue'
import Navbar from '@/components/Navbar.vue'
import ProductPage from '@/components/Product.vue'
import FooterPage from '@/components/FooterPage.vue'

export default {
  name: 'home',
  components: {
    SliderPage,
    Navbar,
    ProductPage,
    FooterPage
  }
}
</script>
