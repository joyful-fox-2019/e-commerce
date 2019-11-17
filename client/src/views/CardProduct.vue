<template>
  <div class="card">
    <div class="card-image" style="border-bottom: 1px solid #ccc7c9">
      <figure class="image is-4by3">
        <img :src="product.imgUrl" alt="Placeholder image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <a @click="detail(product._id)">
          <b>{{product.name.slice(0, 25) + '...' }}</b>
        </a>
        <p style="is-small">{{ product.description.slice(0, 25) + '...' }}</p>
        <p
          style="font-size: 13px;color:#d71149"
        >Rp.{{ product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</p>
        <div
          style="display: inline;margin: 5px;"
          v-for="(tag, index) in product.category"
          :key="index"
        >
          <b-tag style="background-color: #f085a3; height:18px;">{{ tag }}</b-tag>
        </div>
      </div>
      <footer v-if="!isAdmin" class="card-footer">
        <a @click="detail(product._id)" class="card-footer-item">Detail</a>
      </footer>
      <footer v-else class="card-footer">
        <a @click="editProduct(product._id)" class="card-footer-item">
          <i class="fas fa-edit" style="margin:5px;"></i>Edit
        </a>
        <a @click="deleteProduct(product._id)" href="#" class="card-footer-item">
          <i class="fas fa-trash" style="margin:5px;"></i>Delete
        </a>
      </footer>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'CardProduct',
  props: ['product'],
  data () {
    return {}
  },
  methods: {
    detail (id) {
      this.$router.push(`/detail/${id}`)
    },
    editProduct (id) {
      this.$router.push(`/editProduct/${id}/detail`)
    },
    deleteProduct (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then(result => {
          if (result.value) {
            return this.$store.dispatch('deleteProduct', id)
          }
        })
        .then(() => {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
          this.$store.dispatch('getProduct')
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: `${err.message}`,
            type: 'is-danger'
          })
        })
    }
  },
  computed: {
    isAdmin: {
      get () {
        return this.$store.state.isAdmin
      },
      set (value) {
        this.isAdmin = value
      }
    }
  },
  watch: {
    isAdmin () {}
  },
  created () {
    this.$store.dispatch('auth')
  }
}
</script>
<style scoped>
.card-footer {
  margin-top: -10px;
}
.card-footer-item,
a {
  color: black;
}
.card-footer-item:hover,
a:hover {
  color: rgb(61, 61, 230);
}
</style>
