<template>
    <div class="col-md-4">
      <div class="card mb-4 box-shadow">
        <img class="card-img-top"
        style="object-fit:contain"
        :src="ownProduct.image"
        alt="Card image cap" width="200" height="200">
        <div class="card-body overflow-auto" style="height:200px">
            <div>
                <h1>{{ownProduct.name}}</h1>
            </div>
            <div>
                <p class="card-text">{{ownProduct.description}}</p>
            </div>
        </div>
        <div class="d-flex justify-content-between px-3">
            <small class="text-muted">Price {{ownProduct.price}}</small>
            <small class="text-muted">Stock {{ownProduct.stock}}</small>
        </div>
        <div class="d-flex justify-content-center p-2">
        </div>
        <button @click="editData(ownProduct._id)" class="btn btn-warning w-75 align-self-center mb-2">Edit Product</button>
        <button @click="deleteProduct(ownProduct._id)" class="btn btn-danger w-75 align-self-center mb-2">Delete Product</button>
      </div>
    </div>
</template>

<script>
import axios from '../../myaxios/axios'
import Swal from 'sweetalert2'
export default {
  props: ['ownProduct'],
  data () {
    return {
      id: this.$route.params.id
    }
  },
  methods: {
    deleteProduct (id) {
      Swal.fire({
        title: 'Are you sure want to Delete this Product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete it'
      })
        .then((result) => {
          if (result.value) {
            axios.delete('/users/' + id, {
              headers: {
                token: localStorage.getItem('token')
              }
            })
              .then(({ data }) => {
                Swal.fire(
                  `Succesfully deleted ${data.data.name}`
                )
                this.$emit('getOwnProducts')
              })
              .catch(err => {
                console.log(err.response.data.message)
              })
          }
        })
    },
    editData (id) {
      // sementara sepertin ini
      this.$router.push('/myProducts')
      axios.get('/products/' + id)
        .then(({ data }) => {
          this.$emit('editPayload', data)
          this.id = id
          console.log(this.id)
          this.$router.push('/myProducts/edit/' + id).catch(err => {})
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    }
  }
  // watch: {
  //   id (to, from) {
  //     this.editData(this.id)
  //   }
  // }
}

</script>

<style>

</style>
