<template>
  <header>
    <h5 style="margin-left:10px; color:white;">Well-Commerce</h5>
    <nav>
      <ul class="nav__links">
        <li><a href="#" @click.prevent="showProfile">Profile</a></li>
        <li><a href="#">MyShop</a></li>
        <li><a href="#"></a></li>
      </ul>
    </nav>
    <a class="cta" href="#" @click.prevent="logout"><button>Logout</button></a>
  </header>
</template>

<script>
import store from '../store/index'
import { mapMutations } from 'vuex'
export default {
  methods: {
    showProfile() {
      this.$router.push({path: '/userprofile'})
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push({path:'/home'})
    },

    ...mapMutations(['LogoutState'])
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lobster&display=swap");

li, a, button {
  font-family: 'Lobster', cursive;
  font-weight: 500;
  font-size: 16px;
  color: #edf0f1;
  text-decoration: none;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10%;
  background-color: #070a0a;
  height: 50px;
}

.logo {
  cursor:pointer;
}

.nav__links {
  list-style: none;
}

.nav__links li {
  display: inline-block;
  padding: 0px 20px;
}

.nav-links li a {
  transition: all 0.3s ease 0s;
}

.nav__links li a:hover {
  color: #0088a9;
}

button {
  padding: 9px 25px;
  background-color: rgba(0, 136, 169, 1);
  border:none;
  cursor: pointer;
  transition: all 0.3s ease 0s; 
}

button:hover {
  background-color: rgba(0,136,169,0.8);
}



</style>