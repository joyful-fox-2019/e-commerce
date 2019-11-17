<template>
  <div id="transactionPage">
    <div id="list">
      <div class="q-pa-md" style="max-width: 420px">
        <all-trans-list v-for="transaction in allTransactions" :key="transaction.i" :transaction="transaction" @trans="thisTrans"></all-trans-list>
      </div>
    </div>
    <div id="detail">
        <transaction-detail :thisTrans="which" @getAnother="getTrans"></transaction-detail>
    </div>
  </div>
</template>

<script>
import TransactionDetail from '@/components/TransactionDetail'
import AllTransList from '@/components/AllTransList.vue'
import { mapState } from 'vuex'


export default {
  name: 'transactions',
  components: {
    TransactionDetail,
    AllTransList
  },
  data(){
    return {
    which: {}
    }
  },
  methods: {
    thisTrans(trans){
      this.which = trans
    },
    getTrans(){
      this.which = {}
    }
  },
  computed: {
    ...mapState('transactions',[
      'allTransactions'
    ])
  },
  created(){
    this.$emit('bukanhome',false)
  }
}
</script>

<style>
#transactionPage{
  display:flex;
  flex-direction: row
}
#list{
  width: 370px !important;
}
</style>