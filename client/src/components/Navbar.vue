<template>
  <nav>
    <div class="nav-section">
      <div class="nav-logo" @click="toHome"><img src="../../public/logo.png" alt="Logo" class="h-8"></div>
      <div class="nav-item" @click="toProducts">Home</div>
    </div>
    <div class="nav-section" v-if="!isAdmin">
      <form @submit.prevent="search" v-show="productPage">
        <input id="search-bar" v-model="keyword" type="search" placeholder="Search product..">
      </form>
    </div>
    <div class="nav-section">
      <div v-if="!isAdmin && isLogin" class="nav-item" @click="toMyAccount">
        My Account
      </div>
      <div v-if="isAdmin" class="nav-item" @click="addProduct">
        Add Product
      </div>
      <div v-if="isAdmin" class="nav-item" @click="toAdmin">
        Transactions
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
      keyword: '',
      productPage: false
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$store.commit('SET_LOGIN_STATUS', false)
      this.$store.commit('SET_ADMIN', false)
      this.$router.push('/landing')
    },
    toProducts () {
      this.$router.push('/products')
    },
    toAdmin () {
      this.$router.push('/admin')
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
    addProduct () {
      this.$router.push('/addProduct')
    },
    search () {
      this.$store.dispatch('fetchProducts', { keyword: this.keyword })
        .then(({ data }) => {
          this.$store.commit('SET_PRODUCTS', data)
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', title: response.data.message })
        })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    isAdmin () {
      return this.$store.state.isAdmin
    }
  },
  watch: {
    keyword () {
      this.$store.dispatch('fetchProducts', { keyword: this.keyword })
        .then(({ data }) => {
          this.$store.commit('SET_PRODUCTS', data)
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', title: response.data.message })
        })
    },
    '$route.path' () {
      console.log(this.$route.path)
      if (this.$route.path.includes('products')) {
        this.productPage = true
      } else {
        this.productPage = false
      }
    }
  }
}
</script>

<style>
nav {
  height: 8vh;
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
  margin: 2px;
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
