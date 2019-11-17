<template>
<div>
    <h3><v-icon name='user' class='vicon'></v-icon> &nbsp; Admin Page</h3>
    <div class="card">
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Biodata" active>
              <b-card-text class='cardProfile'>
                <div class="biodata">
                      <div class='nameBiodata'>
                          <div class="card" v-for='transaction in transactions' :key="transaction._id">
                            <div class="headCard" style='display: flex; flex-direction: row; justify-content: space-between'>
                              <div>
                              Transaction ID : {{ transaction._id }}
                              </div>
                                <div>
                                  <button class="btn-outline-success btn btn-md" @click='confirmTransaction(transaction._id)'>Confirm</button>
                                  <button class="btn-outline-danger btn btn-md" @click='declineTransaction(transaction._id)'>Decline</button>
                                </div>
                            </div>
                            <div v-for='product in transaction.ProductId' :key='product._id'>
                              <div class="bagi2" style='display: flex; justify-content: space-between'>
                                  <div class="imageProduct">
                                  <img :src="product.product_image" alt='product_image' style='width: 100px'>
                                </div>
                                <div>
                                  ProductId: {{product._id}} | Product Name: {{ product.name }}<br>
                                  Price: {{product.price}}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>

                          {{ transactions[0] }}
                          </div>
                    </div>
                  </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Tab 2">
              <b-card-text>Coming Soon</b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/apis/server.js'

export default {
  data() {
    return {
      transactions: []
    }
  },
  methods: {
    confirmTransaction (id) {
      axios({
        method: 'patch',
        url: `/transactions/confirm/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.$awn.success('success confrim transactions')
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    removeTransaction () {
      axios({
        method: 'patch',
        url: `/transactions/decline/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.$awn.success(data.msg)
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    fetchTransactions () {
      axios({
        method: 'get',
        url: '/transactions',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data)
          this.$awn.success('success get all transactions')
          data.transaction.forEach((el, i) => {
            if(!el.confirm) {
              this.transactions .push(el)
            }
          })
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  created () {
    this.fetchTransactions()
  }
}
</script>

<style scoped>
.card {
  color: black;
  overflow: auto !important;
  display: flex
}
</style>