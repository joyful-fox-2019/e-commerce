<template>
  <div class="home">
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <div class="main">
        <router-view/>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default {
  name: 'home',
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style>
.home{
    height: 100vh;
}
.main{
    background-color: rgb(183, 236, 205);
    width: 100vw;
    height: 100%;
    padding-top: 60px;
    overflow-y: scroll;
    overflow-x: hidden;
}

</style>
