<template>
  <div class="trx-card m-2">
    <div  class="trx-item flex w-full items-center shadow-lg p-4 border border-gray-300" :class="buttonName.length>0 ? 'bg-yellow-100': ''">
      <h1>{{transaction.owner.name}}</h1>
      <div  class="item-image w-1/4 flex-column justify-center items-center">
        <div v-for="item in transaction.items" :key="item.product._id" class="item-image flex justify-center items-center">
            <div class="w-full font-bold m-4">{{item.product.name}}</div>
          <div class="img w-full">
            <img  :src="item.product.image" alt="image" class="w-20 m-2">
          </div>
            <div class="w-full mx-4 my-2">
              {{ usdFormat( item.product.price ) }}
              <br/>
              {{ item.qty }} pcs
            </div>
        </div>
      </div>
      <div class="item-info w-1/2 flex justify-between items-center m-4">
        <div>Date: <br>{{ new Date(transaction.createdAt).toLocaleString() }}</div>
        <div>Total: <br> {{ usdFormat(subTotal(transaction.items) )}}</div>
        <div>Status: <br> {{ transaction.status}}</div>
      </div>
        <div class="item-action w-1/4 flex justify-center ">
          <button class="bg-gray-800 m-2 text-white" :class="buttonStyle" @click="updateStatus({status: transaction.status, id: transaction._id })">{{ button(transaction.status) }}</button>
          <p v-if="buttonName.length === 0">Waiting..</p>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'transactionCard',
  props: ['transaction'],
  data () {
    return {
      buttonName: '',
      buttonStyle: ''
    }
  },
  methods: {
    usdFormat (val) {
      return (val).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    },
    subTotal (items) {
      let price = 0
      items.forEach(item => {
        price += (item.qty * item.product.price)
      })
      return price
    },
    button (val) {
      if (this.isAdmin) {
        switch (val) {
          case 'paid':
            this.buttonName = 'send'
            return this.buttonName
          case 'accepted':
            this.buttonName = 'finish'
            return this.buttonName
          default:
            this.buttonName = ''
            return this.buttonName
        }
      } else {
        switch (val) {
          case 'pending':
            this.buttonName = 'pay'
            return this.buttonName
          case 'delivered':
            this.buttonName = 'accept'
            return this.buttonName
          case 'finish':
            this.buttonName = ''
            return this.buttonName
          default :
            this.buttonName = ''
            return this.buttonName
        }
      }
    },
    updateStatus (payload) {
      let update = ''

      switch (payload.status) {
        case 'pending':
          update = 'paid'
          break
        case 'paid':
          update = 'delivered'
          break
        case 'delivered':
          update = 'finish'
          break
        case 'finish':
          update = 'finish'
          break
      }
      this.$store.dispatch('updateTransaction', { status: update, id: payload.id })
        .then(({ data }) => {
          this.$notify({ type: 'success', title: data.message })
          // this.buttonName = ''
          // this.buttonStyle = ''
          this.$store.dispatch('fetchTrx')
        })
        .catch(({ response }) => {
          this.$notify({ type: 'error', title: response.data.message })
        })
    }
  },
  computed: {
    ...mapState(['isAdmin'])
  },
  watch: {
    buttonName () {
      let result = 'hover-bg-gray-600 px-4 py-2'
      if (this.buttonName === '') {
        result = ''
      }
      if (this.buttonName === 'finish') {
        result = 'disabled p-2'
      }
      this.buttonStyle = result
    }
  }
}
</script>

<style>

</style>
