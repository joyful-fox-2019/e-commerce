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
            <div class="ml-2 mr-2" v-if="!isLogin">
              Login              
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
    }
  },
  computed: {
    cart(){
      return this.$store.state.loggedUser.cart
    },
    isLogin(){
      return this.$store.state.isLogin
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