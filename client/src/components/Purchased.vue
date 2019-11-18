<template>
  <div>
    <ul class="list-group mb-3">
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Transaction Id</h6>
        </div>
        <span class="text-success">{{purchased._id}}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Total Cost</h6>
        </div>
        <span class="text-success">{{purchased.total}}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div class="w-100">
          <h6 class="my-0">Item Purchased</h6>
          <div class="d-flex justify-content-between" v-for="item in purchased.Products" :key="item._id">
            <small class="text-muted p-1">product : {{item.name}}</small>
            <small class="text-muted p-1">cost : {{item.cost}}</small>
          </div>
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Sellers </h6>
          <div class="d-flex justify-content-between" v-for="item in purchased.Products" :key="item._id">
            <small class="text-muted p-1">name : {{item.seller}}</small>
          </div>
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Date Purchased</h6>
        </div>
        <span class="text-success">{{date}}</span>
      </li>
      <li class="list-group-item d-flex justify-content-between">
        <span>Status</span>
        <strong class="text-success" v-if="purchased.status">Delivered</strong>
        <div v-else>
          <strong class="text-warning px-2" >Not yet delivered</strong>
          <button @click="changeStatus(purchased._id)" class="btn btn-sm btn-warning px-2">Change Status</button>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import axios from '../../myaxios/axios'
import Swal from 'sweetalert2'
export default {
  props: ['purchased'],
  methods: {
    changeStatus (id) {
      Swal.fire({
        title: 'Change Status do Delivered',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          axios.patch('/transactions/' + id, {}, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({ data }) => {
              Swal.fire({
                icon: 'success',
                title: 'Change Status to Delivered',
                text: `Thank you for the confirmation`
              })
              this.$emit('getTransactionsBuyer')
            })
            .catch(err => {
              console.log(err.response.data.message)
            })
        }
      })
    }
  },
  computed: {
    date () {
      Date.prototype.toISODate = function () {
        return this.getFullYear() + '-' +
                 ('0' + (this.getMonth() + 1)).slice(-2) + '-' +
                 ('0' + this.getDate()).slice(-2)
      }
      return new Date(this.purchased.date).toISODate()
    }
  }
}
</script>

<style>

</style>
