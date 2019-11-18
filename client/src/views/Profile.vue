<template>
  <div>
  <nav>
      <div id="profile-nav">
          <router-link to="/profile/transactions">Transactions</router-link> |
          <router-link to="/profile/wishlist">Wishlist</router-link> |
          <router-link to="/profile/editprofile">Edit Profile</router-link>
      </div>
      <transition appear enter-active-class="animated fadeInUp delay">
      <router-view/>
    </transition>
  </nav>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>

nav{
    margin: 30px 0;
    height: 50px;
    width: 100%;
}

#profile-nav a {
  font-weight: bold;
  color: rgb(105, 105, 105);
  text-decoration: none;
}

#profile-nav a:hover{
  color: rgb(77, 189, 77);
}

#profile-nav a.router-link-exact-active {
  color: rgb(77, 189, 77);
}

</style>
