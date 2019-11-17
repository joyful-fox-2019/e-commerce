<template>
  <div>
    <Navbar></Navbar>
    <div class="box-product">
      <p class="title">Product</p>
      <div class="container box">
        <div class="row">
          <span class="col">
            <img :src="product.imgUrl" alt="img" class="image" />
          </span>
          <span class="detail col">
            <b-tabs type="is-boxed">
              <b-tab-item>
                <template slot="header">
                  <a @click="click('detail')">
                    <b-icon icon="information-outline" class="icon is-small"></b-icon>
                    <span>Detail Product</span>
                  </a>
                </template>
              </b-tab-item>
              <b-tab-item>
                <template slot="header">
                  <a @click="click('edit')">
                    <span icon="edit-outline" class="icon is-small">
                      <i class="fas fa-edit" style="margin:5px;"></i>
                    </span>
                    <span>Edit Product</span>
                  </a>
                </template>
              </b-tab-item>
            </b-tabs>
            <router-view :product="product"></router-view>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'detail',
  components: {
    Navbar
  },
  data () {
    return {}
  },
  methods: {
    click (payload) {
      this.$router.push(`/editProduct/${this.$route.params.id}/${payload}`)
    }
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
  min-height: 550px;
}
.image {
  width: 500px;
  border: 1px solid #ccc7c9;
  border-radius: 5px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.detail {
  width: 500px;
  margin-top: 20px;
}
</style>
