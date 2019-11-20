<template>
  <div>
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div class="container">
              <div class="row">
                <div class="col-sm-4">
                    <div class="card" style="">
                      <div class="card-body text-justify">
                        <h4 class="card-title border-bottom border-success pb-2">Transactions Summary</h4>
                        <h5 class="card-text text-danger">{{totalPrice}}</h5>
                        <a class="btn btn-block btn-success mt-4 text-white" @click.prevent="checkout">Check Out</a> 
                        <a class="btn btn-block btn-danger mt-3 text-white" @click.prevent="deleteAllCart">Delete Cart</a> 
                      </div>
                    </div>
                </div>
                <div class="col-sm-8">                    
                    <div class="card mb-3 border-info" v-for="cart in carts" :key="cart.product._id">
                      <div class="row no-gutters">
                        <div class="col-md-4">
                          <img :src="cart.product.image" class="card-img p-3" alt="...">
                        </div>
                        <div class="col-md-8">
                          <div class="card-body pl-0">
                            <h5 class="card-title">{{cart.product.name}}</h5>
                            <p class="card-text">{{cart.totalItem}}</p>
                            <p class="card-text text-danger">{{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(cart.totalPrice)}}</p>
                            <div class="d-flex justify-content-between pt-3" >
                                <a class="btn btn-outline-success" @click.prevent="updateCart(cart.product._id)" href=""><i class="fa fa-cart-plus pr-1"></i>Edit</a>
                                <a class="btn btn-outline-danger" @click.prevent="deleteCart(cart.product._id)" href=""><i class="fa fa-cart-arrow-down pr-1"></i>Delete</a> 
                            </div>
                          </div>
                        </div>
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
import toRupiah from '@/helpers/toRupiah'
import axios from '@/api/server'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      userOrders : []
    }
  },
  methods : {
    deleteCart(id) {
      this.$store.commit('deleteCart',id)
    },
    checkout() {
      this.prepareData(this.carts)
      console.log('masuk checkout', this.userOrders)
      if (this.userOrders.length == 0) {
        Swal.fire(
            'Ops ....',
            'Currently You have no cart',
            'error'
          ) 
          return
      }
      axios.
        post('/cart', this.userOrders, {
          headers : {
            token : localStorage.getItem('token')}
        })
        .then(({data}) => {
          Swal.fire(
            'You succesfully checkout',
            'Now please complete the payment',
            'success'
          )                  
          return axios.
                      post('/transaction', this.carts , {
                        headers : {
                          token : localStorage.getItem('token')
                        }
                      })

        })
        .then(({data}) => {
          console.log(data, 'transactions success')
          this.$store.commit('clearCarts')
          this.$store.dispatch('findTransaction')
          this.$router.push('transaction')
        })
        .catch(err => {
          console.log(err)
          Swal.fire(
            'Opps ....!',
            `${err.response.data.msg}`,
            'error'
          )
        })
    },
    prepareData(input) {
      for (let i=0; i<input.length; i++) {
        this.userOrders[i] = {
          product : input[i].product._id,
          totalItem : input[i].totalItem,
          totalPrice : input[i].totalPrice
        }
      }
    },
    deleteAllCart() {
      if (this.carts.length == 0) {
        Swal.fire(
            'Ops ....',
            'Currently You have no cart',
            'error'
          ) 
          return
      }
      console.log('masuk delete cart')
      this.$store.commit('clearCarts')
    } 
  },
  computed : {
    carts() {
      return this.$store.state.carts
    },
    totalPrice() {
      return toRupiah(this.$store.state.totalMoney)
    }
  }, created() {

  }
}
</script>

<style scoped>
.card-img{
    width: 90%;
    height: 12vw;
    object-fit: cover;
}

p, h5 {
  margin: 1px !important
}


</style>
