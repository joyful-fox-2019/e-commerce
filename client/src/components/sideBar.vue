<template>
  <div class="pl-2 text-success" >
        <router-link to="/user" v-if="this.$store.state.isLogin" class="list-group-item bg-white text-success btn text-left"><img class="img-thumbnail w-25 mr-1 ml-0" :src="this.$store.state.user.photo" alt="">{{this.$store.state.user.username}}</router-link>
        <router-link to="/transaction" class="list-group-item bg-white btn text-left text-success"><i class="fa fa-cc-visa fa-2x mr-3"></i>Transaction</router-link>
        <a class="list-group-item bg-white"><i class="fa fa-envelope-o fa-2x mr-3"></i>Conversations</a>
        <a class="list-group-item bg-white"><i class="fa fa-star-o fa-2x mr-3"></i>My Likes</a> 
        <h4 class="list-group-item py-1 text-center text-white bg-success ">Category</h4>   
        <a class="list-group-item bg-white"><i class="fa fa-file-text fa-2x mr-3"></i>Food</a>
        <a class="list-group-item bg-white"><i class="fa fa-list-alt fa-2x mr-3"></i>Fashion</a>
        <a class="list-group-item bg-white"><i class="fa fa-camera-retro fa-2x mr-3"></i>Electronics</a>
        <a class="list-group-item bg-white"><i class="fa fa-comment fa-2x mr-3"></i>Homecare</a>        
   
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
a { cursor: pointer; }

</style>