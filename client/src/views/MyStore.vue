<template>
    <div>
       <nav>
        <div id="profile-nav" class="mt-5">
            <router-link to="/mystore/products">My Products</router-link> |
            <router-link to="/mystore/order">Order</router-link> |
            <router-link to="/mystore/addproduct">Add Product</router-link>
        </div>
        <transition appear enter-active-class="animated fadeInUp delay">
          <router-view/>
        </transition>
      </nav>
    </div>
</template>

<script>

export default {
  components: {
  }
}
</script>

<style>

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
