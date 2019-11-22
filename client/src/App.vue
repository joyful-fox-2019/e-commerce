<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <sign></sign>
  </div>
</template>
<script>

import navbar from './components/Navbar'
import sign from './components/Footer'

export default {
  components: {
    navbar,
    sign
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
