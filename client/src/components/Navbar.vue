<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <span class="mini-shop">
        <span style="font-size: 14px">
          <i>Baru</i>
        </span> MBUKA-LAPAK
      </span>
      <a @click.prevent="home" class="navbar-item nav-link">
        <i class="fas fa-home fa-lg" style="margin-right:10px"></i>
      </a>
      <FormSearch style="margin: auto;"></FormSearch>
    </div>
    <div v-if="isLogin" class="navbar-menu">
      <div class="navbar-end">
        <a
          @click.prevent="getTransaction"
          class="navbar-item nav-link"
          slot="trigger"
          role="button"
        >
          <b-tooltip label="Transaction" position="is-bottom" type="is-danger">
            <i class="fas fa-exchange-alt" style="padding: 10px"></i>
          </b-tooltip>
        </a>
        <a
          @click.prevent="getCart"
          v-if="!isAdmin"
          class="navbar-item nav-link"
          slot="trigger"
          role="button"
        >
          <i class="fas fa-shopping-cart"></i>
          <span v-if="!isAdmin" class="cart button is-warning is-small is-rounded">{{carts}}</span>
        </a>
        <b-dropdown hoverable position="is-bottom-left" aria-role="menu">
          <a class="navbar-item nav-link" slot="trigger" role="button">
            <span>Menu</span>
            <b-icon icon="menu-down"></b-icon>
          </a>
          <b-dropdown-item custom aria-role="menuitem">
            <b-icon pack="fas" icon="user" style="margin-right: 5px;"></b-icon>
            <b>{{username}}</b>
          </b-dropdown-item>
          <div v-if="!isAdmin">
            <b-dropdown-item custom aria-role="menuitem" style="display: none;">
              <b-icon pack="fas" icon="user" style="margin-right: 5px;"></b-icon>
              <b>{{username}}</b>
            </b-dropdown-item>
          </div>
          <div v-else>
            <b-dropdown-item @click="addProduct" aria-role="menuitem">
              <i class="fas fa-plus" style="margin-right: 5px;"></i>
              Add Product
            </b-dropdown-item>
          </div>
          <hr class="dropdown-divider" />
          <b-dropdown-item @click="logout" aria-role="menuitem">
            <b-icon icon="logout"></b-icon>Logout
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div v-else class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item nav-link" slot="trigger" role="button">
          <i class="fas fa-shopping-cart"></i>
        </a>
        <b-dropdown hoverable position="is-bottom-left" aria-role="menu">
          <a class="navbar-item nav-link" slot="trigger" role="button">
            <span>Login</span>
            <b-icon icon="menu-down"></b-icon>
          </a>
          <b-dropdown-item custom aria-role="menuitem">
            <FormLogin></FormLogin>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </nav>
</template>

<script>
import FormLogin from '../components/form/formLogin'
import FormSearch from '../components/form/formSearch'

export default {
  name: 'navbar',
  components: {
    FormLogin,
    FormSearch
  },
  data () {
    return {
      collapsed: false,
      username: ''
    }
  },
  methods: {
    home () {
      this.$router.push('/')
    },
    getTransaction () {
      this.$router.push('/transaction')
    },
    logout () {
      localStorage.clear()
      this.$store.dispatch('auth')
      this.$store.dispatch('getUsername')
      this.$buefy.toast.open({
        message: `Logout success`,
        type: 'is-success'
      })
      this.username = ''
      this.$router.push('/')
    },
    addProduct () {
      this.$router.push('/addProduct')
    },
    getCart () {
      this.$store.dispatch('getCart')
      this.$router.push('/cart')
    },
    transaction () {
      this.$store.dispatch('getTransaction')
    }
  },
  computed: {
    isLogin: {
      get () {
        return this.$store.state.isLogin
      }
    },
    isAdmin: {
      get () {
        return this.$store.state.isAdmin
      }
    },
    getUsername: {
      get () {
        return this.$store.state.username
      },
      set () {}
    },
    carts: {
      get () {
        if (this.$store.state.isAdmin === false) {
          return this.$store.state.carts.length
        }
      }
    }
  },
  watch: {
    isLogin () {},
    isAdmin () {},
    username () {},
    carts () {}
  },
  created () {
    this.$store.dispatch('auth')
    this.username = localStorage.getItem('username')
    if (this.$store.state.isAdmin === false) {
      this.$store.dispatch('getCart')
    }
  }
}
</script>
<style scoped>
b-tooltip {
  margin: 10px;
}
.mini-shop {
  margin: auto 10px auto 10vw;
  /* margin: auto; */
  font-family: "Special Elite", cursive;
  font-size: 25px;
  padding: 0 5px 0 7px;
  color: white;
  text-shadow: 4px 4px 3px #000000;
}

.navbar {
  background-color: #d71149;
  color: white;
}

.navbar-menu {
  margin-right: 20px;
}

.navbar .nav-link {
  color: white;
}

.navbar-item:hover {
  background-color: rgb(156, 51, 81) !important;
}

.navbar-end {
  margin-right: 9vw;
}

.cart {
  font-size: 10px;
  padding: 0 !important;
  height: 15px !important;
  width: 15px !important;
  margin-top: -20px;
}
</style>
