<template>
  <div class="pl-2" >
        <router-link to="/user" v-if="this.$store.state.isLogin" class="list-group-item bg-light text-success btn text-left"><img class="img-thumbnail w-25 mr-1 ml-0" :src="this.$store.state.user.photo" alt="">{{this.$store.state.user.username}}</router-link>
        <router-link to="/transaction" class="list-group-item bg-light btn text-left text-success"><i class="fa fa-heartbeat fa-2x mr-3"></i>Transaction</router-link>
        <a class="list-group-item bg-light"><i class="fa fa-envelope-o fa-2x mr-3"></i>Conversations</a>
        <a class="list-group-item bg-light"><i class="fa fa-star-o fa-2x mr-3"></i>My Likes</a> 
        <h4 class="list-group-item py-1 text-center text-white bg-success ">ᴍᴀɴᴀɢᴇ</h4>   
        <a class="list-group-item bg-light"><i class="fa fa-file-text fa-2x mr-3"></i>Site Pages</a>
        <a class="list-group-item bg-light"><i class="fa fa-list-alt fa-2x mr-3"></i>Blog Posts</a>
        <a class="list-group-item bg-light"><i class="fa fa-camera-retro fa-2x mr-3"></i>Media</a>
        <a class="list-group-item bg-light"><i class="fa fa-comment fa-2x mr-3"></i>Comments</a>
        <a class="list-group-item bg-light"><i class="fa fa-archive fa-2x mr-3"></i>Feedback</a>  
        <a class="list-group-item bg-light"><i class="fa fa-cloud-download fa-2x mr-3"></i>Imports</a>  
        <h4 class="list-group-item py-1 text-white text-center bg-success">ᴘᴇʀsᴏɴᴀʟɪᴢᴇ</h4> 
        <a class="list-group-item bg-light"><i class="fa fa-cogs fa-2x mr-3"></i>Imports</a>     
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
a { cursor: pointer; }

</style>