<template>
  <div class="tosend">
    <v-toolbar>
      <v-toolbar-title>To Pay</v-toolbar-title>
    </v-toolbar>
       <v-flex v-for="(orderItem) in listOrder" :key="orderItem._id" align-center >
          <OrderItem
            :transactionItem="orderItem"
            :orderId="orderItem._id"
            :status="'tosend'"/>
        </v-flex>
  </div>
</template>

<script>
import OrderItem from '../components/OrderItem.vue'

export default {
  computed: {
    listOrder () {
      return this.$store.state.orders.filter(obj => obj.status === 'pendingpayment')
    }
  },
  components: {
    OrderItem
  }
}
</script>
