<template>
  <b-card
    :title="currentGame.title"
    :img-src="currentGame.image"
    :img-alt="currentGame.title"
    img-top
    style="width: 50%; margin:auto"
    class="mt-4"
  >
    <b-card-text>Desc: {{currentGame.description}}</b-card-text>
    <b-card-text>Genre: {{currentGame.genre}}</b-card-text>
    <b-card-text>Stock: {{currentGame.stock}}</b-card-text>
    <b-card-text>Price: {{currentGame.price}}</b-card-text>
    <b-button href="#" variant="success" @click.prevent="onAddCart">Add to cart</b-button>
  </b-card>
</template>

<script>
import axios from '../helpers/axios'
import Swal from 'sweetalert2'

export default {
  name: 'DetailProduct',
  data () {
    return {
      currentGame: {}
    }
  },
  methods: {
    onAddCart () {
      axios({
        method: 'patch',
        url: `/products/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          return this.$store.dispatch('getCart')
        })
        .then(response => {
          Swal.fire({
            title: 'Added to cart!',
            icon: 'success'
          })
        })
        .catch(err => {
          Swal.fire('Error', err, 'error')
        })
    }
  },
  created () {
    axios({
      method: 'get',
      url: `/products/${this.$route.params.id}`
    }).then(({ data }) => {
      this.currentGame = data
    })
  }
}
</script>

<style>
</style>
