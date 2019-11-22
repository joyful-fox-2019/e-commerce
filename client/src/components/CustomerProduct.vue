<template>
  <div>
      <div class="container">
        <div class="d-flex justify-content-center" style="background-color: whitesmoke;">
            <h1>List Product</h1>
        </div>
        <div class="d-flex mt-3">
            <div class="card" v-for="(product,index) in products" :key="index">
                <img :src="product.imageUrl" class="card-img-top content" alt="card">
                <div class="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 class="card-title">{{ product.productName }}</h5>
                    <p class="card-text">{{ product.description }}</p>
                  </div>
                  <div>
                    <p class="card-text">Stock: {{ product.quantity }} pcs</p>
                    <p class="card-text">Price: Rp.{{ product.price }}</p>
                    <button class="btn btn-success mr-2" v-on:click.prevent="addToCart(product._id)">Add To Cart</button>
                  </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
  data () {
    return {}
  },
  methods: {
    addToCart (id) {
      Swal.fire({
        title: 'Add to your cart?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add product to cart!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('addCart', id)
        }
      })
    }
  },
  created () {
  },
  computed: {
    ...mapState(['products'])
  }
}
</script>

<style scoped>
.card{
    margin: 0px 5px;
    width: 18rem;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 4px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
}

.card:hover{
    box-shadow: 0 4px 8px 0 rgba(169, 138, 240, 0.514), 0 6px 20px 0 rgba(169, 138, 240, 0.514);
}

.content{
    height: 18rem;
    width: 100%;
}
</style>
