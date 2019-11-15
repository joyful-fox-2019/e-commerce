<template>
  <div class="home">
    <div class="container">

      <div class="row">

        <div class="col-lg-3">
          <h1 class="my-4">Bubblebeam</h1>
          <b-button variant="info"> <i class="fas fa-shopping-cart"> View Cart </i> </b-button>
        </div>

        <div class="col-lg-9">
          <Carousel></Carousel>
          <div class="row">
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
          </div>
        </div>

      </div>
      <!-- end of main row div -->
    </div>
    <!-- end of container div -->
     <!-- Footer -->
    <footer class="py-5 bg-dark">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; <i class="fas fa-cloud-meatball"> Bubblebeam </i> 2019 </p>
      </div>
      <!-- /.container -->
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'

export default {
  name: 'home',
  components: {
    Carousel,
    ProductCard
  }
}
</script>
