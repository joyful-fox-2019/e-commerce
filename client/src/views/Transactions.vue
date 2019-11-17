<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section class="bg-blue-grey-14 text-white">
        <div class="text-h6">Your Transactions</div>
      </q-card-section>

      <q-separator /> 
      <div v-if="dataTransactions.length != 0">
        <ListTransactions v-for="transactions in dataTransactions" :key=transactions._id :transactions=transactions />
      </div>
      <div v-else >
        <img alt="Quasar logo" class="center" src="../assets/logo.png" >
      </div>
      

    </q-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListTransactions from "../components/ListTransactions.vue";
import Swal from "sweetalert2";
export default {
  name:'Transactions',
  computed: {
    ...mapState({
      dataTransactions: state => state.dataTransactions
      }
    ),
  },
  methods:{
    
  },
  components: {
    ListTransactions
  },
  mounted () {
    this.$store.dispatch('transactions')
  }
}
</script>

<style lang="stylus" scoped>
  
.card-cart{
  width: 100%;
  max-width: 500px;
  border: solid 2px black;
}

</style>
