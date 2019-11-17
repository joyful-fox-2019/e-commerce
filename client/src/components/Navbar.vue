<template>
    <b-navbar class="sticky-top" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand class="ml-md-2" to="/">
        <img src="https://image.flaticon.com/icons/svg/1021/1021220.svg" width="40" class="pr-2">
        <b>DipaE-Commerce</b>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="pt-1" v-if="loginStatus" to="/cart/1"><font-awesome-icon icon="cart-plus" class="mr-1"></font-awesome-icon>Cart</b-nav-item>
          <b-nav-item class="pt-1" v-if="loginStatus" to="/mygame/1"><font-awesome-icon icon="shopping-basket" class="mr-1"></font-awesome-icon>Purchased</b-nav-item>
          <b-nav-item class="pt-1" v-if="adminStatus" to="/admin/game-list"><font-awesome-icon icon="user-lock" class="mr-1"></font-awesome-icon>Admin</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            <b-button v-if="!loginStatus" size="sm" class="my-2 my-sm-0 ml-2 text-light" variant="outline-secondary" type="submit" to="/login">
              <font-awesome-icon icon="clipboard-check"></font-awesome-icon>
              Login
            </b-button>
            <b-button v-if="loginStatus" @click="logout()" size="sm" class="my-2 my-sm-0 ml-2 text-light" variant="outline-secondary" type="submit" to="/">
              <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
              Logout
            </b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {

    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ path: '/' })
      this.$store.commit('CHANGE_LOGIN', false)
      this.$store.commit('CHANGE_ADMIN', false)
      this.successToast('Logout successfuly!')
    }
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.commit('CHANGE_LOGIN', true)
    }
    if (localStorage.getItem('role') === 'admin') {
      this.$store.commit('CHANGE_ADMIN', true)
    }
  },
  computed: {
    loginStatus () {
      return this.$store.state.login
    },
    adminStatus () {
      return this.$store.state.admin
    }
  }
}
</script>

<style>

</style>
