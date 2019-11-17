<template>
  <div class="SignIn">
    <Navbar/>
      <br>
      <br>
      <br>
      <br>
      <h2 style="text-align: center;">Add Item</h2>
      <br>
      <div class="container mr-6 ml-6">
    <b-form @submit="addItem" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Name" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="Enter name of item"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Description" label-for="input-2">
        <b-form-textarea
          id="input-3"
          v-model="form.description"
          required
          placeholder="Enter description"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="input-group-3" label="Price" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.price"
          required
          placeholder="Enter price"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Stock" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.stock"
          required
          placeholder="Enter stock"
        ></b-form-input>
      </b-form-group>
      <b-form-file
      v-model="form.image"
      :state="Boolean(form.image)"
      placeholder="Choose a image or drop it here..."
      drop-placeholder="Drop image here..."
      ></b-form-file>
      <b-button type="submit" @click.prevent="addItem" variant="dark">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
      </div>
  </div>
</template>

<script>
import myAxios from '@/configs/myAxios.js'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'AddItem',
  components: {
    Navbar
  },
  data () {
    return {
      form: {
        name: '',
        description: '',
        price: '',
        stock: '',
        image: null
      },
      show: true
    }
  },
  methods: {
    // onSubmit (evt) {
    //   evt.preventDefault()
    // },
    addItem () {
      let bodyForm = new FormData()
      bodyForm.append('name', this.form.name)
      bodyForm.append('description', this.form.description)
      bodyForm.append('image', this.form.image)
      bodyForm.append('price', this.form.price)
      bodyForm.append('stock', this.form.stock)
      // console.log(bodyForm.get('image'))
      console.log(localStorage.getItem('token'))
      myAxios({
        method: 'post',
        url: 'click/items',
        headers: {
          token: localStorage.getItem('token')
        },
        data: bodyForm
      })
        .then(({ data }) => {
          console.log(data)
          this.$swal('success',data.message,'succes')
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.description = ''
      this.form.price = ''
      this.form.stock = ''
      this.form.image = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
