<template>
  <div id="app">
    <Navbar
    style="height:10vh"
    class="bg-info"
    :isLogin="isLogin"
    :role="role"
    @statusLogin="statusLogin"
    @statusRole="statusRole"
    :carts="cartItem"
    :user="user"
    @userOut="userOut"
    :ownProducts="ownProducts"
    @getProfile="getProfile"
    />
    <router-view
    style="height:85vh"
    class="overflow-auto"
    @statusLogin="statusLogin"
    @statusRole="statusRole"
    :role="role"
    :detailProduct="detailProduct"
    :cartItem="cartItem"
    @fetchCart="getCart"
    :user="user"
    @getProfile="getProfile"
    :ownProducts="ownProducts"
    @getCart="getCart"
    @getOwnProducts="getOwnProducts"
    @checkingOut="checkingOut"
    :checkOutData="checkOutData"
    :buyerTransactions="buyerTransactions"
    :sellerTransactions="sellerTransactions"
    @getTransactionsBuyer="getTransactionsBuyer"
    @getTransactionsSeller="getTransactionsSeller"
    />
    <Footer
    style="height:5vh"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import axios from '../myaxios/axios'
export default {
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      isLogin: false,
      role: '',
      detailProduct: '',
      cartItem: '',
      ownProducts: [],
      user: '',
      checkOutData: '',
      buyerTransactions: [],
      sellerTransactions: []
    }
  },
  methods: {
    getProfile () {
      axios.get('users/profile', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.user = data
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    statusLogin (status) {
      this.isLogin = status
    },
    statusRole (status) {
      this.role = status
    },
    getCart () {
      console.log('<<<<<<<<<<<JALAANNN')
      axios.get('/carts', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.cartItem = data
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    getOwnProducts () {
      axios.get('/users', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.ownProducts = []
          data.forEach(element => {
            this.ownProducts.unshift(element)
          })
          // this.ownProducts = data
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    getTransactionsSeller () {
      console.log('TRIGGER TRANS SELL')
      this.buyerTransactions = []
      this.sellerTransactions = []
      axios.get('/transactions/sold', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          data.forEach(element => {
            this.sellerTransactions.unshift(element)
          })
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    getTransactionsBuyer () {
      console.log('TRIGGER TRANS BUY')
      this.buyerTransactions = []
      this.sellerTransactions = []
      axios.get('/transactions/purchased', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          data.forEach(element => {
            this.buyerTransactions.unshift(element)
          })
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    checkingOut (payload) {
      // console.log('MASUK')
      // console.log(payload, 'sini berikutnya')
      this.checkOutData = payload
    },
    userOut (payload) {
      this.user = payload
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.isLogin = true
      this.role = localStorage.getItem('role')
      this.getProfile()
    }
    if (localStorage.getItem('role') === 'buyer') {
      this.getCart()
      this.getTransactionsBuyer()
    }
    if (localStorage.getItem('role') === 'seller') {
      this.getOwnProducts()
      this.getTransactionsSeller()
    }
  }
}
</script>

<style>

</style>
