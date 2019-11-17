<template>
<div class="wrapper">
    <AdminSidebar></AdminSidebar>
    <div id="content">
        <AdminNavbar></AdminNavbar>
    <div class="container pb-4" style="display:flex; justify-content:center; border-bottom:1px solid #dfdfdf;">
        <fulfilling-square-spinner
            :animation-duration="4000"
            :size="60"
            color="#ff1d5e"
            v-if="isLoading"
        />
        <div style="display:flex; width:50%; flex-wrap:wrap;">
            <div style="width:100%">
                <h2>Update Product</h2>
                <p class="mt-2" style="font-size:12px;">update your product data, make sure all is checked</p>
                <hr>
            </div>
            <div style="width:100% font-size:16px; text-align:left;">
                <form @submit.prevent="update()">
                    <label class="mt-2" for="name" style="width:100%; color:black;">Nama</label>
                    <input v-model="name" type="text" style="width:100%;" placeholder="nama product">
                    <label class="mt-2" for="description" style="width:100%; color:black;">Deskripsi</label>
                    <input v-model="desc" type="text" style="width:100%;" placeholder="Deskripsi produk">
                    <label class="mt-2" for="price" style="width:100%; color:black;">Price</label>
                    <input v-model="price" type="number" style="width:100%;" placeholder="Price">
                    <label class="mt-2" for="stock" style="width:100%; color:black;">Stock</label>
                    <input v-model="stock" type="number" style="width:100%;" placeholder="stock">
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
                    <input class="btn submit mt-4" type="submit" value="Update" style="width:100%; background-color:#4daf4e; color:white;">
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
    </div>
</div>
</template>

<script>
import AdminNavbar from '@/components/AdminNavbar.vue'
import AdminSidebar from '@/components/AdminSidebar.vue'
import VueTagsInput from '@johmun/vue-tags-input'
import axios from '../apis/server'
import Swal from 'sweetalert2'
import { mapState, mapActions } from 'vuex'
import { FulfillingSquareSpinner } from 'epic-spinners'

export default {
  name: 'Update',
  components: {
    VueTagsInput, FulfillingSquareSpinner, AdminNavbar, AdminSidebar
  },
  data () {
    return {
      name: 'ssss',
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
      'getDetailProduct'
    ]),
    getdetail () {
      this.getDetailProduct(this.$route.params.id)
    },
    update () {
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
        method: 'put',
        url: `/products/${this.$route.params.id}`,
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
          Swal.fire('success', 'update product success', 'success')
          this.getdetail()
          this.$router.push(`/detail/${this.$route.params.id}`)
        })
        .catch(err => {
          console.log(err, '-----------------')

          Swal.fire('error', 'error', 'error')
        })
    }

  },
  computed: {
    ...mapState([
      'detailProduct'
    ])
  },
  created () {
    console.log(this.detailProduct, 'fsdfasdfsfasdf')
    this.name = this.detailProduct.name
    this.desc = this.detailProduct.desc
    this.stock = this.detailProduct.stock
    this.price = this.detailProduct.price
    this.tags = this.detailProduct.tags
    this.file = this.detailProduct.image
  }
}
</script>

<style>

</style>
