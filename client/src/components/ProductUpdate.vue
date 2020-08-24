<template>
  <div class="container">
    <section>
      <b-field>
        <b-input
          placeholder="Name"
          type="search"
          icon-pack="fas"
          icon="heading"
          size="is-medium"
          rounded
          v-model="name"
        ></b-input>
      </b-field>

      <b-field>
        <b-input
          placeholder="Price"
          type="search"
          icon-pack="fas"
          icon="dollar-sign"
          size="is-medium"
          rounded
          v-model="price"
        ></b-input>
      </b-field>

      <b-field class="file">
        <b-upload v-model="file">
          <a class="button is-white">
            <b-icon icon="upload"></b-icon>
            <span>Upload Image Source</span>
          </a>
        </b-upload>
        <span class="file-name" v-if="file">{{ file.name }}</span>
      </b-field>

      <b-field>
        <b-input
          v-model="description"
          maxlength="200"
          type="textarea"
          placeholder="Product description"
        ></b-input>
      </b-field>

      <b-field>
        <b-input
          placeholder="Stock"
          type="search"
          icon-pack="fas"
          icon="cubes"
          size="is-medium"
          v-model="stock"
          rounded
        ></b-input>
      </b-field>

      <b-button @click="updateProduct" type="is-light">Update</b-button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ProductUpdate',
  data () {
    return {
      name: '',
      price: '',
      file: null,
      description: '',
      stock: 0
    }
  },
  methods: {
    updateProduct () {
      const id = this.$route.params.id

      if (this.file) {
        let formData = new FormData()
        formData.append('name', this.name)
        formData.append('price', this.price)
        formData.append('description', this.description)
        formData.append('stock', this.stock)
        formData.append('imageSource', this.file)

        this.axios
          .patch(`/products/${id}/gcs`, formData, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({ data }) => {
            console.log(data, 'update new productttt')
            this.$router.push('/collections')
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        let body = {
          name: this.name,
          price: this.price,
          description: this.description,
          stock: this.stock
        }

        this.axios
          .patch(`/products/${id}`, body, {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({ data }) => {
            console.log(data, 'update new productttt')
            this.$router.push('/collections')
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style>
</style>
