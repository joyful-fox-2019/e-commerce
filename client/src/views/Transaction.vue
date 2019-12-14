<template>
  <div>
    <h1>TRANSACTION</h1>
    <div class="is-divider" data-content="OR"></div>
    <!-- untuk v-for dlm layout -->
    {{transaction}}


    <section>
        <b-table
            :content="content"
            :columns="columns">
        </b-table>
    </section>


    <!-- chart js  -->
    <div class="small">
      <line-chart v-if="isAdmin" :chart-data="datacollection"></line-chart>
    </div>
    <!-- chart js -->
  </div>
</template>

<script>
// import { Bar, Line } from "vue-chartjs"
import LineChart from '../configs/LineChart'

export default {
  name: 'transaction',
  data: function() {
    return {
       content: [
                    { 'id': 1, 'contributor': 'Jesse Simmons', 'posts': 2, 'comments': 5 },
                    { 'id': 2, 'contributor': 'John Jacobs', 'posts': 11, 'comments': 42 },
                    { 'id': 3, 'contributor': 'Tina Gilbert', 'posts': 0, 'comments': 7 },
                    { 'id': 4, 'contributor': 'Clarence Flores', 'posts': 4, 'comments': 4 },
                    { 'id': 5, 'contributor': 'Anne Lee', 'posts': 1, 'comments': 2 }
                ],
                columns: [
                    {
                        field: 'id',
                        label: 'ID',
                        width: '100',
                        numeric: true,
                        subheading: 'Total:'
                    },
                    {
                        field: 'contributor',
                        label: 'Contributor',
                    },
                    {
                        field: 'posts',
                        label: 'Posts',
                        subheading: 18
                    },
                    {
                        field: 'comments',
                        label: 'Comments',
                        subheading: 60
                    }
                ]
    }
  },
  components: {
    LineChart
  },
  data: function () {
    return {
      transaction: {},
      datacollection: null
    }
  },
  methods: {
    fetchTransaction () {
      // console.log('ke fetch transaction')

      this.axios
        .get('/transactions', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          // console.log(data, 'dari transaction ada data apa yg mau ditampilin')

          this.transaction = data
        })
        .catch(console.log)
    },
    fillData () {
      this.datacollection = {
        // labels: [this.getRandomInt(), this.getRandomInt()],
        labels: ['January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'],
        datasets: [
          {
            label: 'Profit',
            backgroundColor: '#f87979',
            // data: [this.getRandomInt(), this.getRandomInt()]
            data: [8, 79, 7, 60, 95, 89, 0, 4, 8, 15, 69, 8]
          },
          {
            label: 'Loss',
            backgroundColor: '#f81267',
            // data: [this.getRandomInt(), this.getRandomInt()]
            data: [22, 11, 37, 7, 8, 67, 90, 0, 0, 0, 0, 8]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  },
  created () {
    this.fetchTransaction()
  },
  mounted () {
    this.fillData()
  },
  computed: {
    isAdmin () {
      return localStorage.getItem('isAdmin')
    }
    // bikin looping bulanan,
    // [0,1,2,..11] index
    // kalau bulan nya 02, arr[1] += totalbill
    // result [700.000, 390.000, 900.000, ... 299.000] ini yg ditampilin di chart
    // dan jumlah yg terjual, itung amount di transaction
  }

}
</script>

<style scoped>
.small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
