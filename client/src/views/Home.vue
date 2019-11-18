<template>
  <div class="home" style="margin: 30px 0;">
    <div class="container is-fluid">
      <CardProduct v-for="num in 28" :key="num"></CardProduct>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src\
import CardProduct from '@/components/CardProduct'

export default {
  name: 'home',
  components: {
    CardProduct
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
