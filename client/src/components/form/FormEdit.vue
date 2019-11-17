<template>
    <div>
        <section>
        <form enctype="multipart/form-data" @submit.prevent="editProduct">
            <b-field horizontal label="Product Name" type="is-primary" message="Please enter a product name">
                <b-input v-model="name" name="name" expanded></b-input>
            </b-field>

            <b-field horizontal label="Description">
                <b-input v-model="description" type="textarea"></b-input>
            </b-field>

            <b-field horizontal label="Price">
                <b-input v-model="price" name="price" placeholder="Price" expanded></b-input>
            </b-field>

            <b-field horizontal label="Stock">
                <b-input v-model="stock" name="stock" placeholder="Stock" expanded></b-input>
            </b-field>

            <b-field horizontal label="Add some category">
          <b-taginput v-model="category" ellipsis icon="label" placeholder="Add a tag"></b-taginput>
        </b-field>

            <!-- <b-field horizontal class="file">
                <b-upload v-model="image">
                    <a class="button is-light">
                        <b-icon icon="upload"></b-icon>
                        <span>Click to upload</span>
                    </a>
                </b-upload>
                <span class="file-name" v-if="image">
                    {{ image.name }}
                </span>
            </b-field> -->

            <b-field horizontal>
                <p class="control">
                    <button @submit.prevent="editProduct" class="button is-primary">
                    Update
                    </button>
                </p>
            </b-field>
            </form>
        </section>
    </div>
</template>

<script>

export default {
  name: 'FormEditProduct',
  props: ['product'],
  data () {
    return {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      stock: this.product.stock,
      category: this.product.category,
      image: null,
      isFullPage: true
    }
  },
  methods: {
    editProduct () {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })

      let data = {
        name: this.name,
        description: this.description,
        price: this.price,
        stock: this.stock,
        category: this.category
      }

      let payload = {}
      payload.data = data
      payload.id = this.product._id

      this.$store.dispatch('editProduct', payload)
        .then(() => {
          this.$store.dispatch('getProduct')
          setTimeout(() => loadingComponent.close(), 1 * 1000)
          setTimeout(() => {
            this.$buefy.toast.open({
              message: `Edit product success...`,
              type: 'is-success'
            })
          }, 1200)
          this.$router.push(`/`)
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 1000)
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
