<template>
  <div>
    <header>
      <div>
        <!-- cek sini untuk height nantiny -->
        <b-navbar toggleable="lg" type="dark" variant="info" class="bg-info">
          <b-navbar-brand href="#">E-COM</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item @click="toHome" class="d-flex justify-content-center" href="#">HOME</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <div v-if="!isLogin" class="ml-auto d-flex justify-content-center">
              <button @click="toLogin" class="btn btn-primary">Login</button>
            </div>
            <b-navbar-nav v-else class="ml-auto">
              <div class="d-flex justify-content-center  align-items-center mx-3">
                <h5 class="font-weight-bold m-0 p-2 text-white">Hi! {{user.username}}</h5>
                <h5 class="font-weight-bold m-0 p-2 text-white">Your Balance : {{user.balance}}</h5>
              </div>
              <div v-if="role==='seller'"  class="text-center">
                <b-button @click="toMyProducts" variant="primary">
                  <img class="mx-1" src="https://image.flaticon.com/icons/svg/1949/1949627.svg" alt="cartIcon" width="30">
                  <b-badge class="mx-1" variant="light">{{ownProducts.length}}<span class="sr-only"> your products</span></b-badge>
                </b-button>
              </div>
              <div v-else class="text-center">
                <b-button @click="toCart" variant="light">
                  <img class="mx-1" src="https://image.flaticon.com/icons/svg/1374/1374128.svg" alt="cartIcon" width="30">
                  <b-badge class="mx-1" variant="dark">{{carts.length}}<span class="sr-only"> items in cart</span></b-badge>
                </b-button>
              </div>
              <b-nav-item-dropdown class="d-flex justify-content-center" right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                  <img src="https://image.flaticon.com/icons/svg/64/64096.svg" alt="userIcon" width="30">
                </template>
                <b-dropdown-item v-if="role==='seller'" @click="toMyProducts" href="#">My Products</b-dropdown-item>
                <b-dropdown-item v-if="role==='buyer'" @click="toCart" href="#">My Cart</b-dropdown-item>
                <b-dropdown-item v-if="role==='buyer'" href="#">
                <div>
                  <p v-b-modal.modal-1 class="m-0">Top Up</p>
                  <b-modal id="modal-1"  ok-only ok-variant="secondary" ok-title="Cancel" title="TOP UP BALANCE">
                    <form >
                      <div class="form-group">
                        <label for="topup">Balance</label>
                        <input v-model="balance" type="number" min="0" class="form-control" id="inputTopUp" placeholder="Enter Balance">
                      </div>
                      <button @click.prevent="topUp" class="btn btn-sm btn-primary my-3">TOP UP!</button>
                    </form>
                  </b-modal>
                </div>
                </b-dropdown-item>
                <b-dropdown-item @click="toTransaction" href="#">My Transactions</b-dropdown-item>
                <b-dropdown-item @click="logOut">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>

      </div>
    </header>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../../myaxios/axios'
export default {
  props: ['isLogin', 'role', 'carts', 'user', 'ownProducts'],
  data () {
    return {
      balance: ''
    }
  },
  methods: {
    topUp () {
      axios.patch('/users/topup', {
        balance: this.balance
      },
      {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$emit('getProfile')
          Swal.fire({
            icon: 'success',
            title: `Success topup balance, adding ${this.balance} to your account`
          })
          this.balance = ''
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    toLogin () {
      this.$router.push('/login')
    },
    toCart () {
      this.$router.push('/cart')
    },
    toMyProducts () {
      this.$router.push('/myProducts')
    },
    toHome () {
      this.$router.push('/')
    },
    toTransaction () {
      this.$router.push('transactions')
    },
    logOut () {
      Swal.fire({
        title: 'Are you sure want to Log out?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Log out'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            `See you soon ${localStorage.getItem('user')}`
          )
          this.$router.push('/')
          this.$emit('statusLogin', false)
          this.$emit('statusRole', '')
          this.$emit('userOut', '')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          localStorage.removeItem('role')
        }
      })
    }
  },
  created () {

  }
}
</script>

<style>

</style>
