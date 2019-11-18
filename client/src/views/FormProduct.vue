<template>
  <div id="product" style="margin: 30px 0;">
    <div class="container is-fluid">
      <form @submit.prevent="submitProduct">
        <div class="columns">
          <div class="column is-one-third">
            <section>
              <b-field>
                  <b-upload v-model="images"
                      multiple
                      drag-drop>
                      <section class="section">
                          <div class="content has-text-centered">
                              <p>
                                  <b-icon
                                      icon="upload"
                                      size="is-large">
                                  </b-icon>
                              </p>
                              <p>Drop your product images here</p>
                          </div>
                      </section>
                  </b-upload>
              </b-field>

              <div class="tags">
                  <span v-for="(file, index) in images"
                      :key="index"
                      class="tag is-primary" >
                      {{file.name}}
                      <button class="delete is-small"
                          type="button"
                          @click="deleteDropFile(index)">
                      </button>
                  </span>
              </div>
          </section>
          </div>
          <div class="column">
            <section>
              <b-field label="Product Name">
                <b-input v-model="name" required></b-input>
              </b-field>

              <strong>Price</strong>
              <b-field>
                <br>
                <p class="control">
                  <span class="button is-static">Rp</span>
                </p>
                <b-input v-model="price" type="number" placeholder="0.000" style="width: 100%" required></b-input>
              </b-field>

              <strong>Stock</strong>
              <b-field>
                <b-numberinput v-model="stock" style="width: 30%" required></b-numberinput>
              </b-field>

              <b-field label="Category">
                <b-select v-model="category" placeholder="Select product category" required>
                  <option value="Computer">Computer</option>
                  <option value="Laptop">Laptop</option>
                  <option value="VGA">VGA</option>
                  <option value="Memory">Memory</option>
                  <option value="RAM">RAM</option>
                </b-select>
              </b-field>
              <button type="submit" class="button is-info">Create Product</button>
            </section>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormProduct',
  data () {
    return {
      name: '',
      price: 0,
      stock: 0,
      category: '',
      images: []
    }
  },
  methods: {
    deleteDropFile (index) {
      this.images.splice(index, 1)
    },
    submitProduct () {
      this.$store
        .dispatch('addProduct', {
          name: this.name,
          price: this.price,
          stock: this.stock,
          category: this.category,
          images: this.images
        })
        .then(data => {
          this.$store.state.Toast.fire({
            icon: 'success',
            title: 'Successfully create product'
          })
          this.$router.push('product-manager')
          this.name = ''
          this.price = 0
          this.stock = 0
          this.category = ''
          this.images = []
        })
        .catch(({ data }) => {
          data.message.forEach(errMsg => {
            this.$store.state.Toast.fire({
              icon: 'error',
              title: errMsg
            })
          })
        })
    }
  },
  created () {
    if (this.$route.params.id) {
      this.$store
        .dispatch('getProductId', {
          id: this.$route.params.id
        })
        .then(data => {
          this.name = data.name
          this.price = data.price
          this.stock = data.stock
          this.images = data.images
        })
        .catch(({ data }) => {
          data.message.forEach(errMsg => {
            this.$store.state.Toast.fire({
              icon: 'error',
              title: errMsg
            })
          })
        })
    }
  }
}
</script>

<style>

</style>
