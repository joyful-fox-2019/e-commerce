<template>
  <div class="overflow-auto">
    <div class="d-flex justify-content-center my-3">
      <h3 class="font-weight-bold">Add New Product</h3>
    </div>
    <div class="row no-gutters border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
        <div>
          <img
          style="object-fit:contain"
          :src="this.image"
          alt="Card image cap" width="400" height="300">
        </div>
        <div class="col p-2 d-flex flex-column position-static">
        <form @submit.prevent="addProduct">
          <div>
            <b-form-file
              v-model="file"
              :state="Boolean(file)"
              @change="previewFile"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <button @click.prevent="upload" class="btn btn-info my-2">Upload</button>
          </div>
          <div class="form-group mt-3">
            <label for="productName">Product Name</label>
            <input v-model="name" type="text" class="form-control" id="productName" placeholder="Enter Product Name">
          </div>
          <div class="form-group">
            <label for="productDescription">Product Description</label>
            <input v-model="description" type="text" class="form-control" id="productDescription" placeholder="Enter Product Description">
          </div>
          <div class="form-group">
            <label for="productPrice">Product Price</label>
            <input v-model="price" type="number" min="0" class="form-control" id="productPrice" placeholder="Enter Product Price">
          </div>
          <div class="form-group">
            <label for="productStock">Product Stock</label>
            <input v-model="stock" type="number" min="0" class="form-control" id="productStock" placeholder="Enter Product Stock">
          </div>
          <button type="submit" class="btn btn-primary my-3">Add Product</button>
        </form>
        </div>
        <div>
            <button @click="close" class="btn btn-link">close</button>
        </div>
      </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../../myaxios/axios'
export default {
  props: ['user'],
  data () {
    return {
      name: '',
      description: '',
      price: '',
      stock: '',
      file: null,
      image: 'http://www.stylemefancy.com/wp-content/themes/pinnace12/assets/images/no-thumbnail-medium.png',
      formUploadImg: {
        img: ''
      }
    }
  },
  methods: {
    close () {
      this.$emit('statusAdd', false)
      this.$router.push('/myProducts')
    },
    previewFile (event) {
      this.formUploadImg.img = event.target.files[0]
    },
    upload () {
      let { img } = this.formUploadImg
      let bodyFormData = new FormData()
      if (this.formUploadImg.img !== '') {
        Swal.fire({
          title: 'wait a moment to upload data',
          allowOutsideClick: () => !Swal.isLoading()
        })
        Swal.showLoading('wait a minute ')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No Image Selected'
        })
      }
      bodyFormData.append('image', img)
      axios.post('/users/upload', bodyFormData,
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.image = data.link
          Swal.close()
          Swal.fire({
            icon: 'success',
            title: 'Image Uploaded'
          })
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    addProduct () {
      axios.post('/users', {
        name: this.name,
        description: this.description,
        image: this.image,
        price: this.price,
        stock: this.stock,
        seller: this.user.username
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: `${data.data.name} succesfully added`
          })
          this.name = ''
          this.description = ''
          this.image = 'http://www.stylemefancy.com/wp-content/themes/pinnace12/assets/images/no-thumbnail-medium.png'
          this.price = ''
          this.stock = ''
          this.seller = ''
          this.formUploadImg.img = ''
          this.file = ''
          this.$emit('getOwnProducts')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message.join('\n')
          })
        })
    }
  }
}
</script>

<style>

</style>
