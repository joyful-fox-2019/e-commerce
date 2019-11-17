<template>
  <div class="Cart">
      <Navbar/>
      <br>
      <br>
      <br>
      <br>
      <h2 style="text-align: center;">Cart</h2>
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
            <button type="button" class="btn btn-secondary mr-1" data-toggle="modal" data-target="#editForm" @click="saveId(cart._id)">Edit</button>
            <button type="button" @click="trueCart(cart._id)" class="btn btn-secondary mr-1">Checkout</button>
            <button type="button" @click="deleteCart(cart._id)" class="btn btn-secondary mr-1">Delete</button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="editForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Quantity Item</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <form>
            <div class="form-group">
              <label>Quantity</label>
              <input type="number" class="form-control" v-model="qty">
            </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" @click="editQty" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import myAxios from '@/configs/myAxios.js'

export default {
  name: 'Cart',
  components: {
    Navbar
  },
  data () {
    return {
      carts: [],
      qty: '',
      id: ''
    }
  },
  methods: {
    fetchCart () {
      console.log(this.$store.state.user, '===========')
      myAxios({
        method: 'get',
        url: '/click/carts/user/pending',
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
    trueCart (id) {
      myAxios({
        method: 'put',
        url: `/click/carts/${id}`,
        data: {
          status: true
        },
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
    editQty () {
      myAxios({
        method: 'put',
        url: `/click/carts/${this.id}`,
        data: {
          qty: this.qty
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.qty = ''
          console.log(data.message)
          this.fetchCart()
        })
        .catch(console.log)
        .always($('#editForm').modal('hide'))
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
