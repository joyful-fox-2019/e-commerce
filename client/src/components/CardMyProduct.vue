<template>
  <div class="card mb-3" style="max-width: 100%;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img :src="product.image" class="card-img" alt="">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{product.productName}}</h5>
        <p class="card-text">{{product.description}}</p>
        <p class="card-text">Stocks: {{product.stocks}}</p>
        <p class="card-text">Price: Rp.{{product.price}}</p>
        <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
        <hr>
        <button type="button" class="btn btn-outline-warning">Update</button>
        <span></span>
        <button type="button" class="btn btn-outline-danger">Delete</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    props: ['product']
}
</script>

<style>

</style>