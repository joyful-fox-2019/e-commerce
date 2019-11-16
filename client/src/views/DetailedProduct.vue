<template>
<div>
  <div v-if="productDetailed && productDetailed.name">{{productDetailed}}</div>
  <div v-else>loading...</div>
  <!-- add to cart button tambahin ntr validasi ada/gak stock nya kl gak gbs di click -->
  <!-- kasi toast added to your cart, biar user bs browse belanjaan lain lg -->
  <button @click="addedToCart">add to cart</button>
</div>
</template>

<script>
// import { toast } from 'bulma-toast'

export default {
  name: 'detailedProduct',
  data () {
    return {
      productDetailed: {}
    }
  },
  methods: {
    fetchDetailedProduct () {
      const id = this.$route.params.id
      this.axios(`/products/${id}`)
        .then(({ data }) => {
          // console.log(data)
          this.productDetailed = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    addedToCart () {
      if (!localStorage.getItem('token')) {
        this.$buefy.toast.open({
          type: 'is-white',
          message: 'You have to login'
          })
      } else {
        this.$buefy.toast.open({
          type: 'is-white',
          message: 'Added to your cart'
          })
        this.axios('/carts')
          .then(({ data }) => {
            console.log(data)
          })
      }
    }
  },
  created () {
    this.fetchDetailedProduct()
  }
}
</script>

<style>

</style>
