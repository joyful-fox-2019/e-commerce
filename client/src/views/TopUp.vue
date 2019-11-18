<template>
  <div class="topup">
      <h1>Top Up HackPay</h1>
        <v-form>
          <v-text-field  v-model="amount" label="Amount" type="number" required :rules="amountRules"></v-text-field>
          <v-btn type="submit" color="success" @click.prevent="topup" block>Top Up</v-btn>
        </v-form>
  </div>
</template>

<script>
import instance from '../connection/axios'
import axiosErrorHandler from '../connection/axiosErrorHandler'

export default {
  name: 'topup',
  data () {
    return {
      amount: 0,
      amountRules: [
        (v) => v > 0 || 'Amount should greater than 0',
        (v) => !!Number(v) || 'Amount should be a number'
      ]
    }
  },
  methods: {
    topup () {
      let data = {
        hackpay: this.$store.state.loginUser.hackpay + Number(this.amount)
      }
      instance({
        method: 'PATCH',
        url: '/users',
        data
      })
        .then(({ data }) => {
          this.$store.commit('SET_USER', data)
          this.$store.commit('SHOW_SNACKBAR', {
            text: 'Top Up Success'
          })
          this.$router.push('/')
        })
        .catch(err => {
          axiosErrorHandler(err)
        })
    }
  }
}
</script>
