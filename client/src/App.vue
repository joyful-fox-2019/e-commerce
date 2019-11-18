<template>
  <div id="app">
   
    <!-- --------------------------------------------------------------- -->

      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->

    <router-view/>
  </div>
</template>

<style>

.icons-user{
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.right-bar{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 270px;
}

.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.vl {
  border-left: 1px solid #E6E6E6;
  height: 40px;
  margin-left:20px;
  margin-right:20px;
}



</style>
