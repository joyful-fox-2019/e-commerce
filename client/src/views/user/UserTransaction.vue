<template>
  <div id="transactionPage">
      <div class="q-pa-md" style="max-width: 420px" id="list">
        <user-trans-list v-for="transaction in userTransactions" :key="transaction.i" :transaction="transaction" @trans="thisTrans"></user-trans-list>
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
  max-height: 96vh;
  overflow: scroll;
  overflow-x: hidden;
  margin-top: 10px
}
</style>