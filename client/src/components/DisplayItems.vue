<template>
  <div>
                <div class="container" style="display: flex; flex-wrap: wrap;">
                <div style="width: 23%" class="mx-2" v-for="item in items" :key="item.id">
                <div class="" style="" >
                    <div class="">
                        <div>
                            <b-card
                                :title="item.name"
                                :img-src="item.image"
                                img-alt="Image"
                                img-top
                                tag="article"
                                class="mb-2"
                            >
                                <b-card-text>
                                <b>Rp.{{ item.price }}</b>
                                <br>
                                <b>Stock: {{ item.stock }}</b>
                                <br>
                                {{ item.description }}
                                </b-card-text>
                                <b-button @click="addToCart(item._id)" variant="dark" class="mr-1"><i class="fas fa-cart-plus"></i></b-button>
                                <b-button v-if="isAdmin" @click="deleteItem(item._id)" variant="dark" class="mr-1"><i class="far fa-trash-alt"></i></b-button>
                                <b-button v-if="isAdmin" data-toggle="modal" data-target="#editForm" @click="saveId(item._id)" variant="dark" class="mr-1"><i class="fas fa-pencil-alt"></i></b-button>
                            </b-card>
                        </div>
                    </div>
                </div>
                </div>
            </div>
      <!-- Modal -->
      <div class="modal fade" id="editForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Item</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <form>
            <div class="form-group">
              <label>Price</label>
              <input type="text" class="form-control" v-model="price">
              <label>Stock</label>
              <input type="number" class="form-control" v-model="stock">
              <label>Description</label>
              <input type="text" class="form-control" v-model="description">
            </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" @click="editItem" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import myAxios from '../configs/myAxios.js'

export default {
  name: 'DisplayItem',
  data () {
    return {
      id: '',
      price: '',
      stock: '',
      description: '',
      isAdmin: false
    }
  },
  created () {
    this.$store.dispatch('fetchItems')
    if (localStorage.getItem('user') === 'admin') this.isAdmin = true
  },
  computed: {
    ...mapState(['items'])
  },
  methods: {
    addToCart (id) {
      myAxios({
        method: 'post',
        url: `/click/carts/${id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          qty: 1
        }
      })
        .then(data => {
          this.$router.push('cart')
        })
        .catch(console.log)
    },
    deleteItem (id) {
      console.log(id, 'ini id')
      myAxios({
        method: 'delete',
        url: `/click/items/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(data => {
          this.$store.dispatch('fetchItems')
        })
        .catch(console.log)
    },
    saveId (id) {
      this.id = id
      console.log(this.id, 'ini id')
    },
    editItem () {
      myAxios({
        method: 'put',
        url: `/click/items/${this.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          price: this.price,
          stock: this.stock,
          description: this.description
        }
      })
        .then(data => {
          this.id = ''
          this.$store.dispatch('fetchItems')
        })
        .catch(console.log)
        .always($('#editForm').modal('hide'))
    }
  }
}
</script>

<style scoped>
.modal-content {
  top: 30vh !important;
}
</style>
