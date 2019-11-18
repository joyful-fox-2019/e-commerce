<template>
  <v-navigation-drawer
      class="pink lighten-2"
      dark
      permanent
      v-model="isShowed"
      clipped
      fixed
      app>
      <v-toolbar flat class="transparent" >
        <v-list class="pa-0" three-line>
          <v-list-tile v-if="!isLogin">
            <v-list-tile-content>
              <v-list-tile-title>Nyaa - Art Gallery</v-list-tile-title>
              <v-list-tile-sub-title>All Nyaa's Contemporary Art Personal Collection</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="isLogin" avatar>
            <v-list-tile-avatar>
              <img :src="loginUser.imageUrl">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{loginUser.name}}</v-list-tile-title>
              <v-list-tile-sub-title v-if="loginUser.role === 'customer'">{{getBalance}}</v-list-tile-sub-title>
              <v-list-tile-sub-title v-else>Admin Nyaa Art Gallery</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <br>
      <v-divider/>
      <v-list>
        <v-list-tile @click="toHome">
          <v-list-tile-action>
            <v-icon>fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list v-if="!isLogin">
        <v-list-tile @click="showLoginForm">
          <v-list-tile-action>
            <v-icon>fa-sign-in-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="showRegisterForm">
          <v-list-tile-action>
            <v-icon>fa-book</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Register</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list v-if="isLogin && loginUser.role === 'admin'">
        <v-list-tile @click="$router.push('order')">
          <v-list-tile-action>
            <v-icon>fa-shopping-bag</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Orders</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="showAddProductForm">
          <v-list-tile-action>
            <v-icon>fa-plus-square</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Add Products</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list v-if="isLogin && loginUser.role === 'customer'">
        <v-list-tile @click="$router.push('order')">
          <v-list-tile-action>
            <v-icon>fa-shopping-bag</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>My Orders</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.push('mycart')">
          <v-list-tile-action>
            <v-icon>fa-shopping-cart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>MyCart</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.push('topup')">
          <v-list-tile-action>
            <v-icon>fa-wallet</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Top Up</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list v-if="isLogin">
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>fa-sign-out-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'

import router from '../router'
import rupiahConverter from '../helper/rupiahConverter'
export default {
  data () {
    return {
      isShowed: true
    }
  },
  watch: {
    drawer () {
      this.isShowed = this.drawer
    }
  },
  methods: {
    showLoginForm () {
      console.log('133')
      this.$emit('show-login')
    },
    showRegisterForm () {
      this.$emit('show-register')
    },
    showAddProductForm () {
      this.$emit('add-product')
    },
    toHome () {
      router.push({ name: 'home' })
    },
    logout () {
      localStorage.removeItem('token')
      this.$store.commit('SET_USER', null)
      this.$store.commit('SET_LOGIN', false)
      this.$store.commit('SHOW_SNACKBAR', { text: 'Successfully Logout' })
    }
  },
  computed: {
    getBalance () {
      return `HackPay: ` + rupiahConverter(this.loginUser.hackpay)
    },
    ...mapState(['isLogin', 'loginUser'])
  },
  props: ['drawer']
}
</script>
