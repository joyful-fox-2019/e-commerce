<template>
  <q-card class="my-card">

    <img :src="product.img">

    <q-card-section>
      <div class="text-h6">{{product.name}}</div>
      <div class="text-subtitle2">{{product.price}} IDR</div>
      <div class="text-body2">Stock: {{product.stock}} packs</div>
    </q-card-section>
    <q-card-section v-if="!isAdmin">
      <q-input
        filled
        type="number"
        v-model="quantity"
        label="Your Quantity *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your quantity',
          val => val > 0 || 'Minimal amount is 1'
        ]"
      /> 
      
    </q-card-section>
    <q-card-actions vertical>
      <q-btn v-if="!isAdmin && isLogin" @click.prevent="addcart(product._id)" color="red" icon="add" label="Add To Cart" ></q-btn>
    </q-card-actions>
    <q-card-actions vertical>
      <q-btn v-if="isAdmin && isLogin" @click.prevent="edit(product._id)" color="blue-grey-4" icon="edit" label="Edit Product" ></q-btn>
    </q-card-actions>
    <q-card-actions vertical>
      <q-btn v-if="isAdmin && isLogin" @click.prevent="del(product._id)" color="blue-grey-14" icon="delete" label="Delete Product" ></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from 'vuex';
export default {
  name: 'Card',
  props:['product'],
  data () {
    return {
      quantity: '', 
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      isAdmin: state => state.isAdmin,
    })
  },
  methods: {
    addcart(id){
      const payload = {
        id: id, quantity: this.quantity
      }
      this.$store.dispatch('addtocart', payload)
        .then( data => {
          Swal.fire({
            title: 'Success',
            text: `Success Add To Cart`,
            icon: 'success'
          })
          this.quantity = ''
          this.$router.push('/cart')
        })
        .catch( err => {
          console.log(err, 'aaaa')
          this.next(err)
        })
    },
    del(id){
      Swal.fire({
        title: 'Are you sure To Delete?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete'
      })
        .then((result) => {
          if (result.value) {
            this.$store.dispatch('deleteProducts', id)
            .then(() => {
              Swal.fire({
                title: 'Success',
                text: `Success Delete`,
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
      
    },
    edit(id){
      console.log(id, this.product.name, this.product.price, this.product.stock, this.product.img)
      this.$router.push({name: "updateproduct", params:{id: id, data: this.product}})
    }
  },
  // watch: {
  //   isLogin(){
  //   },
  //   isAdmin(){
  //   }
  // },
  created () {
    this.$store.dispatch('auth', true)
  }
}
</script>


<style scoped>
.my-card{
  width: 100%;
  max-width: 250px;
}
  
</style>

