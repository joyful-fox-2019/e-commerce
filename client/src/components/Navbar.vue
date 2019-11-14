<template>
  <nav>
    <div class="nav-section">
      <div class="nav-logo" @click="toHome">Logo</div>
      <div class="nav-item" @click="toHome">Home</div>
      <div class="nav-item" @click="toProducts">Products</div>
    </div>
    <div class="nav-section">
      <form @submit.prevent="search">
        <input id="search-bar" v-model="keyword" type="search" placeholder="Search product..">
      </form>
    </div>
    <div class="nav-section">
      <div class="nav-item" @click="toMyAccount">
        My Account
      </div>
      <div v-if="isLogin" class="nav-item" @click="logout">
        Logout
      </div>
      <div v-if="!isLogin" class="nav-item" @click="toLogin">Login</div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$store.commit('SET_LOGIN_STATUS', false)
      this.$router.push('/landing')
    },
    toProducts () {
      this.$router.push('/products')
    },
    toHome () {
      this.$router.push('/')
    },
    toMyAccount () {
      this.$router.push('/myaccount')
    },
    toLogin () {
      this.$router.push('/landing')
    },
    search () {
      this.$store.dispatch('search', { keyword: this.keyword })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style>
nav {
  height: 10vh;
  background-color: rgb(20, 20, 20);
  display: flex;
  color: aliceblue;
  justify-content: space-around;
  padding: 5px;
  align-items: center;
}
.nav-section {
  height: 100%;
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
}
.nav-item {
  height: 100%;
  flex: 1;
  display: block;
  margin: 4px;
  cursor: pointer;
  align-items: center;
  display: flex;
  justify-content: center;
}
.nav-logo {
  height: 100%;
  flex: 1;
  display: block;
  margin: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-item:hover {
  color: turquoise;
  background-color: gray;
}

#search-bar {
  padding: 5px;
  border: none;
  border-bottom: 1px azure solid;
  outline: none;
  background-color: transparent;
  color: azure;
  width: 200px;
}

#search-bar:focus {
  border-bottom: 2px turquoise solid;
  color: white;
  font-size: 1.1em;
  /* background-color: rgba(0, 0, 0, 0.462) */
}
</style>
