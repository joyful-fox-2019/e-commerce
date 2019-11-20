<template>
  <div class="container-fluid p-0">
    <Navbar/>
    <div class="container d-flex justify-content-center" style="width: 100%">
      <div class="mb-4" style="width: 100%">
        <div class="d-flex justify-content-center" style="font-size: 250%">
          Your Transactions
        </div>
        <!-- loop -->
        <TransactionCard v-for="transaction in transactions" :key="transaction._id" :transaction="transaction"/>

        
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import TransactionCard from '../components/TransactionCard.vue'

export default {
  components: {
    Navbar,
    TransactionCard
  },
  computed: {
    transactions(){
      return this.$store.state.transactions
    }
  },
  methods: {
    fetchTransactions(){
      this.$store.dispatch('fetchTransactions')
    }
  },
  created(){
    this.fetchTransactions()
  }
}
</script>

<style>

</style>