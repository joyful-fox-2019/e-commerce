<template>
    <div class="container">
        <p class="ml-2" style="text-align:left; font-size:20px;">Newest Items</p>
        <div class="mb-4" style="display:flex;">
            <div v-for="(product,index) in products" :key=index class="card mx-2">
                <img src="https://storage.cloud.google.com/ecommercetempbucket/1573566274844durian.jpg" class="card-img-top" alt="product" style="height:250px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">Durian</h5>
                    <p class="card-text">Rp. 15.000/kg</p>
                    <a href="#" class="btn btn-success form-control">Go somewhere</a>
                </div>
            </div>
        </div>
        <!-- product lagi -->
        <p class="ml-2" style="text-align:left; font-size:20px;">Best Seller</p>
        <div class="mb-4" style="display:flex;">
            <div v-for="(product,index) in products" :key=index class="card mx-2">
                <img src="
https://storage.cloud.google.com/ecommercetempbucket/1573566287318semangka.jpg
" class="card-img-top" alt="product" style="height:250px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">Semangka</h5>
                    <p class="card-text">Rp. 10.000/kg</p>
                    <a href="#" class="btn btn-success form-control">Go somewhere</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      products: ['1', '2', '3', '4', '5']
    }
  }
}
</script>

<style>

</style>
