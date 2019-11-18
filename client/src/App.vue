<template>
  <div id="app">
    <div id="nav">
      <!-- <app-login /> -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
// import Login from '@/views/Login.vue'

export default {
  name: 'app',
  components: {
    // 'app-login': Login
  }
}
</script>
<style>
#app {
  font-family: 'Poppins', sans-serif;
}
</style>
