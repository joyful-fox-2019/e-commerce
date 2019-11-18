<template>
  <div>
    <ul class="list-group mb-3">
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Product name</h6>
        </div>
        <span class="text-success">{{item.products.ProductId.name}}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Price</h6>
        </div>
        <span class="text-success">{{item.products.ProductId.price}}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Item Stocks</h6>
        </div>
        <span class="text-success">{{item.stockAvailable}}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Amount </h6>
        </div>
        <span class="text-success">{{item.amount}}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between">
        <span>Total</span>
        <strong>{{item.cost}}</strong>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style>

</style>
