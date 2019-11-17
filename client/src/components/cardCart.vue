<template>
  <div>
  <b-card
      :title="item.productId.name"
      :img-src="item.productId.imgUrl[0]"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2 mr-2 cardHover"
    >
    <b-card-text>
        price : Rp.{{Number(item.productId.price)*Number(item.quantities)}}
    </b-card-text>
    <b-card-text>
        Qty : {{item.quantities}} pcs
    </b-card-text>
    <b-button variant="success" @click="checkout(item.productId._id,item.quantities,item.productId.quantities,item._id)">checkout</b-button>
    <b-button variant="danger" @click="deleted(item._id)" class="ml-1">delete</b-button>

  </b-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapState } from 'vuex'
export default {
  props: [
    'item'
  ],
  data () {
    return {
        show: false
    }
  },
  methods: {
    checkout(id,qty,qtyProduct,checkoutId){
        let calt = Number(qtyProduct) - Number(qty)
        let form = {
            id: id,
            quantities: calt
        }
        this.$store.dispatch('updateCart', form)
          .then(({ data })=>{
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: 'CheckOut successfully'
              })
              this.deleted(checkoutId)
          })
          .catch(err=>{
              Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Checkout Failed!"
              });
          })
    },
    deleted(id){
        let form = {
          id: id
        }
        this.$store.dispatch('deleteCart', form)
          .then(({ data })=>{
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: 'Delete successfully'
              })
          })
          .catch(err=>{
              Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Delete Failed!"
              });
          })
    },
    mounted () {
      this.$store.dispatch('getMyCart')
    },
  },
  computed: mapState(["isLogin"])
}
</script>

<style>
/* what is nice 😇 */
.btn:focus, .btn:active {
  outline: none !important;
  box-shadow: none !important;
}
/* -- */
.btnNone{
    transition: 0.5s;
}
.btnNone:hover{
    color: orange
}
</style>
