<template>
  <div id="sp">
    <h2 @click="getProducts()" style="margin-left: 100px; width: 200px; cursor: pointer;">ShonenPlays</h2>
    <img @click="displayHome()" style="cursor: pointer" id="sp-img" src="https://i.imgur.com/MTK7Egb.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'shonenplays',
  methods: {
    displayHome() {
      this.$router.push('/admin')
    },
    getProducts() {
      this.$store.dispatch('getProducts')
    }
  }

}
</script>

<style scoped>
h2 {
  color: white;
  font-weight: bold;
  margin-left: 0px;
}

#sp-img {
  width: 40px;
  height: 40px;
}

#sp {
  display: flex;
}
</style>