<template>
  <div class="container">
    <section>
         <b-field>
            <b-input placeholder="Name"
                type="search"
                icon-pack="fas"
                icon="heading"
                size="is-medium"
                rounded
                v-model="name"
                >
            </b-input>
        </b-field>

        <b-field>
            <b-input placeholder="Price"
                type="search"
                icon-pack="fas"
                icon="dollar-sign"
                size="is-medium"
                rounded
                v-model="price"
                >
            </b-input>
        </b-field>

        <b-field class="file">
          <b-upload v-model="file">
              <a class="button is-white">
                  <b-icon icon="upload"></b-icon>
                  <span>Upload Image Source</span>
              </a>
          </b-upload>
          <span class="file-name" v-if="file">
              {{ file.name }}
          </span>
        </b-field>

         <b-field>
            <b-input v-model="description" maxlength="200" type="textarea" placeholder="Product description"></b-input>
        </b-field>

        <b-field>
            <b-input placeholder="Stock"
                type="search"
                icon-pack="fas"
                icon="cubes"
                size="is-medium"
                v-model="stock"
                rounded
                >
            </b-input>
        </b-field>

<b-button @click="createProduct" type="is-light">Add Product</b-button>

    </section>
  </div>
</template>

<script>
export default {
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
    createProduct () {
      let body = new FormData()
      body.append('name', this.name)
      body.append('price', this.price)
      body.append('description', this.description)
      body.append('stock', this.stock)
      body.append('imageSource', this.file)

      this.axios.post('/products', body, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data, 'create new productttt')
          this.$router.push('/collections')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
