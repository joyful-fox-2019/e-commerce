<template>
  <div class="about">
    <h1>CART</h1>
    <!-- {{theCart}} -->
    <div class="is-divider" data-content="OR"></div>
    <div class="detil" v-for="(cart, index) in theCart" :key="index" >
      <DetailCart :cart="cart" @remove="getAllCart" />
    </div>
    <div>
      <button>checkout</button>
    </div>
  </div>
</template>

<script>
import DetailCart from '../components/DetailCart'
export default {
  name: 'cart',
  data: function () {
    return {
      theCart: []
    }
  },
  components: {
    DetailCart
  },
  methods: {
    getAllCart () {
      this.axios.get('/carts', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data, 'data cart')
          this.theCart = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    console.log(this.$route)
    this.getAllCart()
  }
}
</script>

<style>
h1 {
  font-size: 50px;
  padding-bottom: 20px;
}

.detil {
  width: 1600px;
  margin: auto;

}

</style>
