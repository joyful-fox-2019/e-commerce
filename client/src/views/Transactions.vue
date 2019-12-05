<template>
  <div>
    <div class="container">
      <v-row>
        <v-col lg="8" md="8" cols="12">
          <div class="header f-fancy">
            Transactions
          </div>
          <hr style="margin: 0;" class="mt-3">
          <Transaction v-for="transaction in transactions" :key="transaction._id" :transaction="transaction">
          </Transaction>
        </v-col>
        <v-col lg="4" md="4" cols="12">
          <router-view></router-view>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Transaction from '../components/Transaction'

export default {
  name: 'Transactions',
  components: {
    Transaction
  },
  methods: {
    getTransactions () {
      this.$store.dispatch('getTransactions')
    }
  },
  computed: mapState(['transactions']),
  created () {
    this.getTransactions()
  }
}
</script>

<style>
.header {
  font-size: 20px;
}
</style>
