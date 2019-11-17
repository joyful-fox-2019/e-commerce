<template>
  <div>
    <Navbar />
    <div class="container" style="min-height:100vh;margin-top: 50px; padding-bottom:100px;">
      <p class="title">Your Transaction</p>
      <div v-if="transactions.length > 0">
        <div v-for="(transaction, index) in transactions" :key="index" >
          <DetailTransaction :transaction="transaction" style="margin-bottom: 25px;"></DetailTransaction>
        </div>
      </div>
      <div v-else class="image">
        <img class="img" src="../assets/undraw_no_data_qbuo.svg" alt srcset />
        <div class="notFound">
          <i class="fas fa-exclamation-triangle"></i> Sorry Transactions not found!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import DetailTransaction from "../components/DetailTransaction";

export default {
  name: "Transaction",
  components: {
    Navbar,
    DetailTransaction
  },
  computed: {
    transactions: {
      get(){
        return this.$store.state.transactions
      }
    }
  },
  watch: {
    transactions(){}
  },
  created() {
    if(this.$store.state.isAdmin){
      this.$store.dispatch("getTransactionAdm");
    } else {
      this.$store.dispatch("getTransaction");
    }
  }
};
</script>
<style scoped>
.title {
  color: #c44173;
  font-size: 22px;
}
.image {
  margin: 50px auto;
  text-align: center;
}
.img {
  margin: 80px auto;
  width: 300px;
}
.notFound {
  font-size: 25px;
  color: #d71149;
}
</style>
