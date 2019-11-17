<template>
    <div class="container pb-4" style="display:flex; justify-content:center; border-bottom:1px solid #dfdfdf;">
        <fulfilling-square-spinner
            :animation-duration="4000"
            :size="60"
            color="#ff1d5e"
            v-if="isLoading"
        />
        <div style="display:flex; width:50%; flex-wrap:wrap;">
            <div style="width:100%">
                <h2>Add New Product</h2>
                <p class="mt-2" style="font-size:12px;">add more product , make your store full of healty fruits, vegetables</p>
                <hr>
            </div>
            <div style="width:100% font-size:16px; text-align:left;">
                <form @submit.prevent="uploadProduct()">
                    <label class="mt-2" for="name" style="width:100%; color:black;">Nama</label>
                    <input v-model="name" type="text" style="width:100%;" placeholder="nama product" required>
                    <label class="mt-2" for="description" style="width:100%; color:black;">Deskripsi</label>
                    <input v-model="desc" type="text" style="width:100%;" placeholder="Deskripsi produk" required>
                    <label class="mt-2" for="price" style="width:100%; color:black;">Price</label>
                    <input v-model="price" type="number" style="width:100%;" placeholder="Price" required>
                    <label class="mt-2" for="stock" style="width:100%; color:black;">Stock</label>
                    <input v-model="stock" type="number" style="width:100%;" placeholder="stock" required>
                    <!-- <label class="mt-2" for="tags" style="width:100%; color:black;">Tags</label>
                    <input v-model="tags" type="text" style="width:100%;"> -->
                    <b-form-file
                    v-model="file"
                    :state="Boolean(file)"
                    placeholder="Choose product image or drop it here..."
                    drop-placeholder="Drop file here..."
                    accept="image/jpeg, image/png"
                    class="mt-2 browse"
                    ></b-form-file>
                    <vue-tags-input
                        class="mt-2 mx-auto"
                        v-model="tag"
                        :tags="tags"
                        @tags-changed="newTags => tags = newTags"
                    />
                    <input class="btn submit mt-4" type="submit" value="Tambahkan" style="width:100%; background-color:#4daf4e; color:white;">
                </form>
            </div>
        </div>
        <fulfilling-square-spinner
            :animation-duration="4000"
            :size="60"
            color="#ff1d5e"
            v-if="isLoading"
        />
    </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input'
import axios from '../apis/server'
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'
import { FulfillingSquareSpinner } from 'epic-spinners'

export default {
  name: 'AddProduct',
  components: {
    VueTagsInput, FulfillingSquareSpinner
  },
  data () {
    return {
      name: '',
      desc: '',
      price: '',
      stock: '',
      file: null,
      tag: '',
      tags: [],
      isLoading: false
    }
  },
  methods: {
    ...mapActions([
      'getFruits', 'getVegetables', 'getProteins', 'getGrains'
    ]),
    uploadProduct () {
      this.isLoading = true
      let tags = []
      this.tags.forEach(element => {
        tags.push(element.text)
      })
      let bodyFormData = new FormData()
      bodyFormData.append('image', this.file)
      bodyFormData.append('name', this.name)
      bodyFormData.append('desc', this.desc)
      bodyFormData.append('price', this.price)
      bodyFormData.append('stock', this.stock)
      bodyFormData.append('tags', tags.join(','))
      axios({
        method: 'post',
        url: '/products',
        headers: {
          token: localStorage.getItem('token')
        },
        data: bodyFormData
      })
        .then(({ data }) => {
          this.name = ''
          this.desc = ''
          this.file = ''
          this.price = ''
          this.stock = ''
          this.tags = []
          this.isLoading = false
          Swal.fire('success', 'new product added', 'success')
          this.getVegetables()
          this.getFruits()
          this.getProteins()
          this.getGrains()
        })
        .catch(err => {
          console.log(err, '-----------------')

          Swal.fire('error', 'error', 'error')
        })
    }
  }
}
</script>

<style>

</style>
