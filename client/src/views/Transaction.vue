<template>
  <div class="my-10 p-2 shadow w-2/3 mx-auto">
    <h1>
    Transactions
    </h1>
    <TransactionCard v-for="trx in transactions" :key="trx._id" :transaction="trx"></TransactionCard>
  </div>
</template>

<script>
import TransactionCard from '../components/TransactionCard'
import { mapState } from 'vuex'
export default {
  components: {
    TransactionCard
  },
  computed: {
    ...mapState(['transactions'])
  },
  created () {
    this.$store.dispatch('fetchTrx')
  }
}
</script>

<style scoped>
  h1 {
    font-size: 20px;
    font-weight: bolder;
  }
</style>
