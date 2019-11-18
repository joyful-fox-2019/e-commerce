<template>
  <div>
    <h1 class="my-3">WELCOME TO TRANSACTIONS</h1>

    <div class="transac-container d-flex flex-column justify-content-center align-items-center">

     <div v-for="(transaction, i) in buyerTransactions" :key="i" >
        <div v-for="item in transaction.items" :key="item._id">

        <div v-if="item.productId" class="transac-card">
          <div class="transac-date d-flex align-items-center">{{ dateFormat(transaction.createdAt) }}</div>

        <div class="store-and-status d-flex">
          <div class="transac-store w-50 text-left">
            <p>{{ item.seller.email }}</p>
          </div>
          <div class="transac-status w-50 text-left">
            <button  class="btn btn-success" @click="changeStatus(item.productId._id, 'Done')" v-if="item.status === 'Shipped'">Order Received</button>
            <button class="btn btn-secondary" v-if="item.status === 'Done'" readonly>Done</button>
            <div v-if="item.status !== 'Done' && item.status !== 'Shipped'">
              <p class="text-secondary">Status</p>
              <p class="text-info" style="font-weight: 600;">{{ item.status }}</p>
            </div>
          </div>
        </div>

        <div class="d-flex">

          <div class="transac-product d-flex">
            <img src="https://bit.ly/355433T" alt="">

            <div>
              <p class="product-name">{{ item.productId.name }}</p>
              <p class="price">{{ item.productId.price  }}</p>
              <p class="qty">{{ item.qty  }} pcs</p>
            </div>

          </div>

          <div class="d-flex">
             <div class="total-harga">
              <p >Total harga Produk</p>
              <p class="price">${{ item.productId.price * item.qty }}</p>
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
import { mapState } from 'vuex'

export default {
  name: 'transactions',
  computed: {
    ...mapState(['buyerTransactions'])
  },
  methods: {
    dateFormat (date) {
      let event = new Date(date)
      let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      return event.toLocaleDateString('en-US', options)
    },
    changeStatus (id, status) {
      this.$store.dispatch('CHANGE_STATUS', { id, status })
    }
  },
  created () {
    this.$store.dispatch('GET_BUYER_TRANSACTIONS')
  }
}
</script>

<style>
.transac-container{
  width: 100%;
}

.transac-card{
  margin: 10px 0;
  width: 1000px;
  height: 300px;
  border: .6px solid rgb(172, 172, 172);
  border-radius: 15px;
  box-shadow: 6px 4px 15px 0px rgba(0, 0, 0, 0.137);
}

.transac-date{
  width: 100%;
  height: 30px;
  font-size: 13px;
  padding: 0 15px;
}

.store-and-status{
  height: 100px;
  border: .6px solid rgba(172, 172, 172, 0.322);
  padding: 30px;
}

.transac-store{
  height: 50px;
  border-right: .6px solid rgba(172, 172, 172, 0.671);
  color: rgb(33, 182, 22);
  font-weight: 600;
  padding: 0 10px;
}

.transac-status{
  height: 50px;
  padding: 0 10px;
}

.transac-status p{
  margin: 0;
}

.transac-product{
  width: 50%;
  padding: 30px;
  border-right: .6px solid rgba(172, 172, 172, 0.671);
}

.transac-product img{
  height: 100px;
  width: auto;
}

.product-name{
  color: rgb(33, 182, 22);
  font-weight: 600;
}

.price{
  text-align: left;
  font-size: 15px;
  color: #FF6535;
}

.qty{
  text-align: left;
  font-size: 12px;
}

.total-harga{
  padding: 30px;
}
</style>
