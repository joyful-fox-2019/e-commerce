<template>
  <div>
      <nav>
          <div class="logo">
                <router-link to="/" title="Home">
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <image xlink:href='../assets/favicon.png' alt="symbol" height="40" width="40"/>
                    </svg>
                    <span class="link-navbar">HackMarketplace</span>
                </router-link>
            </div>
            <div class="click">
                <router-link class="link-navbar" to="/">Home</router-link>
                <router-link class="link-navbar" to="/register">Register</router-link>
                <router-link class="link-navbar" id="btn-left" to="/login">Login</router-link>
            </div>
      </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.link-navbar {
  margin: 5px;
  color: whitesmoke;
}
.link-navbar:hover {
  margin: 5px;
  color: antiquewhite;
}
.btn{
  padding: 10px;
  margin: 5px;
}
#btn-left {
  margin-right: 20px;
}
nav {
  background-color: #aeddb198;
  height: 68px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
}
img {
  height: 61px;
}
.logo {
  margin-left: 14px;
  display: flex;
  align-items: center;
}
.logo:hover {
  cursor: pointer;
}
.click {
  display: flex;
  align-items: center;
  margin-right: 15px;
}
</style>
