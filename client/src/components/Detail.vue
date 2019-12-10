<template>
  <div>
    <Navbar></Navbar>
    <div class="box-product">
      <p class="title">Detail Product</p>
      <div class="container box">
        <div class="row">
          <span class="col">
            <img :src="product.imgUrl" alt="img" class="image" />
          </span>
          <span class="detail col">
            <div v-if="!isAdmin">
              <DetailForCustomer :product="product"></DetailForCustomer>
            </div>
            <div v-else>
              <DetailForAdmin :product="product"></DetailForAdmin>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import DetailForCustomer from '../components/DetailCustomer'
import DetailForAdmin from '../components/DetailAdmin'

export default {
  name: 'detail',
  components: {
    Navbar,
    DetailForCustomer,
    DetailForAdmin
  },
  data () {
    return {}
  },
  computed: {
    product: {
      get () {
        return this.$store.state.detailProduct
      }
    },
    isAdmin: {
      get () {
        return this.$store.state.isAdmin
      }
    }
  },
  watch: {
    product () {},
    isAdmin () {}
  },
  created () {
    this.$store.dispatch('findOne', this.$route.params.id)
  }
}
</script>
<style scoped>
.box-product {
  margin-top: 50px;
  margin-left: 10%;
  margin-right: 10%;
}
.row {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}
.image {
  width: 500px;
  border: 1px solid #ccc7c9;
  border-radius: 5px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.detail {
  width: 500px;
}

.title {
  color: #c44173;
  font-size: 22px;
}
</style>
