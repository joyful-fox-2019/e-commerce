<template>
  <div id="cart">
    <Navbar />
    <div id="form-cart">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div id="cart-header">
              <h4>Cart</h4><br><br>
            </div>
            <div id="cart-body">
              <div id="cart-list" class="col-6">
                <div v-for="(product, index) in cartData" :key="index" class="card mb-3" style="max-width: 540px;">
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <img :src="product.img" class="card-img" alt="...">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">{{product.name}}</h5>
                        <p class="card-text"><span class="badge badge-warning">Price: ${{product.price}}</span></p>
                        <p class="card-text" id="qty">Quantity: {{product.qty}}</p>
                          <center>
                            <button @click="removeFromCart(product)" type="button" style="background-color: #b71540; color: white;" class="btn"><i class="fas fa-trash-alt"></i></button>
                          </center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="cart-summary" class="col-6">
                <div class="card w-70">
                  <div class="card-body">
                    <h5 class="card-title">Summary</h5> <hr>
                    <center><p class="card-text"><span id="badge-total" class="badge"><strong>Total Payment: ${{totalPayment}}</strong></span></p></center>
                    <button type="button" @click="checkout()" style="background-color:#16a085;" class="btn btn"><p style="color: white; font-weight: bold; margin-bottom: 0">Checkout! &nbsp;<i class="fas fa-arrow-alt-circle-right"></i></p> </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { config } from '../config'
import axios from 'axios'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar'

export default {
  name: 'cart',
  components: {
    Navbar
  }, 
  data () {
    return {
      cartData: [],
      cartInformation: null
    }
  },
  methods: {
    checkout() {
      const token = localStorage.getItem('token')
      axios({
        method: 'post',
        url: `${config.host}/transactions`,
        data: {
          cart: this.cartInformation._id,
          product: this.cartInformation.product,
          total: this.totalPayment
        },
        headers: {token}
      })
        .then(({data}) => {
          this.$router.push('/')
          Swal.fire(
            'Transaction Success!',
            `Confirm the transaction in left-top sidebar menu if you already received the products, thank you.`,
            'success'
          )
        })
    },
    getCartData() {
      const token = localStorage.getItem('token')
      axios({
        method: 'get',
        url: `${config.host}/carts`,
        headers: {token},
      })
        .then(({data}) => {
          this.cartData = data.product.reverse()
          this.cartInformation = data
        })
        .catch(console.log)
    },
    removeFromCart(product) {
      const token = localStorage.getItem('token')
      axios({
        method: 'patch',
        url: `${config.host}/carts/remove`,
        headers: {token},
        data: {
          product
        }
      })
        .then(({data}) => {
          this.getCartData()
        })
        .catch(console.log)
    }
  },
  created() {
    this.getCartData()
  },
  computed: {
    totalPayment () {
      let total = 0
      for(let i = 0; i < this.cartData.length; i++) {
        total = total + (this.cartData[i].price)
      }
      return total
    }
  }
}
</script>

<style>
#qty {
  border: 1px solid rgb(224, 213, 213);
  border-radius: 3px;
  padding: 5px;
  font-weight: bold;
}

.badge-warning {
  font-weight: bold;
  font-size: 13px;
}

#cart-body {
  display: flex;
}

.container {
  padding: 50px;
  min-width: 1250px;
  align-self: center;
}

#form-cart {
  display: flex;
  justify-content: center;
  align-items: center;
}

#badge-total {
  width: 190px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c44569;
  color: white;
  margin-bottom: 10px;
}
</style>