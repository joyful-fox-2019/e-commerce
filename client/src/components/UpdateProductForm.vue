<template>
  <div>
    <v-form @submit.prevent="updateProduct" v-model="valid">
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Title"
      required
      outlined
    ></v-text-field>
    <v-textarea
      v-model="description"
      label="Synopsis"
      auto-grow
      outlined
      rows="1"
      row-height="15"
    ></v-textarea>
    <!-- <v-file-input
      v-model="image"
      label="Cover Image"
      filled
      prepend-icon="mdi-camera"
      required
      outlined
    ></v-file-input> -->
    <v-text-field
      v-model="price"
      :rules="priceRules"
      label="Price"
      required
      outlined
      type="number"
    ></v-text-field>
    <v-text-field
      v-model="stock"
      :rules="stockRules"
      label="Stock"
      required
      outlined
      type="number"
    ></v-text-field>
    <v-menu
      ref="menu1"
      v-model="menu1"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateFormatted"
          label="Published Date"
          persistent-hint
          prepend-icon="mdi-calendar"
          @blur="date = parseDate(dateFormatted)"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
    </v-menu>
    <v-text-field
      v-model="writer"
      label="Writer"
      required
      outlined
    ></v-text-field>
    <v-text-field
      v-model="penciler"
      label="Penciler"
      required
      outlined
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      class="mt-4 full-width bg-primary"
      type="submit"
    >
      UPDATE COMIC
    </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    valid: false,
    name: '',
    nameRules: [
      v => !!v || 'Title is required'
    ],
    description: '',
    price: 100000,
    priceRules: [
      v => v > 0 || 'Price cannot be zero'
    ],
    stock: 1,
    stockRules: [
      v => v > 0 || 'Stock cannot be zero'
    ],
    image: null,
    writer: '',
    penciler: ''
  }),
  props: {
    product: Object
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    initiateValue () {
      console.log('initiated')
      const { name, description, price, stock, published, writer, penciler } = this.product
      this.name = name
      this.description = description
      this.price = price
      this.stock = stock
      this.dateFormatted = new Date(published).toISOString().substr(0, 10)
      this.writer = writer
      this.penciler = penciler
    },
    updateProduct () {
      let payload = {
        _id: this.product._id,
        name: this.name,
        description: this.description,
        price: Number(this.price),
        stock: Number(this.stock),
        published: this.dateFormatted,
        writer: this.writer,
        penciler: this.penciler
      }
      // let formData = new FormData()
      // formData.append('_id', this.product._id)
      // formData.append('name', this.name)
      // formData.append('description', this.description)
      // formData.append('price', Number(this.price))
      // formData.append('stock', Number(this.stock))
      // formData.append('published', this.dateFormatted)
      // formData.append('writer', this.writer)
      // formData.append('penciler', this.penciler)
      this.$store.dispatch('updateProduct', payload)
    }
  },
  created () {
    this.initiateValue()
  }
}
</script>

<style>

</style>
