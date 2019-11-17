<template>
  <div id="transactionPage">
    <div id="list">
      <div class="q-pa-md" style="max-width: 420px">
        <user-trans-list v-for="transaction in userTransactions" :key="transaction.i" :transaction="transaction" @trans="thisTrans"></user-trans-list>
      </div>
    </div>
    <div id="detail">
        <transaction-detail :thisTrans="which"></transaction-detail>
    </div>
  </div>
</template>

<script>
import TransactionDetail from '@/components/TransactionDetail'
import UserTransList from '@/components/UserTransList.vue'
import { mapState } from 'vuex'


export default {
  components: {
    TransactionDetail,
    UserTransList
  },
  data(){
    return {
    which: {}
    }
  },
  methods: {
    thisTrans(trans){
      this.which = trans
    }
  },
  computed: {
    ...mapState('transactions',[
      'userTransactions'
    ])
  },
  created(){
    
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
#detail{
}
</style>