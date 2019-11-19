<template>
<div>
  <nav-bar-store>
    <template v-slot:signout>
        <button class="btn link-navbar" @click="signOut"  title="signout">
            Signout
        </button>
    </template>
    <template v-slot:cart>
        <router-link to="/customer/cart" style="color:white;" title="Cart"><button class="btn link-navbar">Cart</button></router-link>
    </template>
    <template v-slot:allProduct>
        <router-link to="/customer" title="All Product" id="btnleft" style="color:white;"><button class="btn link-navbar">All Product</button></router-link>
    </template>
    <template v-slot:transaction>
      <router-link to="/customer/cart/transaction" title="Transaction" id="btnleft" style="color:white;"><button class="btn link-navbar">Transaction</button></router-link>
    </template>
  </nav-bar-store>
  <Cart></Cart>
  <router-view></router-view>
</div>
</template>

<script>
import NavBarStore from '../components/NavBarStore'
import Cart from '../components/Cart'
import router from '../router'
export default {
  name: 'customer',
  components: {
    NavBarStore,
    Cart
  },
  methods: {
    signOut () {
      localStorage.clear()
      router.push('/login')
    }
  }
}
</script>

<style>
.btn {
    margin: 10px;
    padding: 10px;
}
#btnleft {
  margin-left: 30px;
}
</style>
