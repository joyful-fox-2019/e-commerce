<template>
  <div class="topay">
    <v-toolbar>
      <v-toolbar-title>To Pay</v-toolbar-title>
    </v-toolbar>
       <v-flex v-for="(orderItem) in listOrder" :key="orderItem._id" align-center >
          <OrderItem
            :transactionItem="orderItem"
            :orderId="orderItem._id"
            :status="'topay'"/>
        </v-flex>
  </div>
</template>
<script>
import OrderItem from '../components/OrderItem'

export default {
  computed: {
    listOrder () {
      return this.$store.state.orders.filter(obj => obj.status === 'topay')
    }
  },
  components: {
    OrderItem
  }
}
</script>
