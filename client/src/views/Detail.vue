<template>
  <div class="overflow-auto" style="height:50vh">
    <div class="row no-gutters border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
        <div>
        <img
        style="object-fit:contain"
        :src="detailProduct.image"
        alt="Card image cap" width="400" height="300">
        </div>
        <div class="col p-2 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2">Price : {{detailProduct.price}}</strong>
          <strong class="d-inline-block mb-2">Stock : {{detailProduct.stock}}</strong>
          <h3 class="mb-0">{{detailProduct.name}}</h3>
          <div class="mb-1 text-muted">Seller : {{detailProduct.seller}}</div>
          <p class="mb-auto">{{detailProduct.description}}</p>
          <button @click="toCart(detailProduct._id)" class="btn btn-info w-75 align-self-center">Add to Cart</button>
        </div>
        <div>
            <button @click="toHome" class="btn btn-link">close</button>
        </div>

      </div>
  </div>
</template>

<script>
import axios from '../../myaxios/axios'
export default {
  props: ['detailProduct'],
  methods: {
    toHome () {
      this.$router.push('/')
    },
    toCart (id) {
      console.log('NI FUNSI TO CART')
      axios.patch('products/add/'+id,{},
      {
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        this.$emit('fetchCart')
      })
      .catch(err=>{
        console.log(err.response.data.message)
      })
    }
  }

}
</script>

<style>

</style>
