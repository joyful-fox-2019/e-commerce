<template>
  <div class="Cart">
      <Navbar/>
      <br>
      <br>
      <br>
      <br>
      <h2 style="text-align: center;">Transaction History</h2>
      <br>
      <div class="container">
        <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Price per Item</th>
            <th scope="col">Price Total</th>
            <th scope="col">Qty</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart) in carts" :key="cart.id">
            <th scope="row">{{ cart.itemId.name }}</th>
            <td>{{ cart.itemId.price }}</td>
            <td>{{ cart.subPrice }}</td>
            <td>{{ cart.qty }}</td>
            <td>
            <button type="button" @click="deleteCart(cart._id)" class="btn btn-secondary mr-1">Delete</button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import myAxios from '@/configs/myAxios.js'

export default {
  name: 'Transaction',
  components: {
    Navbar
  },
  data () {
    return {
      carts: [],
      id: ''
    }
  },
  methods: {
    fetchCart () {
      myAxios({
        method: 'get',
        url: '/click/carts/user/history',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.carts = data.carts
          console.log(data.carts)
        })
        .catch(console.log)
    },
    deleteCart (id) {
      myAxios({
        method: 'delete',
        url: `/click/carts/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data.message)
          this.fetchCart()
        })
        .catch(console.log)
    },
    saveId (id) {
      this.id = id
    }
  },
  created () {
    this.fetchCart()
  }

}
</script>

<style scoped>
.modal-content {
  top: 30vh !important;
}
</style>
