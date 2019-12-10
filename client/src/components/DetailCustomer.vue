<template>
  <div class="card-detail container">
    <h5 class="title is-5">{{product.name}}</h5>
    <hr />
    <h2 class="title is-2 price">Rp.{{product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</h2>
    <p class="subtitle stock" v-if="product.stock <=100">
      <b>Stock terbatas! Tersisa {{product.stock}} lagi!</b>
    </p>
    <p class="subtitle stock" v-else>
      <b>
        Tersedia! Stock
        <span style="color: #5EAB34">> 100</span> barang lagi!
      </b>
    </p>
    <p class="subtitle qty">Masukan jumlah yang di inginkan!</p>
    <div class="number-input">
      <b-field>
        <b-numberinput min="0" :max="product.stock" v-model="qty" type="is-light"></b-numberinput>
      </b-field>
        <p style="font-size: 14px; margin-left: 55px;">Rp.{{totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</p>
    </div>
    <br/>
    <b-button @click="addToCart(product._id)" type="is-success btn">Add to Cart</b-button>
    <div class="guaranted">
      <span>
        <i class="far fa-check-circle fa-3x"></i>
      </span>
      <span>
        <p class="aman">
          <b>Jaminan 100% AMAN</b>
        </p>
        <p class="small">Uang pasti kembali. Sistem pembayaran bebas penipuan.</p>
        <p class="small">Barang tidak sesuai pesanan? Silahkan hubungi customer services kami.</p>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailForCustomer',
  props: ['product'],
  data () {
    return {
      qty: 0,
      isFullPage: true
    }
  },
  methods: {
    addToCart (id) {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      let payload = {}
      payload.id = id
      payload.qty = this.qty
      this.$store.dispatch('addToCart', payload)
        .then(() => {
          setTimeout(() => loadingComponent.close(), 1 * 1000)
          setTimeout(() => {
            this.$buefy.toast.open({
              message: `Add product to cart success...`,
              type: 'is-success'
            })
          }, 1200)
          this.$router.push('/')
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 1000)
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: 'is-danger'
          })
        })
    }
  },
  computed: {
    totalPrice () {
      return this.qty * this.product.price
    }
  }
}
</script>
<style scoped>
.card-detail {
  margin-top: 30px;
}
.stock {
  font-size: 14px;
  padding-top: 40px;
}
.qty {
  font-size: 13px;
  margin-top: -18px;
}
.btn {
  width: 40%;
}
.far {
  color: #c44f70;
  padding-top: 20px;
}
.guaranted {
  display: flex;
  flex-direction: row;
  margin-top: 50px;
}
.aman {
  font-size: 14px;
  padding-left: 10px;
}
.small {
  font-size: 12px;
  color: #8a8586;
  width: 80%;
  padding-left: 10px;
}
.number-input {
  width: 40%;
  margin-top: -18px;
}
.price {
  color: #d71149;
}
</style>
