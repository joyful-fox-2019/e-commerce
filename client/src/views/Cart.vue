<template>
  <div>
      <div v-if="carts" class="cart-container d-flex">

          <div class="cart-card-container m-2">

                  <div  v-for="(item, i) in carts.items" :key="item._id" class="cart-card">
                  <div class="d-flex justify-content-start align-items-center h-75">
                      <img src="https://bit.ly/355433T" alt="">
                        <div>
                            <h3>{{ item.productId.name }}</h3>
                            <p class="price">${{ item.productId.price }}</p>
                        </div>
                  </div>
                  <div class="actions d-flex justify-content-end align-items-center">
                      <div class="delete mr-3">
                          <i @click="removeItem(item._id)" class="fas fa-trash"></i>
                      </div>
                      <div class="plus-minus d-flex mx-2">
                          <i @click="dec(i)" class="fas fa-minus-circle"></i>
                          <span class="mx-3">{{ item.qty }}</span>
                          <i @click="inc(i)" class="fas fa-plus-circle"></i>
                      </div>
                  </div>
              </div>

          </div>

          <div class="ringkasan-belanja m-2">
              <div class="ring-title">
                  <h6>Ringkasan Belanja</h6>
              </div>
              <div class="d-flex justify-content-between m-3">
                  <p>Total Harga</p>
                  <p style="font-weight: 700;">$ {{ totalPrice }}</p>
              </div>
              <button @click="buy" class="buy btn btn-light w-75">Beli</button>
          </div>

      </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'cart-page',
  data () {
    return {
      totalPrice: 0
    }
  },
  methods: {
    inc (i) {
      if (this.carts.items[i].qty + 1 <= this.carts.items[i].productId.stock) {
        this.carts.items[i].qty++
        this.changeQty(i)
      } else {
        alert('max stock')
      }
    },
    dec (i) {
      if (this.carts.items[i].qty - 1 > 0) {
        this.carts.items[i].qty--
        this.changeQty(i)
      }
    },
    countTotalPrice () {
      let result = 0
      this.carts.items.forEach(item => {
        result += item.productId.price * item.qty
      })
      this.totalPrice = result
    },
    changeQty (i) {
      this.countTotalPrice()
      let productId = this.carts.items[i].productId._id
      let qty = this.carts.items[i].qty
      this.$store.dispatch('CHANGE_QTY', { productId, qty })
    },
    removeItem (id) {
      this.$store.dispatch('REMOVE_ITEM', id)
    },
    buy () {
      let totalPrice = this.totalPrice
      this.$store.dispatch('CREATE_TRASACTIONS', totalPrice)
        .then(() => {
          this.$router.push('profile/transactions')
        })
    }
  },
  computed: {
    ...mapState(['carts'])
  },
  created () {
    this.$store.dispatch('GET_CARTS')
      .then(() => {
        this.countTotalPrice()
      })
  }
}
</script>

<style>

.cart-container{
    width: 100%;
    padding: 50px;
}

.cart-card-container{
    width: 80%;
}

.cart-card {
    width: 100%;
    height: 200px;
    border-bottom: 5px solid rgba(128, 128, 128, 0.473);
    text-align: left;
}

.cart-card img {
    width: 100px;
    height: auto;
    border-radius: 10px;
    margin-right: 20px;
}

.price{
  color: #FF6535;
  font-weight: 700;
}

.actions i{
   font-size: 25px;
   color: rgb(199, 199, 199);
}

.actions i:hover{
    color: rgb(63, 173, 63);
    cursor: pointer;
}

.actions span{
    text-align: center;
    width: 50px;
    border-bottom: 1px solid grey;
}

.ringkasan-belanja{
    width: 500px;
    height: 200px;
    border-radius: 10px;
    box-shadow: -1px 1px 5px 1px rgba(0,0,0,0.14);
}

.ring-title{
    text-align: start;
    font-weight: 700;
    border-bottom: 2px solid grey;
    margin: 15px;
}

.buy{
    background-color: #FF6535;
    color: white;
    font-weight: 600;
    outline: none;
}

</style>
