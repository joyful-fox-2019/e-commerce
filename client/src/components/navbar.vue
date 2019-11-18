<template>
  <div>
      <nav>
      <!-- Top Nav -->
      <div class="top-nav d-flex justify-content-between align-items-center">
        <span>Download Tokopedia App</span>
        <div>
          <span>Tentang Tokopedia</span> <span>Mitra Tokopedia</span> <span>Mulai Berjualan</span> <span>Promo</span> <span>Pusat Bantuan</span>
        </div>
      </div>

      <!-- Main Nav -->
      <div class="main-nav d-flex justify-content-between align-items-center">
        <div @click="changePage('/')" class="logo">
            <img src="../assets/logo.png" alt="">
        </div>
        <div class="search d-flex">
          <form @submit.prevent="search" class=" d-flex" action="">
            <input v-model="keyword" type="text" name="" id="" placeholder="Cari produk atau toko">
            <div class="search-icon d-flex justify-content-center align-items-center">
              <i @click="search" class=" fa fa-search" aria-hidden="true"></i>
            </div>
          </form>
        </div>
        <div class="d-flex">
          <div class="notif-icon d-flex align-items-center">
              <i @click="changePage('/carts')" class="fas fa-shopping-cart"></i>
              <i class="fas fa-bell"></i>
              <i class="fas fa-envelope"></i>
          </div>
          <div class="user-and-store d-flex">
            <div v-if="isLogin" @click="changePage('/profile/transactions')" class="nav-user d-flex align-items-center mr-3">  <img :src="user.profilePic" alt="">{{ user.firstName }}</div>
            <div v-if="isLogin" @click="changePage('/mystore/products')" class="nav-store d-flex align-items-center">  <button class="btn btn-success bg-white text-success">Toko Saya</button></div>
            <div v-if="!isLogin" @click="wantLogin" class="nav-store d-flex align-items-center">  <button class="btn btn-success bg-white text-success mx-3">Login</button></div>
            <div v-if="!isLogin" @click="changePage('/register')"  class="d-flex align-items-center mx-3">  <button class="btn btn-success">Register</button></div>
            <div style="font-size: 20px;" class="ml-3 d-flex align-items-center"> <i @click="logout" class="fas fa-sign-out-alt"></i> </div>
          </div>
        </div>

      </div>
    </nav>
     <transition appear enter-active-class="animated pulse">
        <login  v-if="loginFrom" @close="closeLoginFrom"/>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import login from '@/views/Login'

export default {
  components: {
    login
  },
  data () {
    return {
      loginFrom: false,
      keyword: ''
    }
  },
  computed: {
    ...mapState(['isLogin', 'user'])
  },
  methods: {
    closeLoginFrom () {
      this.loginFrom = false
    },
    wantLogin () {
      this.loginFrom = true
    },
    changePage (link) {
      this.$router.push(link)
    },
    logout () {
      this.$store.dispatch('LOGOUT')
    },
    search () {
      let keyword = this.keyword
      if (this.$route.fullPath !== '/') {
        this.$router.push('/')
      }
      this.$store.dispatch('SEARCH', keyword)
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('GET_PROFILE')
    }
  },
  watch: {
    keyword: function () {
      this.search()
    }
  }
}
</script>

<style scoped>

nav{
  width: 100%;
  height: 90px;
}

.top-nav {
  width: 100%;
  height: 40%;
  padding: 0 20px;
  border-bottom: .7px solid rgba(128, 128, 128, 0.589);
}

.top-nav span{
    color: #b6b6b6;
    font-size: 13px;
    margin: 0 15px;
}

.top-nav span:hover{
  color: #79e982;
  cursor: pointer;
}

/* MAIN NAV */
.main-nav{
  height: 60%;
  padding: 0 32px;
  box-shadow: -2px 5px 8px -2px rgba(0, 0, 0, 0.13);
}

.logo img{
  width: 150px;
  height: auto;
  cursor: pointer;
}

.search input {
  width: 450px;
  font-size: 12px;
  color: gray;
  padding: 5px 10px;
  border-radius: 5px 0 0 5px;
  border: .6px solid rgba(128, 128, 128, 0.212);
  border-right: none;
  outline: none;
}

.search-icon{
  color: rgb(143, 143, 143);
  width: 40px;
  height: 30px;
  padding: 8px 0;
  border-radius: 0 5px 5px 0;
  background-color: #F3F3F3;
  cursor: pointer;
}

.notif-icon {
  color: #a0a0a0;
}

.notif-icon i{
  margin: 0 15px;
  cursor: pointer;
}

.notif-icon i:hover{
  color: rgb(45, 190, 45);
}

.user-and-store{
  border-left: 1px solid rgba(128, 128, 128, 0.459) ;
  font-size: 13px;
  color: #a0a0a0;
  cursor: pointer;
}

.user-and-store img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 5px;
}

.user-and-store div {
  cursor: pointer;
}

</style>
