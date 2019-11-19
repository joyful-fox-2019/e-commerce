<template>
    <div>
        <nav-bar-store>
            <template v-slot:signout>
                <button class="btn link-navbar" title="signout" @click="signOut">
                    Signout
                </button>
            </template>
            <template v-slot:createProduct>
                <button class="btn link-navbar" @click.prevent="showCreate" title="Create Product">
                    Create Product
                </button>
            </template>
            <template v-slot:product>
              <router-link to="/product" title="Product" style="color:white;"><button  @click="showProduct"  class="btn link-navbar">Product</button></router-link>
            </template>
            <template v-slot:allProduct>
              <router-link to="/product/allProduct" style="color:white;" title="allProduct"><button class="btn link-navbar" id="btn-left">All Product</button></router-link>
            </template>
        </nav-bar-store>
        <list-product v-if="showListProduct"></list-product>
        <create-product v-if="showCreateProduct"></create-product>
    </div>
</template>

<script>
import router from '../router'
import NavBarStore from '../components/NavBarStore'
import CreateProduct from '../components/CreateProduct'
import ListProduct from '../components/ListProduct'
export default {
  name: 'product',
  components: {
    NavBarStore,
    CreateProduct,
    ListProduct
  },
  data: () => {
    return {
      showCreateProduct: false,
      showListProduct: true
    }
  },
  methods: {
    showCreate () {
      this.showCreateProduct = true
      this.showListProduct = false
    },
    showProduct () {
      this.showCreateProduct = false
      this.showListProduct = true
      this.$store.dispatch('showProduct')
    },
    signOut () {
      this.showCreateProduct = false
      this.showListProduct = true
      localStorage.clear()
      router.push('/login')
    }
  },
  created () {
    this.$store.dispatch('showProduct')
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
