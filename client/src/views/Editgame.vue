<template>
  <div>
    <h2 class="mt-5 mt-md-2 mb-4 text-white"> Edit Game </h2>
    <form enctype="multipart/form-data" @submit.prevent="updateData()">
      <b-form-input required v-model="title" placeholder="Game Title"></b-form-input>
      <b-form-input required type="number" v-model="price" class="mt-3" placeholder="Price"></b-form-input>
      <b-form-input required type="number" v-model="qty" class="mt-3" placeholder="Quantity"></b-form-input>
      <b-form-file
        class="mt-3"
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a image or drop for edit game here..."
        drop-placeholder="Drop image here..."
      ></b-form-file>
      <b-button @click="goBack" variant="secondary" class="mt-3 mr-2">Back</b-button>
      <b-button @click.prevent="updateData()" variant="dark" type="submit" class="mt-3 mr-2">Edit Game</b-button>
      <b-button @click="deleteGame()" variant="danger" class="mt-3 mr-2">Delete Game</b-button>
      <img :src="imgUrl" class="mt-3" width="100%">
    </form>
  </div>
</template>

<script>
import axios from '../config/getdata'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      title: '',
      imgUrl: '',
      price: 0,
      qty: 0,
      file: null
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    fetchDetailData () {
      this.$store.dispatch('getOneData', this.$route.params.id)
        .then(({ data }) => {
          console.log(data)
          this.title = data.name
          this.imgUrl = data.imgUrl
          this.price = data.price
          this.qty = data.qty
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    },
    updateData () {
      console.log('<<<<<<<<')
      Swal.showLoading()
      const formData = new FormData()
      if (this.file == null) {
        formData.append('imgUrl', this.imgUrl)
      } else {
        formData.append('imgUrl', this.file)
      }
      formData.append('name', this.title)
      formData.append('price', this.price)
      formData.append('qty', this.qty)
      // formData.append('tags', this.tags === null ? '' : this.tags)

      axios({
        method: 'patch',
        url: `/products/${this.$route.params.id}`,
        data: formData,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.successToast('Data succesfuly updated!')
          this.fetchDetailData()
          this.file = null
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    },
    deleteGame () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.showLoading()
          axios({
            method: 'delete',
            url: `/products/${this.$route.params.id}`,
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .then(({ data }) => {
              console.log(data)
              this.successToast('Data succesfuly deleted!')
              this.$router.push({ path: `/admin/game-list` })
            })
            .catch(err => {
              console.log(err.response.data)
              this.next(err.response.data)
            })
        }
      })
    }
  },
  computed: {

  },
  created () {
    this.fetchDetailData()
  }
}
</script>
