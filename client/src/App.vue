<template>
  <div id="app">
    <Navbar
    class="flex-fill"
    :isLogin="isLogin"
    :role="role"
    @statusLogin="statusLogin"
    @statusRole="statusRole"
    :carts="cartItem"
    :user="user"
    @userOut="userOut"
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
      cartItem:'',
      user : ''

    }
  },
  methods: {
    getProfile(){
      axios.get('users/profile',{
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        this.user = data
      })
      .catch(err=>{
        console.log(err.response.data.message)
      })
    },
    statusLogin (status) {
      this.isLogin = status
    },
    statusRole (status) {
      this.role = status
    },
    getCart(){
      console.log('<<<<<<<<<<<JALAANNN')
      axios.get('/carts',{
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        this.cartItem = data
      })
      .catch(err=>{
        console.log(err.response.data.message)
      })
    },
    userOut(payload){
      this.user=payload
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.isLogin = true
      this.role = localStorage.getItem('role')
      this.getProfile()
      this.getCart()
    }
  }
}
</script>

<style>

</style>
