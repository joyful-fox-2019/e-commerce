<template>
  <div class="container">
    <div class="row sm-3 md-3  d-flex justify-content-center flex-wrap">
      <div v-for="(item, index) in arrCart" class="card ml-1 mt-4" v-bind:key="index" id="ListItem">
            <label for="stock">Product Name :</label>
            <h3 class="card-text" v-html="item.product.product"></h3>
            <!-- <div class="col"> -->
                <a @click.prevent="deleteCart(item._id)" href="#">
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <image xlink:href='https://image.flaticon.com/icons/png/512/61/61848.png' alt="symbol" height="40" width="40"/>
                    </svg>
                </a>
            <!-- </div> -->
            <label for="price">Total Product :</label>
            <h4 class="card-text" v-html="item.countProduct"></h4>
            <label for="price">Price :</label>
            <h4 class="card-text" v-html="item.price"></h4>
        </div>
    </div>
        <a class="btn" @click="checkOut" style="background-color:#aeddb198; color:#f6f6f6; cursor:pointer;">Check Out</a>
        <div class="" id="checkOut" role="dialog">
               <div class="container">
                   <h2>total belanja: {{ totalPrice }}</h2>
                   <div v-for="(item, index) in arrCheckout" v-bind:key="index">
                     <div class="card">
                       <h1 class="card-title" v-html="item.nama"></h1>
                       <h3>Jumlah Barang: {{ item.count }}</h3>
                       <h2> Harga: {{ item.price }}</h2>
                     </div>
                   </div>
               </div>
             </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => {
    return {
      _id: '',
      productName: ''
    }
  },
  created () {
    this.$store.dispatch('checkCart')
  },
  computed: {
    ...mapState(['arrCart', 'arrCheckout', 'totalPrice'])
  },
  methods: {
    deleteCart (_id) {
      this.$store.dispatch('deleteCart', _id)
    },
    checkOut () {
      this.$store.dispatch('checkOut')
    }
  }
}
</script>

<style>

</style>
