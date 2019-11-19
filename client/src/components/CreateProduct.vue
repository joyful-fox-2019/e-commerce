<template>
  <div class="d-flex justify-content-center">
      <form @submit.prevent="createProduct()" class="card" style="min-height:500px" enctype="multipart/form-data">
          <label for="product">Product</label>
          <input type="text" placeholder="What's your product ?" v-model="product" class="form-control">
          <br>
          <label for="stock">Stock</label>
          <input type="text" placeholder="How many is your's stock ?" v-model="stock" class="form-control">
          <br>
          <label for="category">Category</label>
          <select v-model="category" class="form-control">
              <option>Food</option>
              <option>Electronic</option>
              <option>Hobby</option>
              <option>Gadget</option>
              <option>Sport</option>
              <option>Lifestyle</option>
              <option>Entertainment</option>
              <option>Carpentry</option>
          </select>
          <br>
          <label for="price">Price</label>
          <input type="text" placeholder="What's your Price ?" v-model="price" class="form-control">
          <br>
          <div class="custom-file">
            <input @change="previewImage" id="input-file" type="file" class="custom-file-input" />
            <label class="custom-file-label" for="validatedCustomFile"></label>
          </div>
          <div class="image-preview mt-2" v-if="imageData.length > 0">
              <img class="preview" :src="imageData" style="max-width: 360px; max-height: 240px; ">
          </div>
          <input type="submit" class="mt-3 btn" value="Create" style="background-color:#aeddb198; color:#f6f6f6; cursor:pointer;">
      </form>
  </div>
</template>

<script>
import Axios from 'axios'
import swal from 'sweetalert2'
export default {
  data: () => {
    return {
      product: '',
      category: '',
      stock: 0,
      price: 0,
      imageData: '',
      formCreatePdf: {
        pdf: ''
      },
      url: ''
    }
  },
  methods: {
    createProduct () {
      let { pdf } = this.formCreatePdf
      var bodyFormData = new FormData()
      bodyFormData.append('imageData', pdf)
      let payload = {
        product: this.product,
        price: this.price,
        category: this.category,
        stock: this.stock,
        pdf: this.formCreatePdf.pdf
      }
      console.log(payload)
      this.$store.dispatch('createProduct', payload)
      this.price = 0
      this.stock = 0
      this.product = ''
      this.category = ''
      this.imageData = ''
    },
    previewImage: function (event) {
      var input = event.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
      this.formCreatePdf.pdf = event.target.files[0]
    },
    uploadImage () {
      if (!this.formCreatePdf.pdf) {
        swal.fire({
          icon: 'error',
          title: 'failed to upload file ',
          text: 'Cannot be empty',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        swal.fire({
          title: 'wait a minute to upload data',
          allowOutsideClick: () => !this.$swal.isLoading()
        })
        swal.showLoading('wait a minute ')

        let { pdf } = this.formCreatePdf
        var bodyFormData = new FormData()
        bodyFormData.append('imageData', pdf)

        Axios({
          url: 'http://e-commerce-server.panji-h8.online/upload',
          method: 'POST',
          data: bodyFormData
        })
          .then(({ data }) => {
            swal.close()
            swal.fire({
              icon: 'success',
              title: 'successfully upload file',
              showConfirmButton: false,
              timer: 2000
            })
            this.imageData = data.imageData
          })
          .catch(err => {
            let message =
            (err.response && err.response.data && err.response.data.message) ||
            'error failed to upload file'
            swal.fire({
              icon: 'error',
              title: 'failed to upload file ',
              text: message,
              showConfirmButton: false,
              timer: 2000
            })
          })
      }
    }
  }
}
</script>

<style>

</style>
