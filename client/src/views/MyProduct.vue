<template>
  <div class="mt-4">
    <b-row>
      <b-col
        cols="6"
        style="border-right:1px solid rgba(0,0,0,.1);"
        class="d-flex justify-content-center flex-wrap"
      >
        <div v-for="game in games" :key="game._id">
          <b-card
            :title="game.title"
            :img-src="game.image"
            :img-alt="game.title"
            img-top
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-button
              class="mx-2"
              href="#"
              @click.prevent="onDelete(game._id)"
              variant="danger"
            >Delete</b-button>
            <b-button class="mx-2" href="#" @click.prevent="onEdit(game._id)" variant="info">Edit</b-button>
          </b-card>
        </div>
      </b-col>
      <b-col>
        <router-view :key="$route.fullPath"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from '../helpers/axios'
import Swal from 'sweetalert2'

export default {
  name: 'MyProduct',
  methods: {
    onEdit (gameId) {
      this.$router.push(`/product/edit/${gameId}`)
    },
    onDelete (gameId) {
      console.log(gameId)
      axios({
        method: 'delete',
        url: `/products/${gameId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            title: 'Game deleted!',
            icon: 'success'
          })
          this.$store.commit('getMyGame')
        })
        .catch(err => {
          Swal.fire('Error', err, 'error')
        })
    }
  },
  computed: {
    games () {
      return this.$store.state.games
    }
  },
  created () {
    this.$store.commit('getMyGame')
  }
}
</script>

<style>
</style>
