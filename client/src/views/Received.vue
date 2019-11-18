<template>
  <div class="delivered">
    <v-toolbar>
      <v-toolbar-title>Delivered Order</v-toolbar-title>
    </v-toolbar>
       <v-flex v-for="(orderItem) in listOrder" :key="orderItem._id" align-center >
          <OrderItem
            :transactionItem="orderItem"
            :orderId="orderItem._id"
            :status="'delivered'"/>
        </v-flex>
  </div>
</template>

<script>
import OrderItem from '../components/OrderItem'
export default {
  computed: {
    listOrder () {
      return this.$store.state.orders.filter(obj => obj.status === 'delivered')
    }
  },
  components: {
    OrderItem
  }
}
</script>
