<template>
  <div class="d-flex justify-content-center flex-wrap">
    <div class="row sm-3 md-2">
        <div v-for="(item, index) in arrProduct" class="card ml-1 mt-3" v-bind:key="index" id="ListItem">
            <div class="row justify-content-between" id="cardtemplate">
              <div>
              <h2 v-html="item.product" style="margin-left: 20px;"></h2>
              </div>
              <div class="mr-4">
                <a @click.prevent="showUpdate(item._id)" href="#" data-toggle = 'modal' data-target="#myModal" style="margin-left: 40px;">
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <image xlink:href='../assets/edit.svg' alt="symbol" height="40" width="40"/>
                    </svg>
                </a>
                <a @click.prevent="deleteProduct(item._id)" href="#">
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <image xlink:href='https://image.flaticon.com/icons/png/512/61/61848.png' alt="symbol" height="40" width="40"/>
                    </svg>
                </a>
              </div>
            </div>
            <img :src="item.picture" alt="image" width="100%">
            <h4 class="card-text" v-html="item.category"></h4>
            <label for="stock">Stock :</label>
            <h3 class="card-text" v-html="item.stock"></h3>
            <label for="price">Price :</label>
            <h4 class="card-text" v-html="item.price"></h4>
            <label for="price">Sold :</label>
            <h4 class="card-text" v-html="item.sold"></h4>
        </div>
    </div>
  <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="product">Product</label>
              <input type="text" class="form-control" v-model="product.product">
            </div>
            <div class="form-group">
              <label for="stock">Stock</label>
              <input type="text" class="form-control" v-model="product.stock">
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input type="text" class="form-control" v-model="product.price">
            </div>
            <br>
          </form>
          <button @click="updateProduct()" data-dismiss="modal" style="background-color:#aeddb198; color:#f6f6f6; cursor:pointer;" class="btn">Update</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => {
    return {
      // product: '',
      // price: 0,
      category: '',
      // stock: 0,
      _id: '',
      listItem: true,
      updateForm: false
    }
  },
  methods: {
    showUpdate (_id) {
      this.updateForm = true
      this.$store.dispatch('showUpdate', _id)
      this._id = _id
    },
    updateProduct () {
      let payload = {
        product: this.product.product,
        price: this.product.price,
        stock: this.product.stock,
        _id: this._id
      }
      this.$store.dispatch('updateProduct', payload)
      // this.product = ''
      // this.price = 0
      // this.stock = 0
      this._id = ''
      this.updateForm = false
    },
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
    }
  },
  computed: {
    ...mapState(['arrProduct', 'product']),
    ...mapActions(['showProduct'])
  }
}
</script>

<style>
img {
  height: 250px;
  width: 100%;
}

</style>
