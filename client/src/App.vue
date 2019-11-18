<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
  },
  created () {
    if(localStorage.getItem('token')){
      this.$store.commit('LOGIN_CHECKER', true)
      this.$store.dispatch('fetchLoggedUser')
    }
  }
}
</script>

<style>

</style>
