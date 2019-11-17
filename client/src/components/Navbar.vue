<template>
<div id="nav">
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="text-black" id="header">
      <q-toolbar>
        <div id="brand" @click="goHome">
          <q-toolbar-title>
            <q-icon name="home"/>
            Title
          </q-toolbar-title>
        </div>
        <div id="searchBar">
          <q-input color="teal" outlined v-model="search" :dense=true id="searchColumn" placeholder="Search product...">
            <template v-slot:append>
              <q-avatar>
                <q-icon name="search"/>
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div v-if="!login" class="buttonNavbar">
           <q-btn-dropdown
              :ripple="false"
              color="blue"
              label="login"
              v-model="state"
              size='md'
              no-caps
              id="loginButton"
            >
              <form-login></form-login>
           </q-btn-dropdown>
           <q-btn-dropdown
              color="white"
              :ripple="false"
              class="text-blue"
              label="register"
              size='md'
              no-caps
            >
            <form-register></form-register>
           </q-btn-dropdown>
        </div>
        <div v-if="login">
          <div class="buttonNavbar">
            <q-btn round :color="setColor" size="sm" icon="shopping_cart" style="margin-right: 5px; margin-top: 2px" v-if="!admin" to='/profile/cart' />
            <q-btn-dropdown round color="secondary" icon="person"> 
              <q-list>

                <q-item clickable v-close-popup @click="profilePage">
                  <q-item-section avatar>
                    <q-avatar icon="person" size="md" color="primary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ profile }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="logout">
                  <q-item-section avatar>
                    <q-avatar icon="logout" size="md" color="primary" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Logout</q-item-label>
                  </q-item-section>
                </q-item>

                <!-- <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-btn outline color="primary" label="logout" @click="logout" />
                  </q-item-section>
                </q-item> -->

              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
      </q-toolbar>
    </q-header>
  </q-layout>
  </div>
</template>

<script>
import FormLogin from '@/components/FormLogin.vue'
import FormRegister from '@/components/FormRegister.vue'
import {mapState} from 'vuex'

export default {
  components : {
    FormLogin,
    FormRegister
  },
  data () {
    return {
      search : '',
      setColor: 'grey'
    }
  },
  methods : {
    logout(){
      localStorage.clear()
      this.$store.commit('LOGIN',false)
      this.$store.commit('SET_ADMIN',false)
      this.$store.commit('USERNAME','')
      this.$store.commit('SET_ID','')
      this.$store.commit('users/EMPTY_USER')
    },
    profilePage(){
      if(this.admin){
        localStorage.setItem('admin',true)
        this.$router.push('/admin')
      } else {
        this.$router.push('/profile')
      }
    },
    goHome(){
      this.$router.push('/')
    },
    setColorCart(){
      console.log('masuk set color')
      if(!this.user.cart.length){
        console.log('grey')
        this.setColor = 'grey'
      } else {
        console.log('secondary')
        this.setColor = 'deep-orange'
      }
    }
  },
  computed : {
    ...mapState(['login','admin','username','state']),
    ...mapState('users',[
      'user'
    ]),
    profile(){
      if (this.$store.state.admin){
        return 'Admin'
      } else {
        return this.username
      }
    }
  },
  watch : {
    user(baru,lama){
      if(baru.cart){
        this.setColorCart()
      }
      console.log(baru,'ini baru')
      console.log(lama,'ini lama')
    }
  },
  created(){
    if(this.user.cart){
      this.setColorCart()
    }
  }
}
</script>

<style scoped>
#nav{
  height: 3rem !important;
}
#header{
  background-color: rgba(255, 255, 255, 0.445);
  padding: 0 20px
}
#brand{
  width: 7% !important;
  cursor: pointer;
}
#searchBar{
  width: 100%;
  margin: 5px;
}
#searchColumn{
  padding: 2px !important
}
#loginButton{
  font-size: 13px
}
.buttonNavbar{
  display: flex;
}
</style>