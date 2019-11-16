<template>
  <div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img :src=ItemInCart.product_image class="card-img" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{ ItemInCart.product_name }}</h5>
        <span> quantity: {{ ItemInCart.quantity }} </span>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CartItem',
  props: ['ItemInCart']
}
</script>

<style>

</style>
