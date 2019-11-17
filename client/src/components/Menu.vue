<template>
  <b-list-group>
    <b-list-group-item to="/admin/game-list" class="text-light bg-dark">List Product Game</b-list-group-item>
    <router-link to="/admin/add-game"><b-list-group-item class="text-light bg-dark">Add Game</b-list-group-item></router-link>
  </b-list-group>
</template>

<script>

export default {
  name: 'Menu',
  components:{
    
  },
  methods:{
    logout(){
      console.log("masuk")
      localStorage.clear()
      this.$router.push({ path:'/login' })
      this.successToast("Logout successfully!")
    }
  },
  data(){
    return{
      
    }
  }
}
</script>

<style>

</style>