<template>
  <div style="height: 12vh; background-color: #FFF;" class="d-flex align-items-center">
    <div class="container">
      <div class="d-flex pt-2 pb-2 align-items-center">
        <div class="">
          <div style="font-size: 300%; cursor: pointer" @click.prevent="toHome()">
            Umonk
          </div>
        </div>
        <div class="ml-4 mr-4 d-flex justify-content-around">
          <small class="ml-2 mr-2">
            Men
          </small>
          <small class="ml-2 mr-2">
            Women
          </small>
        </div>
        <small class="ml-auto d-flex justify-content-around align-items-center">
          <div class="ml-2 mr-2 d-flex align-items-center" v-if="isLogin">
            <a href="#" class="badge badge-light">{{cart.length}}</a>
            <img src="../../public/cart-black.png" style="width: 24px">
          </div>
          <div class="ml-2 mr-2" v-if="!isLogin">
            Login              
          </div>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cart(){
      return this.$store.state.loggedUser.cart
    },
    isLogin(){
      return this.$store.state.isLogin
    }
  },
  created() {
    if(localStorage.getItem('token')){
      this.$store.dispatch('fetchLoggedUser')
    }
  },
  methods: {
    toHome(){
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>