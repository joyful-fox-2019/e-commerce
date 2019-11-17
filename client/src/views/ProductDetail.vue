<template>
  <div id="productPage">
    <navbar></navbar>
  <div id="productDetail" class="row">

    <div id="productLeft"  class="col-5">
      <div id="productImage">
        <img :src="this.thisProduct.image" width="100%"/>
      </div>
      <div id="cartForm">
        <h6>Add to cart</h6>
        <div id="formDetail">
          <div>
            <q-btn :ripple="false" push color="white" text-color="primary" round icon="remove" @click="minusOne" />
          </div>
          <div id="qty">
            <h6>  {{ qty }} </h6>
          </div>
          <div id="pBtn">
            <q-btn :ripple="false" push color="primary" round icon="add"  @click="plusOne" />
          </div>
          <h6> Total price: {{totalPrice}} </h6>
        </div>
          <q-btn align="around" :ripple="false" class="btn-fixed-width" color="primary" label="Add to cart" icon="shopping_cart" @click="addToCart" />
      </div>
    </div>

    
    <div id="productRight" class="col-6">
      <div>
        <h4>{{ this.thisProduct.name }}</h4>
      </div>
      <div>
        <h6> {{ price }} </h6>
      </div>
      <div>
        <h6> Available: {{ this.thisProduct.stock }} pcs </h6>
      </div>
      <div>
        <div v-html="this.thisProduct.detail"></div>
      </div>
    </div>

    
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '../components/Navbar'

export default {
  name: 'productDetail',
  components: {
    Navbar
  },
  data(){
    return {
      qty: 0,
    }
  },
  methods: {
    getProductDetail(){
      this.$store.dispatch('products/findProduct',this.$route.params.productId)
    },
    minusOne(){
      console.log('masuk minus')
      if (this.qty > 0) {
        this.qty = this.qty - 1
      }
    },
    plusOne(){
      console.log('masuk plus')
      if (this.qty < this.thisProduct.stock) {
        this.qty = this.qty + 1
      }
    },
    addToCart(){
      if (localStorage.getItem('token')){
        if (this.qty >= 1) {
        let payload = {
          productId: this.thisProduct._id,
          qty: this.qty
        }
        this.$store.dispatch('users/addToCart',payload)
          .then((data) => {
            this.$store.dispatch('users/getProfile')
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'success',
              message: `${data.message}`
            })
          })
          .catch((err) => {
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'warning',
              message: `${err.message}`
            })
          })
        } else {
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'warning',
            message: `Please input product value`
          })
        }
      }else{
        this.$store.commit('SET_STATE',true)
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'warning',
            message: `You must login first!`
          })
      }
    }
  },
  computed : {
    ...mapState('products',[
      'thisProduct'
    ]),
    price(){
      return 'Rp. ' + this.thisProduct.price
    },
    totalPrice(){
      return 'Rp. ' + (this.qty * this.thisProduct.price)
    }
  },
  created(){
    // this.getProductDetail()
  }
}
</script>

<style>
#productDetail{
  width: 90%;
  margin: 20px auto;
  display: flex;
  flex-direction: row
}
#productImage{
  width: 400px;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.233);
  display: flex;
  align-items: center
}
#productLeft{
  display: flex;
  flex-direction: column;
}
#productRight{
  display: flex;
  flex-direction: column;
  margin-left: 30px
}
#productRight h4, 
#productRight h6 {
  margin: 0px
}
#cartForm{
  height: 90px !important;
  width: 100%;
}
#cartForm h6{
  margin: 5px 
}
#formDetail{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px
}
#qty{
  margin: 0 10px
}
#pBtn{
  margin-right: 10px
}
</style>