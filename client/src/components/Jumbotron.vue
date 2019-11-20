<template>
  <div>
    <div class="m-0" style="height: 70vh" id="jumbotron">
      <div class="container">
        <div class="d-flex pt-2 pb-2 align-items-center">
          <div style="font-size: 300%">
            Umonk
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
            <div class="ml-2 mr-2 d-flex align-items-center" @click.prevent="toCart()" style="cursor: pointer" v-if="isLogin">
              <a href="#" class="badge badge-light">{{ cart.length }}</a>
              <img src="../../public/cart-black.png" style="width: 24px">
            </div>
            <div class="ml-2 mr-2" v-if="!isLogin"  @click.prevent="toLogin()">
              Login              
            </div>
            <div class="ml-2 mr-2">
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
            </div>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toCart(){
      this.$router.push('/cart')
    },
    toAdmin(){
      this.$router.push('/admin/transaction')
    },
    toLogin(){
      this.$router.push('/login')
    },
    logout(){
      this.$store.dispatch('logout')
    },
    toTransaction(){
      this.$router.push('/transactions')
    }
  },
  computed: {
    cart(){
      return this.$store.state.loggedUser.cart
    },
    isLogin(){
      return this.$store.state.isLogin
    },
    admin(){
      return this.$store.state.admin
    }
  },
  created(){
    if(localStorage.getItem('token')){
      this.$store.dispatch('fetchLoggedUser')
    }
  }
}
</script>

<style>
#jumbotron{
  background-image: url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

</style>