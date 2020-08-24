<template>
  <div class="home">
    <!-- <img src="../assets/homepage.jpg" alt="Vue homepage"> -->
    <HomePage/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/HomePage.vue'

export default {
  name: 'home',
  components: {
    HomePage
  }
}
</script>
