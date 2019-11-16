<template>
  <div id="app">
    <Navbar></Navbar>
    <notifications position="bottom left"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>
<style>
body {
  font-size: 70%;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh
}
#app {
  font-family: 'Roboto Condensed', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

</style>
