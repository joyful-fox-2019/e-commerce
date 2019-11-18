<template>
  <div>
    <h2 class="mt-5 mt-md-2 mb-4 text-light"> Post Game </h2>
    <form>
      <b-form-input required v-model="title" placeholder="Game Title"></b-form-input>
      <b-form-input required type="number" v-model="price" class="mt-3" placeholder="Price"></b-form-input>
      <b-form-input required type="number" v-model="qty" class="mt-3" placeholder="Quantity"></b-form-input>
      <b-form-file
        class="mt-3"
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a image or drop for game here..."
        drop-placeholder="Drop image here..."
      ></b-form-file>
      <b-button @click="postGame()" variant="dark" class="mt-3">Post Game</b-button>
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
      price: '',
      qty: '',
      file: null
    }
  },
  components: {

  },
  methods: {
    postGame () {
      Swal.showLoading()
      const formData = new FormData()
      formData.append('imgUrl', this.file)
      formData.append('name', this.title)
      formData.append('price', this.price)
      formData.append('qty', this.qty)
      //   formData.append('tags', this.tags === null ? '' : this.tags)

      axios({
        url: '/products',
        method: 'post',
        data: formData,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.successToast('Article Successfuly published!')
          this.$router.push({ path: `/admin/game-list` })
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    }
  },
  computed: {}
}
</script>
