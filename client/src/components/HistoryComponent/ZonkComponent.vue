<template>
  <div class='imageZonk'>
    <h3 class="textZonk">OOPS. There is no {{action}} here</h3>
    <img src='https://images-na.ssl-images-amazon.com/images/I/61BgBdxg9DL._SY355_.png'>
  </div>
</template>

<script>
export default {
  props: ['action']
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Indie+Flower&display=swap');
.imageZonk {
  display: flex;
  width: 100%;
  height: 30vw;
  justify-content: center;
  align-items: center
}
.textZonk {
  font-family: 'Indie Flower', cursive;
  position: absolute;
  margin: -200px auto;
  font-size: 40px
}
</style>