<template>
    <div class="col-md-4">
      <div class="card mb-4 box-shadow">
        <img class="card-img-top"
        style="object-fit:contain"
        :src="itemData.ProductId.image"
        alt="Card image cap" width="200" height="200">
        <div class="card-body overflow-auto" style="height:200px">
            <div>
                <h1>{{itemData.ProductId.name}}</h1>
            </div>
            <div>
                <p class="card-text">{{itemData.ProductId.description}}</p>
            </div>
        </div>
        <div class="d-flex justify-content-between px-3">
            <small class="text-muted">Price {{itemData.ProductId.price}}</small>
            <small class="text-muted font-weight-bold">Amount {{itemData.amount}}</small>
        </div>
        <div class="d-flex justify-content-center p-2">
          <p class="m-0">Sold By <span class="font-weight-bold">{{itemData.ProductId.seller}}</span></p>
        </div>
        <button @click="decreaseAmount(itemData.ProductId._id)" class="btn btn-danger w-75 align-self-center mb-2">Decrease amount</button>
      </div>
    </div>
</template>

<script>
import axios from '../../myaxios/axios'
import Swal from 'sweetalert2'
export default {
  props: ['itemData'],
  methods: {
    decreaseAmount (id) {
      axios.patch('/products/remove/' + id, {}, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          // console.log(data)
          console.log(this.itemData.amount, 'belom swal')
          if (this.itemData.amount <= 1) {
            console.log(this.itemData.amount, 'masuk swal')
            Swal.fire({
              icon: 'warning',
              title: 'Item removed from cart',
              text: `${this.itemData.ProductId.name} removed from your cart`
            })
          }
          this.$emit('fetchCart')
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    }
  }
}
</script>

<style>

</style>
