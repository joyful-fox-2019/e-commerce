<template>
  <div>
    <h2 class="mt-5 mt-md-2 mb-4 text-white">
      Purchased History
    </h2>
    <div>
      
      <!-- Data Header -->
      <b-row no-gutters>
        <b-col>
          <b-card class="mb-2 border-dark bg-dark" style="font-size:17px;">
            <b-row class="text-dark align-items-center">
              <b-col class="border-right text-center" cols="2">
                <b class="text-light">No.</b>
              </b-col>
              <b-col class="border-right" cols="6">
                <b class="text-light">Transaction Id</b>
              </b-col>
              <b-col class="text-center border-right" cols="2">
                <b class="text-light">Total</b>
              </b-col>
              <b-col class=" text-center" cols="2">
                <b class="text-light" style="font-size:13px;">Status</b>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <!-- Article List -->
      <Purchasedbar
        style="cursor:pointer;"
        :title="'Death Stranding'"
        :price="20"
        :status="true"
        :no="0+1"
      ></Purchasedbar>

      <Purchasedbar
        style="cursor:pointer;"
        :title="'Death Stranding'"
        :price="20"
        :stock="20"
        :no="0+1"
      ></Purchasedbar>

      <Purchasedbar
        style="cursor:pointer;"
        :title="'Death Stranding'"
        :price="20"
        :stock="20"
        :no="0+1"
      ></Purchasedbar>

      <Purchasedbar
        style="cursor:pointer;"
        v-for="(data,index) in articleData"
        :key='index'
        :title="data.title"
        :date="moment(data.createdAt).format('dddd, MMMM Do YYYY')"
        :stock="data.tags"
        :articleId="data._id"
        :no="index+1"
      ></Purchasedbar>

    </div>
  </div>
</template>

<script>
import Purchasedbar from '../components/Purchasedbar'
import axios from '../config/getdata'

export default {
  name: 'Articlelist',
  data() {
    return {
      articleData: []
    };
  },
  components:{
    Purchasedbar
  },
  methods: {
    gotoDetail(_id) {
      this.$router.push({ path: `/admin/edit-article/${_id}`});
    },
    fetchData(){
      axios({
        method: 'get',
        url: '/articles/userArticle',
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.articleData = data
      })
      .catch(err => {
        console.log(err)
        console.log(err.response)
        this.next(err.response.data)
      })
    }
  },
  created(){
    // this.fetchData()
  }
}
</script>

<style>
</style>