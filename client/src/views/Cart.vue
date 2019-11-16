<template>
  <div class="about">
    <h1>CART</h1>
    <div class="is-divider" data-content="OR"></div>
    <div class="columns is-mobile">
      <div class="column">img</div>
      <div class="column">
        <div>name</div>
        <div>price</div>
      </div>
      <div class="column">ammout</div>
      <div class="column">delete</div>
      <div class="column">total</div>

    </div>

  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$route)
  }
}
</script>

<style>
h1 {
  font-size: 50px;
  padding-bottom: 20px;
}
columns {
  background-color: aqua
}
</style>
