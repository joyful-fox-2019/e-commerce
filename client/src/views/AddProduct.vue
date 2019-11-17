<template>
  <div class="mt-4">
    <b-container fluid>
      <b-form @submit.prevent="onSubmit">
        <b-row class="home">
          <b-col></b-col>
          <b-col cols="4 border" id="add-form">
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
            <b-button class="mx-2 mb-4" type="reset" @click.prevent="onReset" variant="danger">Reset</b-button>
            <b-button
              @submit.prevent="onSubmit"
              class="mx-2 mb-4"
              type="submit"
              variant="primary"
            >Submit</b-button>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import axios from '../helpers/axios'
import Swal from 'sweetalert2'

export default {
  name: 'AddProduct',
  data () {
    return {
      title: '',
      description: '',
      price: '',
      stock: '',
      genre: '',
      file: null,
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
      ]
    }
  },
  methods: {
    onReset () {
      this.title = ''
      this.description = ''
      this.price = ''
      this.stock = ''
      this.genre = ''
      this.file = null
    },
    onSubmit () {
      let formData = new FormData()
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('price', this.price)
      formData.append('stock', this.stock)
      formData.append('genre', this.genre)
      formData.append('file', this.file)

      axios({
        method: 'post',
        url: '/products',
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        },
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(({ data }) => {
          Swal.fire({
            title: 'Game added!',
            icon: 'success'
          })
          this.onReset()
        })
        .catch(err => {
          Swal.fire('Error', err, 'error')
        })
    }
  }
}
</script>

<style scoped>
#add-form {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
