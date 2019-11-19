<template>
    <div>
        <nav-bar-store>
            <template v-slot:signout>
                <button class="btn link-navbar" title="signout" @click="signOut">
                    Signout
                </button>
            </template>
            <template v-slot:product>
                <router-link class="btn link-navbar" title="Product" to="/product" style="color:white;">Product</router-link>
            </template>
            <template v-slot:allProduct>
                <router-link class="btn link-navbar" title="allProduct" id="btn-left" to="/product/allProduct" style="color:white;">All Product</router-link>
            </template>
        </nav-bar-store>
        <list-product-all></list-product-all>
    </div>
</template>

<script>
import router from '../router'
import NavBarStore from '../components/NavBarStore'
import ListProductAll from '../components/ListProductAll'
export default {
  name: 'productAll',
  components: {
    NavBarStore,
    ListProductAll
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
  padding: 10px;
  margin-right: 10px
}
#btn-left {
  margin-right: 20px;
}
</style>
