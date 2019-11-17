<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import verifyToken from '../config/jwt'

export default {
  created(){
    let token = localStorage.getItem('token')
    if(token){
      this.$store.commit('LOGIN',true)
      let { admin, username, _id } = verifyToken(token)
      this.$store.commit('SET_ID',_id)
      this.$store.commit('USERNAME',username)
      this.$store.commit('SET_ADMIN',admin)
      // this.$store.dispatch('users/getProfile')
    } else {
      this.$store.commit('LOGIN',false)
    }
  }
}
</script>


<style>

</style>
