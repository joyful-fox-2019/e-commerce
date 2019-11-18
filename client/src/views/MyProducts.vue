<template>
    <div>
      <div v-if="$route.name === 'MyProducts'" id="bannerOwned" style="height:50vh" class="jumbotron rounded-0 m-0 text-center">
        <div class="container text-white">
          <h1 class="jumbotron-heading">MY PRODUCTS</h1>
          <p class="lead">WHAT I SELL~ </p>
          <div class="d-flex justify-content-center">
            <button @click="toAddProduct" class="btn btn-primary">Add New Product</button>
          </div>
        </div>
      </div>

      <router-view
      :user="user"
      v-else
      @statusAdd="statusAdd"
      @getOwnProducts="getOwnProducts"
      :editData="editData"
      />

      <div class="album py-5 bg-light">

        <!--List Owned Product -->
        <div class="container">
          <div class="row">
            <OwnedProducts
            v-for="ownProduct in ownProducts" :key="ownProduct._id"
            :ownProduct="ownProduct"
            style="cursor:pointer"
            @getOwnProducts="getOwnProducts"
            @editPayload="editPayload"
            />
          </div>
        </div>

      </div>

    </div>
</template>

<script>
import OwnedProducts from '@/components/OwnedProducts'
export default {
  props: ['ownProducts', 'user'],
  data () {
    return {
      onAdd: false,
      editData: ''
    }
  },
  components: {
    OwnedProducts
  },
  methods: {
    toAddProduct () {
      this.onAdd = true
      this.$router.push('/myProducts/add')
    },
    statusAdd (status) {
      this.onAdd = status
    },
    getOwnProducts () {
      this.$emit('getOwnProducts')
    },
    editPayload (payload) {
      this.editData = payload
      console.log(this.editData, '<<ini di myProd view')
    }
  },
  created () {
    this.$router.push('/myProducts')
  }
}
</script>

<style>
  #bannerOwned{
      background:linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(http://www.tomwahlin.com/images/projects/wallpaper-disco/detail/01-wallpaper_disco-home-lg.png);
      background-size:cover;
      background-position: center;
  }
</style>
