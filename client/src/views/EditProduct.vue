<template>
  <div>
    <p>Edit Product</p>
    <b-col cols="11 border" id="add-form">
      <b-form-group
        class="mt-4"
        label-cols="4"
        label-cols-lg="2"
        label="Title"
        label-for="input-default"
      >
        <b-form-input v-model="title" id="input-default" required></b-form-input>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="2" label="Desc" label-for="input-default">
        <b-form-textarea
          v-model="description"
          id="textarea-large"
          placeholder="some description about the game"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="2" label="Price" label-for="input-default">
        <b-form-input v-model="price" id="input-default" required></b-form-input>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="2" label="Stock" label-for="input-default">
        <b-form-input v-model="stock" id="input-default" required></b-form-input>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="2" label="Genre" label-for="input-default">
        <b-form-select v-model="genre" :options="options"></b-form-select>
      </b-form-group>

      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose an image as the game cover"
        drop-placeholder="Drop file here..."
      ></b-form-file>
      <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
      <br />
      <b-button
        @click.prevent="onSubmitEdit"
        class="mx-2 mb-4"
        type="submit"
        variant="primary"
      >Submit</b-button>
    </b-col>
  </div>
</template>

<script>
import axios from '../helpers/axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditProduct',
  data () {
    return {
      title: '',
      description: '',
      price: '',
      stock: '',
      genre: '',
      options: [
        { value: 'action', text: 'Action' },
        { value: 'adventure', text: 'Adventure' },
        { value: 'casual', text: 'Casual' },
        { value: 'indie', text: 'Indie' },
        { value: 'mmr', text: 'Massively Multiplayer' },
        { value: 'racing', text: 'Racing' },
        { value: 'rpg', text: 'RPG' },
        { value: 'simulation', text: 'Simulation' },
        { value: 'sports', text: 'Sports' },
        { value: 'strategy', text: 'Strategy' }
      ],
      file: null
    }
  },
  methods: {
    onSubmitEdit () {
      let formData = new FormData()
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('price', this.price)
      formData.append('stock', this.stock)
      formData.append('genre', this.genre)
      formData.append('file', this.file)
      axios({
        method: 'put',
        url: `/products/${this.$route.params.id}`,
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(({ data }) => {
          Swal.fire({
            title: 'Game updated!',
            icon: 'success'
          })
          this.$store.commit('getMyGame')
        })
        .catch(err => {
          Swal.fire('Error', err, 'error')
        })
    }
  },
  computed: {},
  created () {
    axios({
      method: 'get',
      url: `/products/${this.$route.params.id}`
    })
      .then(({ data }) => {
        this.title = data.title
        this.description = data.description
        this.price = data.price
        this.stock = data.stock
        this.genre = data.genre
      })
      .catch(err => {
        Swal.fire('Error', err, 'error')
      })
  }
}
</script>

<style>
</style>
