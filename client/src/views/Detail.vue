<template>
  <div class="overflow-auto" style="height:50vh">
    <div class="row no-gutters border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
        <div>
        <img
        style="object-fit:contain"
        :src="detailProduct.image"
        alt="Card image cap" width="400" height="300">
        </div>
        <div class="col m-5 p-5 d-flex flex-column align-items-center">
          <div class="align-self-start">
            <h3 class="mb-2">Product Name : {{detailProduct.name}}</h3>
            <p><strong class="mb-2">Price : {{detailProduct.price}}</strong></p>
            <p><strong class="mb-2">Stock : {{detailProduct.stock}}</strong></p>
            <p class="mb-2">Description : {{detailProduct.description}}</p>
            <div class="mb-1 text-muted">Seller : {{detailProduct.seller}}</div>
          </div>
          <button v-if="role==='buyer'" @click="toCart(detailProduct._id)" class="btn btn-info w-75 align-self-center">Add to Cart</button>
        </div>
        <div>
            <button @click="toHome" class="btn btn-link">close</button>
        </div>

      </div>
  </div>
</template>

<script>
import axios from '../../myaxios/axios'
import Swal from 'sweetalert2'
export default {
  props: ['detailProduct', 'role'],
  methods: {
    toHome () {
      this.$router.push('/')
    },
    toCart (id) {
      axios.patch('products/add/' + id, {},
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Successfully Add to Cart',
            text: `${this.detailProduct.name} added to your cart`
          })
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
