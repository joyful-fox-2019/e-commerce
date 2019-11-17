<template>
  <b-container>
    <h2 class="text-white ml-3 ml-md-0 my-4 text-md-center"> <b>Your Game</b> </h2>
    <b-row class="justify-content-center">
      <b-col v-for="(data,index) in historyData" :key="index" cols="11" md="3">
        <b-card style="border: none" bg-variant="dark" :img-src="data.ProductId.imgUrl" img-alt="Image" img-top>
          <p style="font-size: 25px" class="m-0 text-white"><b>{{ data.ProductName }}</b></p>
          <small class="text-white">Purchased : {{ data.createdAt }}</small>
          <template v-slot:footer>
            <div class="d-flex justify-content-right">
              <b-button v-if="!data.status" @click="confirmStatus(data.TransactionId)" class="btn-sm mr-2"><font-awesome-icon class="mr-2" icon="user-clock"></font-awesome-icon>Confirmation</b-button>
              <b-button v-if="data.status" class="btn-sm mr-2" variant="success"><font-awesome-icon class="mr-2" icon="check"></font-awesome-icon>Delivered</b-button>
            </div>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from '../config/getdata'
import Swal from 'sweetalert2'

export default {
  name: 'Historypage',
  data(){
    return{
      historyData: ''
    }
  },
  methods: {
    fetchData () {
      axios({
        url: '/transactions/mytransaction',
        get: 'get',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          let dataFinal = []
          console.log(data)
          for(let i = 0; i < data.length; i++){
            for(let j = 0; j < data[i].product.length; j++){
              data[i].product[j]['status'] = data[i].status
              data[i].product[j]['TransactionId'] = data[i]._id
              data[i].product[j]['createdAt'] = data[i].createdAt
              dataFinal.push(data[i].product[j])
            }
          }
          this.historyData = dataFinal
          console.log(dataFinal)
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    },
    confirmStatus (id) {
      axios({
        method: 'patch',
        url: `/transactions/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.successToast("Delivery Succesfull!")
          this.fetchData()
          console.log(data)
        })
        .catch(err => {
          console.log(err.response.data)
          this.next(err.response.data)
        })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>

</style>
