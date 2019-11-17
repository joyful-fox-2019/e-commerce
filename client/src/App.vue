<template>
  <v-app class="grey lighten-4">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
  created() {
    if(localStorage.getItem('token')) {
      this.$store.commit('SET_TOKEN', localStorage.getItem('token'));
      this.$store.commit('SET_USER', JSON.parse(localStorage.getItem('user'))); 
    }
  }
};
</script>

<style scoped>

</style>
