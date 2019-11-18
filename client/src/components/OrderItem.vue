<template>
    <v-container fluid xs12>
      <v-layout  align-center justify-space-between row xs12 id="layout" >
        <h4>{{transactionItem.username}}</h4>
        <h4>
            {{getTotal}}
            <span>
                <v-btn @click="pay" v-if="status==='pendingpayment' && loginUser.role==='customer'">Pay Order</v-btn>
                <v-btn @click="send" v-if="status==='pendingdelivery' && loginUser.role==='admin'" >Send Product</v-btn>
                <v-btn @click="receive" v-if="status==='delivered' && loginUser.role==='customer'">Order Received</v-btn>
                <h4 v-if="status==='received'">Received</h4>
            </span>
        </h4>
      </v-layout>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import instance from '../connection/axios'
import axiosErrorHandler from '../connection/axiosErrorHandler'
import rupiahConverter from '../helper/rupiahConverter'

export default {
  props: ['status', 'orderId', 'transactionItem'],
  methods: {
    pay () {
      if (this.transactionItem.total > this.loginUser.hackpay) {
        this.$store.commit('SHOW_SNACKBAR', { text: 'Balance is not sufficient' })
      } else {
        let money = this.loginUser.hackpay - this.transactionItem.total
        instance({
          method: 'PATCH',
          url: '/users',
          data: {
            hackpay: money
          },
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            this.$store.commit('SET_USER', data)

            return instance({
              method: 'PATCH',
              url: '/transactions/' + this.orderId,
              data: {
                status: 'pendingpayment'
              }
            })
          })
          .then(({ data }) => {
            this.$store.dispatch('getOrders')
          })
          .catch(err => {
            axiosErrorHandler(err)
          })
      }
    },
    send () {
      instance({
        method: 'PATCH',
        url: '/transactions/' + this.orderId,
        data: {
          status: 'ondelivery'
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('getOrders')
        })
        .catch(err => {
          axiosErrorHandler(err)
        })
    },
    receive () {
      instance({
        method: 'PATCH',
        url: '/transactions/' + this.orderId,
        data: {
          status: 'delivered'
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('getOrders')
        })
        .catch(err => {
          axiosErrorHandler(err)
        })
    }
  },
  computed: {
    ...mapState(['loginUser']),
    getTotal () {
      return rupiahConverter(this.transactionItem.total)
    }
  }
}
</script>
