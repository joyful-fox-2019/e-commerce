<template>
  <div>
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand href="#">UAP</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" @click.prevent="goHome">Browse</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button
            v-if="isLogin"
            @click="$store.commit('getCart');$bvModal.show('modal-scoped')"
            id="cart-button"
            size="sm"
            class="my-2 my-sm-0"
            type="submit"
          >
            <icon name="shopping-cart"></icon>Cart
          </b-button>

          <b-nav-item-dropdown v-if="isLogin" right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>User</template>
            <b-dropdown-item @click="myProduct">My Products</b-dropdown-item>
            <b-dropdown-item href="#" @click="addProduct">Add Product</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#" @click.prevent="onLogout" >Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-if="!isLogin" href="#" @click.prevent="goLogin">Login</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal id="modal-scoped">
      <template v-slot:modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5>My Cart</h5>
      </template>

      <template v-slot:default="{ hide }">
        <div v-for="game in cart" :key="game._id">
          <div class="d-flex justify-content-around">
            <p>{{game.title}}</p>
            <b-button @click.prevent="onDeleteCart(game._id)" variant="danger" size="sm">Delete</b-button>
          </div>
        </div>
      </template>

      <template v-slot:modal-footer="{ ok, cancel, hide }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button variant="outline-secondary" @click="hide('forget')">Cancel</b-button>
        <b-button variant="success" @click="ok()">Checkout</b-button>
        <!-- Button with custom close trigger value -->
      </template>
    </b-modal>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import axios from '../helpers/axios'
import Swal from 'sweetalert2'

export default {
  name: 'Navibar',
  components: {
    Icon
  },
  methods: {
    onLogout(){
      localStorage.clear();
      this.$store.commit('loginFalse');
      this.$router.push('/')
    },
    goLogin () {
      this.$router.push('/login')
    },
    onDeleteCart (gameId) {
      axios({
        method: 'patch',
        url: `/products/pull/${gameId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$store.commit('getCart')
          Swal.fire({
            title: 'Removed to cart!',
            icon: 'success'
          })
        })
        .catch(err => {
          Swal.fire('Error', err, 'error')
        })
    },
    goHome () {
      this.$router.push('/')
    },
    addProduct () {
      this.$router.push('/add')
    },
    myProduct () {
      this.$router.push('/product')
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style scoped>
.navbar-dark .navbar-nav .nav-link {
  color: #cbbde2;
}

#cart-button {
  background:yellow;
  color: black;
}
</style>
