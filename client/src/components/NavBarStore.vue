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
                <slot name="signout"></slot>
                <slot name="createProduct"></slot>
                <slot name="product"></slot>
                <slot name="allProduct"></slot>
                <slot name="cart"></slot>
                <slot name="transaction"></slot>
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
.btn {
  padding: 5px;
  margin: 5px;
}
nav {
  background-color:  #aeddb198;
  height: 68px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
}
img {
  height: 250px;
  width: 100%;
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
