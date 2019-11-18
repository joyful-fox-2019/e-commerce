<template>
  <div id="cardProduct" class="card" @click="showProduct">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <h5>ASUS ROG</h5>
        <strong>Rp 12.000.000</strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardProduct',
  methods: {
    showProduct (id) {
      this.$router.push('product')
    }
  }
}
</script>

<style>
h5 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card {
  width: 210px;
  height: 280px;
  margin: 10px;
}
.card-content {
  font-size: 14px;
}
</style>
