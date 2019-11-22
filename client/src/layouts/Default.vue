<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-blue-grey-5 text-black">
      <q-toolbar>
        <q-btn v-if="isLogin" dense flat round icon="menu" @click="left = !left" />
        <q-btn 
          to="/"
          exact 
          round flat>
            <q-avatar>
              <img src="../assets/logo.png">
            </q-avatar>
          </q-btn>
        <q-space />

        <div class="YL__toolbar-input-container row no-wrap">
          <q-input dense outlined square v-model="search" placeholder="Search" class="bg-white col" />
          <q-btn @click.prevent="searchproduct" class="YL__toolbar-input-btn" color="grey-3" text-color="grey-8" icon="search" unelevated />
        </div>
        <q-space />

        <div v-if="!isLogin">
          <q-btn 
            to="/login"
            exact
            outline style="color: blue-grey; margin-right:5px;" 
            icon-right="assignment_ind" 
            label="Login"
            />

          <q-btn to="/register"
            exact
            outline style="color: blue-grey;" icon-right="control_point" label="Register" />
        </div>
        <div v-if="isLogin" class="q-gutter-sm row items-center no-wrap">
          <q-btn 
          to="/cart"
          exact 
          round dense flat color="grey-8" icon="add_shopping_cart" v-if="!isAdmin">
            <q-badge color="red" text-color="white" floating>
              {{dataCart.length}}
            </q-badge>
            <q-tooltip>Your Cart</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-tooltip>{{username}}</q-tooltip>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item @click.prevent="logout" clickable v-close-popup>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

      <!-- drawer content -->
    <q-drawer v-if="isLogin" show-if-above v-model="left" side="left" bordered>
      <q-scroll-area class="fit">
        <q-list v-if="isAdmin" padding>
          <q-item to="/addproduct"
          exact >
            <q-item-section avatar >
              <q-icon name="library_add" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Add Product</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/addadmin"
          exact >
            <q-item-section avatar >
              <q-icon name="group_add" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Add Admin</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/pending"
          exact >
            <q-item-section avatar >
              <q-icon name="low_priority" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Pending</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/approved"
          exact >
            <q-item-section avatar >
              <q-icon name="priority_high" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Approved</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list v-if="!isAdmin && isLogin" padding>
          <q-item to="/transactions"
          exact >
            <q-item-section avatar >
              <q-icon name="assignment_turned_in" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Transactions</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/cart"
          exact >
            <q-item-section avatar >
              <q-icon name="shopping_cart" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Carts</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
import Swal from "sweetalert2";
export default {
  data () {
    return {
      left: false,
      search: ''
    }
  },
  computed:{
    ...mapState({
  // map this.count to store.state.count
    isLogin: state => state.isLogin,
    isAdmin: state => state.isAdmin,
    dataCart: state => state.dataCart
    }),
    username(){
      return localStorage.getItem('username')
    }
  },
  methods: {
    logout(){
      Swal.fire({
        title: 'Are you sure To Exit?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout'
      })
        .then((result) => {
        if (result.value) {
            this.$store.dispatch('logout')
            .then(() => {
              console.log('masuuuukkk')
              Swal.fire({
                title: 'Success',
                text: `Success Login`,
                icon: 'success'
              })
              this.$router.push('/login')
            })
            .catch( err => {
              this.next(err)
            })
          }
        }) 
    },
    searchproduct(){
      let payload = this.search
      this.$store.dispatch('search', payload)
      this.search = ''
    }
  },
  watch: {
    isLogin(){
    },
    isAdmin(){
    }
  },
  created () {
    this.$store.dispatch('auth', true)
  }
}
</script>

<style lang="stylus" scoped>
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
</style>