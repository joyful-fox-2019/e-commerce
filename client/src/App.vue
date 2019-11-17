<template>
  <div id="app">
      <Navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  created () {
    this.$store.dispatch('getProducts')
    if (localStorage.getItem('access_token')) {
      this.$store.commit('IS_LOGIN')
      if (localStorage.getItem('privilege') === 'ADMIN') {
        this.$store.commit('IS_ADMIN')
      }
    }
  }
}
</script>
<style>
</style>
