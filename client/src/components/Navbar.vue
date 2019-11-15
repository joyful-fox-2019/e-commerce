<template>
  <div>
    <header>
      <div>
        <!-- cek sini untuk height nantiny -->
        <b-navbar toggleable="lg" type="dark" variant="info" class="bg-info">
          <b-navbar-brand href="#">E-COM</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item @click="toHome" class="d-flex justify-content-center" href="#">HOME</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <button @click="toLogin" v-if="!isLogin" class="btn btn-primary ml-auto">Login</button>
            <b-navbar-nav v-else class="ml-auto">
              <div v-if="role==='seller'"  class="text-center">
                <b-button variant="primary">
                  <img class="mx-1" src="https://image.flaticon.com/icons/svg/1949/1949627.svg" alt="cartIcon" width="30">
                  <b-badge class="mx-1" variant="light">0<span class="sr-only"> your products</span></b-badge>
                </b-button>
              </div>
              <div v-else class="text-center">
                <b-button @click="toCart" variant="light">
                  <img class="mx-1" src="https://image.flaticon.com/icons/svg/1374/1374128.svg" alt="cartIcon" width="30">
                  <b-badge class="mx-1" variant="dark">{{carts.length}}<span class="sr-only"> items in cart</span></b-badge>
                </b-button>
              </div>
              <b-nav-item-dropdown class="d-flex justify-content-center" right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                  <img src="https://image.flaticon.com/icons/svg/64/64096.svg" alt="userIcon" width="30">
                </template>
                <b-dropdown-item v-if="role==='seller'" href="#">My Products</b-dropdown-item>
                <b-dropdown-item v-else @click="toCart" href="#">My Cart</b-dropdown-item>
                <b-dropdown-item href="#">My Transactions</b-dropdown-item>
                <b-dropdown-item @click="logOut">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>

      </div>
    </header>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  props: ['isLogin', 'role', 'carts','user'],
  data () {
    return {

    }
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    toCart(){
      this.$router.push('/cart')
    },
    toHome(){
      this.$router.push('/')
    },
    logOut () {
      Swal.fire({
        title: 'Are you sure want to Log out?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Log out'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            `See you soon ${localStorage.getItem('user')}`
          )
          this.$router.push('/')
          this.$emit('statusLogin', false)
          this.$emit('statusRole', '')
          this.$emit('userOut', '')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          localStorage.removeItem('role')
        }
      })
    }
  },
  created () {

  }
}
</script>

<style>

</style>
