<template>
  <div>
    <div class="detail-container d-flex mt-5">
      <div class="product-pic mr-5">
        <img :src="product.image" alt />
      </div>
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <span style="color: #cfcfcf;">10 Ulasan</span>
          <p class="price">$ {{ product.price }}</p>
          <div class="plus-minus d-flex justify-content-between mx-2">
            <div class="d-flex align-items-center">
              <i @click="dec" class="fas fa-minus-circle"></i>
              <span class="mx-3">{{ qty }}</span>
              <i @click="inc" class="fas fa-plus-circle"></i>
            </div>
            <form action class="ml-3 note-for-seller d-flex flex-column">
              <label for>Catatan Untuk Penjual (Opsional)</label>
              <input type="text" />
            </form>
          </div>
          <div>
            <h6 class="text-dark">Stock: {{ product.stock }}</h6>
          </div>
          <div class="mt-5 d-flex align-items-center">
            <i v-if="isWishlist" @click="removeFromWishlist" id="heart" style="color: crimson;" class="fas fa-heart ml-3"></i>
            <i v-else @click="addToWishList" id="heart" class="fas fa-heart ml-3"></i>
            <button @click="addToCart" class="buybtn btn btn-light w-25">Beli</button>
          </div>
        </div>
        <div class="d-flex mt-5">
          <div id="watch" class="d-flex align-items-center">
            <i class="icon far fa-eye"></i>
            <div class="text m-0">
              <p class="m-0">Dilihat</p>
              <p class="m-0" style="font-weight:bold">200</p>
            </div>
          </div>
          <div id="watch" class="d-flex align-items-center">
            <i class="icon fas fa-truck"></i>
            <div class="text m-0">
              <p class="m-0">Terkirim</p>
              <p class="m-0" style="font-weight:bold">10</p>
            </div>
          </div>
          <div id="watch" class="d-flex align-items-center">
            <i class="icon fas fa-box-open"></i>
            <div class="text m-0">
              <p class="m-0">Kondisi</p>
              <p class="m-0" style="font-weight:bold">Baru</p>
            </div>
          </div>
          <div id="watch" class="d-flex align-items-center">
            <i class="icon fas fa-tag"></i>
            <div class="text m-0">
              <p class="m-0">Min. Beli</p>
              <p class="m-0" style="font-weight:bold">1</p>
            </div>
          </div>
          <div id="watch" class="d-flex align-items-center">
            <i class="icon fas fa-shield-alt"></i>
            <div class="text m-0">
              <p class="m-0">Asuransi</p>
              <p class="m-0" style="font-weight:bold">Opsional</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-desc">
      <p>
        <i class="fas fa-clipboard-list"></i> Informasi Produk
      </p>
      <p>
        <i class="icon-tabs-icon-product-review mr-5"></i>
      </p>
      <br />
      <p>{{ product.desc }}</p>
    </div>
    <!-- INI ADALAH LOGIN -->
    <transition appear enter-active-class="animated tada">
      <login v-if="loginFrom" @close="closeLoginFrom" />
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import login from '@/views/Login'
export default {
  components: {
    login
  },
  data () {
    return {
      qty: 1,
      loginFrom: false,
      isWishlist: false
    }
  },
  methods: {
    addToWishList () {
      this.isWishlist = true
      let productId = this.product._id
      this.$store.dispatch('ADD_TO_WISHLIST', productId)
    },
    removeFromWishlist () {
      this.isWishlist = false
      let productId = this.product._id
      this.$store.dispatch('REMOVE_FROM_WISHLIST', productId)
    },
    addToCart () {
      if (this.isLogin) {
        let productId = this.product._id
        let seller = this.product.userId
        let qty = this.qty
        this.$store.dispatch('ADD_TO_CART', { productId, seller, qty })
      } else {
        this.loginFrom = true
      }
    },
    closeLoginFrom () {
      this.loginFrom = false
    },
    inc () {
      if (this.qty + 1 <= this.product.stock) {
        this.qty++
      }
    },
    dec () {
      if (this.qty - 1 > 0) {
        this.qty--
      }
    }
  },
  computed: {
    ...mapState(['product', 'isLogin'])
  },
  created () {
    let id = this.$route.params.id
    this.$store.dispatch('IS_WISHLIST', id)
      .then((data) => {
        if (data) {
          this.isWishlist = true
        }
        this.$store.dispatch('GET_ONE_PRODUCT', id)
      })
  }
}
</script>
<style scoped>
.detail-container {
  width: 80%;
  margin: 0 auto;
}
.product-pic {
  width: 500px;
  border: 0.6px solid rgb(172, 172, 172);
  padding: 10px;
  border-radius: 5px;
}
.product-pic img {
  width: 300px;
  height: auto;
}
.product-info {
  text-align: left;
}
.star {
  color: #fec112;
  font-size: 12px;
}
.price {
  font-size: 30px;
  color: #ff6535;
  font-weight: 600;
}
.plus-minus {
  color: black;
  font-size: 15px;
}
.plus-minus span {
  border-bottom: 0.6px solid grey;
  width: 50px;
  height: 30px;
  text-align: center;
}
.plus-minus i {
  color: rgb(143, 143, 143);
  font-size: 20px;
}
.plus-minus i:hover {
  color: rgb(49, 200, 49);
  cursor: pointer;
}
.note-for-seller {
  width: 300px;
}
.note-for-seller label {
  font-weight: 700;
}
.note-for-seller input {
  padding: 5px;
}
.buybtn {
  background-color: #ff6535;
  color: white;
}
.product-desc {
  width: 80%;
  margin: 0 auto;
  padding: 10px;
  text-align: left;
}
.product-desc p:first-child {
  color: rgb(49, 200, 49);
  cursor: pointer;
}
#heart {
  font-size: 30px;
  margin: 0 10px;
  color: rgb(161, 161, 161);
}
#heart:hover {
  color: crimson;
  cursor: pointer;
}
.text {
  font-size: 10px;
}
.icon {
  font-size: 18px;
  color: grey;
  margin-right: 5px;
}
#watch {
  margin-right: 30px;
}
</style>
