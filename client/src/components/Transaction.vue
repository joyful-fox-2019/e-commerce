<template>
  <div>
      <h1>ini laman transactions</h1>
        <h2>{{allTransactions}}</h2>
  </div>
</template>

<script>
export default {
    computed : {
        allTransactions() {
            return this.$store.state.userTransactions
        }
    }
}
</script>

<style>

</style>