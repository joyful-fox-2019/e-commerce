<template>
  <div>
    <div id="bannerTransaction" style="height:50vh" class="jumbotron rounded-0 m-0 text-center">
        <div class="container text-white">
          <h1 class="jumbotron-heading font-weight-bold">MY TRANSACTIONS</h1>
          <div class="d-flex justify-content-center">
          </div>
        </div>
      </div>
      <div class="container" v-if="role === 'buyer'">
        <h1 class="text-center font-weight-bold">My Purchased Transaction</h1>
        <div v-if="buyerTransactions.length>0">
          <Purchased
          v-for="purchased in buyerTransactions" :key="purchased._id"
          :purchased="purchased"
          @getTransactionsBuyer="getTransactionsBuyer"
          />
        </div>
        <div v-else class="d-flex justify-content-center" style="background-color:grey; height:35vh">
          <h1 class="align-self-center text-white font-weight-bold">No Purchased Transactions Yet</h1>
        </div>
      </div>
      <div class="container" v-else>
        <h1 class="text-center font-weight-bold">My Sold Transaction</h1>
        <div v-if="sellerTransactions.length>0">
          <Sold
          v-for="sold in sellerTransactions" :key="sold._id"
          :sold="sold"
          />
        </div>
        <div v-else class="d-flex justify-content-center" style="background-color:grey; height:35vh">
          <h1 class="align-self-center text-white font-weight-bold">No Sold Transactions Yet</h1>
        </div>
      </div>

  </div>
</template>

<script>
import Purchased from '@/components/Purchased'
import Sold from '@/components/Sold'
export default {
  props: ['buyerTransactions', 'sellerTransactions', 'role'],
  components: {
    Purchased,
    Sold
  },
  methods: {
    getTransactionsBuyer () {
      this.$emit('getTransactionsBuyer')
    }
  },
  created () {
    if (this.role === 'seller') {
      this.$emit('getTransactionsSeller')
    } else {
      this.$emit('getTransactionsBuyer')
    }
  }
}
</script>

<style>
  #bannerTransaction{
      background:linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(http://quantumtrainings.com/wp-content/uploads/2019/05/bg-banner-negotiation.jpg);
      background-size:cover;
      background-position: center;
  }
</style>
