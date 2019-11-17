<template>
  <div>
    <div class="flex justify-center">
      <div class="m-1 p-2 hover:bg-blue-600 cursor-pointer" :class="menu === 'cart'? 'bg-green-400':'bg-blue-400'" @click="changeMenu('cart')">Cart</div>
      <div class="m-1 p-2 hover:bg-blue-600 cursor-pointer" :class="menu === 'transaction'? 'bg-green-400':'bg-blue-400'" @click="changeMenu('transaction')">Transaction</div>
      <div class="m-1 p-2 hover:bg-blue-600 cursor-pointer" :class="menu === 'favorites'? 'bg-green-400':'bg-blue-400'" @click="changeMenu('favorites')">Favorites</div>
    </div>
    <div class="m-4 flex justify-center border border-blue-200">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: 'cart'
    }
  },
  methods: {
    changeMenu (val) {
      this.menu = val
    }
  },
  watch: {
    menu () {
      this.$router.push(`/myaccount/${this.menu}`)
    }
  },
  created () {
    this.$router.push('/myaccount/cart')
  }
}
</script>

<style>

</style>
