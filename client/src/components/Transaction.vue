<template>
  <v-row>
    <v-col lg="4">
      {{ transaction._id }}
    </v-col>
    <v-col class="t-primary" lg="4">
      <b>{{ transaction.status }}</b>
    </v-col>
    <v-col lg="3">
      IDR {{ transaction.total.toLocaleString() }}
    </v-col>
    <v-col lg="1">
      <v-icon @click="$router.push(`/transactions/${transaction._id}`)">mdi-eye</v-icon>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    transaction: Object,
    customer: Object
  }
}
</script>

<style>

</style>
