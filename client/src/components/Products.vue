<template>
    <div v-if="productData.stock>0" @click="getDetail(productData._id)" class="col-md-4">
      <div class="card mb-4 box-shadow">
        <img class="card-img-top"
        style="object-fit:contain"
        :src="productData.image"
        alt="Card image cap" width="200" height="200">
        <div class="card-body overflow-auto" style="height:200px">
            <div>
                <h1>{{productData.name}}</h1>
            </div>
            <div>
                <p class="card-text">{{productData.description}}</p>
            </div>
        </div>
        <div class="d-flex justify-content-between px-3">
            <small class="text-muted font-weight-bold">Price {{productData.price}}</small>
            <small class="text-muted font-weight-bold">Stock {{productData.stock}}</small>
        </div>
        <div class="d-flex justify-content-center p-2">
          <p class="m-0">Sold By <span class="font-weight-bold">{{productData.seller}}</span></p>
        </div>
      </div>
    </div>
</template>

<script>
import axios from '../../myaxios/axios'
export default {
  props: ['productData', 'role', 'user'],
  methods: {
    getDetail (id) {
      axios.get('/products/' + id)
        .then(({ data }) => {
          this.$emit('detailPayload', data)
          this.$router.push('/products/' + id).catch(err => {})
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    }
  },
  watch: {
    $route (to, from) {
      // console.log('WATCHER')
      const id = this.$route.params.id
      this.getDetail(id)
    }
  }
}
</script>

<style>

</style>
