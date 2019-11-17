<template>
  <div id="cart">
     <div class="q-pa-md">
        <q-table
          title="Cart"
          :data="data"
          :columns="columns"
          row-key="productName"
          :rows-per-page-options="[0]" 
          no-data-label="There are no data to record"
          :pagination.sync="pagination"
          selection="multiple"
          :selected.sync="selected"
        >
          <template slot="top-selection" slot-scope="props">
            <div class="col" />
            <q-btn color="negative" flat round delete icon="delete" @click="remove" />
          </template>

        </q-table>

        <div >
          <h6 :style="setColor">Total price: Rp. {{ totalPrice }} </h6>
        </div>

        <q-btn
        :ripple="false" 
        @click="startCheckout"
        >
          Checkout
            <q-tooltip v-if="!moneys" content-style="font-size: 10px" content-class="bg-red" :offset="[10, 10]">
              You dont have enough money to checkout, please top-up first
            </q-tooltip>
        </q-btn>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return {
      pagination: {
         page: 1,    
         rowsPerPage: 0 // 0 means all rows    
     },
       columns: [
        {
          name: 'productName',
          required: true,
          label: 'Product Name',
          align: 'left',
          field: row => row.productName,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'qty', align: 'center', label: 'Quantity', field: 'qty', sortable: true },
        { name: 'ePrice', label: '@ price', field: 'ePrice', sortable: true },
        { name: 'tPPrice', label: 'Total Product Price', field: 'tPPrice', sortable: true  },
      ], 
      data: [],
      totalPrice: 0,
      checkout: true,
      moneys: true,
      selected: []
    }
  },
  methods: {
    setTableData(){
      let temp = []
      if(this.user.cart){
        this.user.cart.forEach((el) => {
          let obj = {}
          obj.productName = el.product.name
          obj.qty = el.qty
          obj.ePrice = 'Rp. '+ el.product.price
          obj.tPPrice = (el.qty * el.product.price)
          this.totalPrice = this.totalPrice + obj.tPPrice
          temp.push(obj)
        })
        this.data = temp
      }
    },
    getUser(){
      this.$store.dispatch('users/getProfile')
        .then(()=>{
          this.setTableData()
        })
        .catch((err) => {
          console.log(err);
        })
    },
    startCheckout(){
      if(this.data.length >= 1) {
        if(this.checkout){
          this.$store.dispatch('transactions/checkout',this.totalPrice)
          .then(()=>{
            this.totalPrice = 0
            console.log(this.data,'atas')
            this.data = []
            this.checkout = false
            console.log(this.data,'bawah')
            this.$emit('performCheckout')
            this.getUser()
          })
          .catch((err) => {
            console.log(err);
          })
        } else {
          console.log('tidak bisa checkout');
        }
      } else {
          this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'report',
              message: `You have nothing in your cart`
            })
      }
    },
    remove(){
      // console.log(this.selected[0])
      let names = []
      this.selected.forEach((el) => {
        names.push(el.productName)
      })
      this.$store.dispatch('users/removeCart',names)
        .then(() => {
          this.totalPrice = 0
          this.selected = []
          this.getUser()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed : {
    ...mapState('users',['user']),
    setColor(){
      if(this.totalPrice === 0){
        return "color: black"
      } else if (this.totalPrice <= this.user.money) {
        this.moneys = true
        return "color: blue"
      } else {
        this.moneys = false
        return "color: red"
      }
    }
  },
  created(){
    // this.setTableData()
    if(!this.user.cart){
      console.log('masuk sini')
      this.getUser()
    } else {
      this.setTableData()
    }
  }
}
</script>

<style>

</style>