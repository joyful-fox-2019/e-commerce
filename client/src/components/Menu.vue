<template>
  <b-list-group>
    <b-list-group-item to="/admin/game-list" class="text-light bg-dark">List Product Game</b-list-group-item>
    <b-list-group-item to="/admin/purchased" class="text-light bg-dark">Purchased History</b-list-group-item>
    <b-list-group-item to="/admin/add-game" class="text-light bg-dark">Add Game</b-list-group-item>
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