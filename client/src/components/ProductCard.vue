<template>
<div class="container">
  <div class="row">
      <div class="py-2 col-sm-3 px-2" v-for=" product in allProducts" :key="product._id">
          <!-- card template -->
          <div class="card border-info">
              <img :src="product.image" class="card-img-top p-2" alt="...">
              <div class="card-body pt-1">
                  <p class="card-text mb-0" style="font-family: 'Alata', sans-serif;">{{product.name}}</p>
                  <p class="card-text text-danger mb-0">{{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}}</p>
                  <p class="card-text mb-1">{{product.qty}} Stock</p>
                  <a class="btn btn-success btn-block text-white" @click.prevent="addProducttoCart(product)" v-b-modal.modal-1><i class="fa fa-shopping-bag pr-2"></i>Buy</a>
              </div>
          </div>
      </div>
  </div>    
</div>    
</template>

<script>
import axios from '@/api/server.js'
import Swal from 'sweetalert2'

export default {
  props: ['product'],
  created () {
    console.log('masuk card')

  },
  data() {
    return {
      qty : 0
    }
  },
  methods : {
    findUser(id) {
    },
    addProducttoCart(product) {
      if (!this.isLogin) {
          Swal.fire({
              title: 'Opps ..',
              text: 'You must login to buy product',
              icon: 'warning'
          })    
          return     
      }
      console.log('masuk add Product', product)
      this.addCart(product)
      this.$store.commit('addProduct', product)      
      console.log(this.$store.state.carts)
    },
    addCart(payload) {
      console.log(payload, 'addcart')      
        axios.
            post('/cart', {
              product : payload._id,
              totalPrice : payload.price,
              totalItem : 1
            }, {
              headers : {
                token : localStorage.getItem('token')},          
            })
            .then(({data}) => {
              console.log('add cart succes')
            })
            .catch(err => {
              console.log(err)
            })
      }
    
  },
  computed : {
    allProducts() {
      return this.$store.state.allProducts
    },
    carts() {
      return this.$store.state.carts
    },
    isLogin() {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style scoped>
/* card-body p {
  font-size: px !important;
  margin : 0px !important;
} */

/* row {
  padding-left: 0% !important
} */
.btn { cursor: pointer; }

.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

</style>
