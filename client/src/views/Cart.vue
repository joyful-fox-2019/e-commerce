<template>
  <div>
    <Navbar></Navbar>
    <div class="container" style="min-height:100vh;margin-top: 50px; padding-bottom:100px;">
      <p class="title">Cart List</p>
      <div v-if="carts.length > 0">
        <div class="columns">
          <div class="container1 box column is-two-thirds">
            <CartList v-for="cart in carts" :key="cart._id" :cart="cart" />
          </div>
          <div style="margin-left: 55px;" class="column box total">
            <p class="title payment is-6">Detail Payment</p>
            <hr />
            <p>
              <b>
                Total price :
                <span
                  class="title"
                >Rp.{{totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</span>
              </b>
            </p>
            <br />
            <button class="button is-danger btn" @click="checkout">Checkout</button>
          </div>
        </div>
      </div>
      <div v-else class="image">
        <img class="img" src="../assets/undraw_empty_cart_co35.svg" alt srcset />
        <div class="notFound">
          <i class="fas fa-exclamation-triangle"></i> Sorry Your cart is empty!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import CartList from '../components/CartList.vue'

export default {
  name: 'Carts',
  components: {
    Navbar,
    CartList
  },
  data () {
    return {
      isFullPage: true
    }
  },
  methods: {
    checkout () {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      this.$store
        .dispatch('checkout')
        .then(_ => {
          setTimeout(() => loadingComponent.close(), 1 * 1000)
          setTimeout(() => {
            this.$buefy.toast.open({
              message: `Success, please check your transaction to confims your payment!`,
              type: 'is-success'
            })
          }, 1200)
          if (this.$store.state.isAdmin) {
            this.$store.dispatch('getTransactionAdm')
          } else {
            this.$store.dispatch('getTransaction')
          }
          this.$router.push('/')
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 1000)
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: 'is-danger'
          })
        })
    }
  },
  computed: {
    carts: {
      get () {
        if (this.$store.state.isAdmin === false) {
          return this.$store.state.carts
        }
      }
    },
    totalPrice: {
      get () {
        return this.$store.state.totalPrice
      }
    }
  },
  watch: {
    carts () {},
    totalPrice () {}
  },
  created () {
    if (this.$store.state.isAdmin === false) {
      this.$store.dispatch('getCart')
    }
  }
}
</script>
<style scoped>
.container1 {
  padding-left: 10%;
  height: 60vh;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  /* display: flex ;
    flex-wrap: wrap;
    justify-content: space-around; */
}
.card {
  margin-top: 100px;
  height: 430px;
  width: 300px;
  overflow: hidden;
  margin: 20px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.title {
  color: #c44173;
  font-size: 22px;
}

.total {
  margin-top: 0px !important;
  height: 250px;
  width: 100px;
  overflow: hidden;
  padding: 25px;
  margin: 20px;
  /* box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
}

.btn {
  width: 100%;
  margin-top: 30px;
}

.payment {
  color: black;
}

.image {
  margin: 50px auto;
  text-align: center;
}
.img {
  margin: 80px auto;
  width: 300px;
}
.notFound {
  font-size: 25px;
  color: #d71149;
}
</style>
