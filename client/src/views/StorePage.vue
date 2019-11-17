<template>
<div>
    <img :src="storeP.background_image" alt="" class='imageA'>
  <div class='container contentContainer'>
    <div class='mt-3' v-if='status'>
      <b-alert show variant="success">
        <h4 class="alert-heading">Your account has been verified</h4>
        <p>
          let's share products and get more benefits with DC Emporium
        </p>
      </b-alert>
    </div>

    <div class="card cardStore mt-5">
      <div class='col-2'>
        <img :src="storeP.store_image" alt="">
      </div>
      <div class='justyStore col-5'>
        <div class='mt-3'>
          <h2>{{ storeP.name }}</h2>
          <span>{{ storeP.ProductId.length }} Product | <v-icon name='map-pin' class='vicon'></v-icon>&nbsp; {{ storeP.location }}</span>
        </div>
        <div>
          <button class="btn btn-md btn-outline-success">Change Image</button>
        </div>
      </div>
      <div class="col-5">
        <div>
        </div>
        <div style='display: flex; justify-content: center; align-items: center; height: 5vw; width: 100%; font-size: 30px'>
          Welcome {{ userO.username }}
        </div>
      </div>
    </div>
    <div class="card cardStore2 mt-5">
      <div v-for='(product, i) in storeP.ProductId' :key='i'>
        <ProductComponentStore :get-product='product'></ProductComponentStore>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ProductComponentStore from '@/components/ProductComponent/ProductComponentStore.vue'

export default {
  components: {
    ProductComponentStore
  },
  computed: {
    storeP () {
      return this.$store.state.userStore
    },
    userO () {
      return this.$store.state.userSignin
    }
  },
  watch: {
    storeP: {
      handler (val){
        if(val) {
          this.storeP = val
        }
      }
    }
  }
}
</script>

<style>
.justyStore {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.contentContainer {
  min-width: 1520px !important;
}
.cardStore {
  border-radius: 20px;
  height: 8vw;
  display: flex;
  flex-direction: row;
}
.cardStore2 {
  border-radius: 20px;
  height: 39vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto
}
.cardStore img {
  width: 6vw;
  background-color: white;
  border-radius: 100px;
  position: absolute;
  margin: -30px 24px
}
.imageA {
  position: fixed;
  background-position: left;
  width: 100%
}
</style>