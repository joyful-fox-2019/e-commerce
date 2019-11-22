<template>
    <div class="container d-flex justify-content-center flex-wrap">
        <div class="row sm-3 md-2">
            <div v-for="(item, index) in arrProductAll" class="card ml-1 mt-1" v-bind:key="index">
              <h2 class="card-title" v-html="item.product">
              </h2>
              <a @click.prevent="showAddToCart(item._id)" href="#" data-toggle="modal" data-target="#myCart">
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <image xlink:href='https://image.flaticon.com/icons/svg/34/34627.svg' alt="symbol" height="40" width="40"/>
                    </svg>
              </a>
              <img :src="item.picture" alt="image" width="100%">
              <h4 class="card-text" v-html="item.category"></h4>
              <label for="stock">Stock :</label>
              <h3 class="card-text" v-html="item.stock"></h3>
              <label for="price">Price :</label>
              <h4 class="card-text" v-html="item.price"></h4>
            </div>
          </div>
    <div class="modal fade" id="myCart" role="dialog">
      <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addCart()">
            <label for="stock">How many you want to buy ?</label>
            <input type="text" class="form-control" v-model="countProduct">
            <br>
            <input type="submit" value="AddToCart" style="background-color:#aeddb198; color:#f6f6f6; cursor:pointer;" class="btn">
          </form>
        </div>
      </div>
    </div>
  </div>
 </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => {
    return {
      product: '',
      price: 0,
      category: '',
      stock: 0,
      countProduct: 0,
      _id: ''
    }
  },
  created () {
    this.$store.dispatch('showAllProduct')
  },
  computed: {
    ...mapState(['arrProductAll'])
  },
  methods: {
    showAddToCart (id) {
      this._id = id
    },
    addCart () {
      let payload = {
        countProduct: this.countProduct,
        _id: this._id
      }
      this.$store.dispatch('addToCart', payload)
      this.countProduct = 0
      this._id = ''
    }
  }
}
</script>

<style>
.container {
    max-width: 80%;
    max-height: 100%;
}
.card {
    max-width: 400px;
    margin-top: 20px;
    padding: 10px;
    flex-wrap: wrap;
}
img {
  height: 250px;
  width: 100%;
}
</style>
