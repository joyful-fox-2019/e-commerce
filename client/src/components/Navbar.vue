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
          <div class="ml-2 mr-2 d-flex align-items-center" v-if="isLogin" @click.prevent="toCart()">
            <a href="#" class="badge badge-light">{{cart.length}}</a>
            <img src="../../public/cart-black.png" style="width: 24px; cursor: pointer">
          </div>
          <div class="ml-2 mr-2" v-if="!isLogin" @click.prevent="toLogin()">
            Login              
          </div>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Menu
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#" v-if="!admin" @click.prevent="toTransaction()">Transactions</a>
              <a class="dropdown-item" href="#" v-if="admin" @click.prevent="toAdmin()">Admin</a>
              <a class="dropdown-item" href="#" @click.prevent="logout()">Logout</a>
            </div>
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
    },
    admin(){
      return this.$store.state.admin
    },
    toLogin(){
      this.$router.push('/login')
    }
  },
  created() {
    if(localStorage.getItem('token')){
      this.$store.dispatch('fetchLoggedUser')
    }
  },
  methods: {
    toTransaction(){
      this.$router.push('/transactions')
    },
    toHome(){
      this.$router.push('/')
    },
    toCart(){
      this.$router.push('/cart')
    },
    toAdmin(){
      this.$router.push('/admin/transaction')
    },
    logout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>

</style>