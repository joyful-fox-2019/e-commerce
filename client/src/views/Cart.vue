<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section class="bg-blue-grey-14 text-white">
        <q-btn class="absolute-right" color="red" icon-right="send" label="Checkout" @click.prevent="checkout" />
        <div class="text-h6">Your Cart</div>
        Your Total Price: {{totalPrice}} IDR
      </q-card-section>

      <q-separator /> 
      <div v-if="dataCart.length != 0">
        <ListCart v-for="cart in dataCart" :key=cart._id :cart=cart />
      </div>
      <div v-else >
        <img alt="Quasar logo" class="center" src="../assets/logo.png" >
      </div>
      

    </q-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListCart from "../components/ListCart";
import Swal from "sweetalert2";
export default {
  name:'Cart',
  computed: {
    ...mapState({
      dataCart: state => state.dataCart
      }
    ),
    totalPrice(){
      let total = 0
      this.dataCart.forEach(el => {
        total += Number(el.quantity) * Number(el.product.price)
      });
      return total
    }
  },
  methods:{
    checkout(){
       Swal.fire({
        title: 'Are you sure To Checkout?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Checkout'
      })
        .then((result) => {
          if (result.value) {
            this.$store.dispatch('checkout')
            .then(() => {
              Swal.fire({
                title: 'Success',
                text: `Success checkout`,
                icon: 'success'
              })
              this.$store.dispatch('product')
              this.$router.push('/')
            })
            .catch( err => {
              this.next(err)
            })
          }
        })
      
    }
  },
  components: {
    ListCart
  },
  mounted () {
    this.$store.dispatch('cart')
  }
}
</script>

<style lang="stylus" scoped>
  
.card-cart{
  width: 100%;
  max-width: 500px;
  border: solid 2px black;
}

</style>

