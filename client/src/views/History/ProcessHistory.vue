<template>
<div>
  <div v-if='process.length !== 0'>
    <div v-for='(history) in process' :key='history._id' class='mt-2'>
      <div class='toptrans'>
        <div>
          <h3>Transaction ID : {{ history._id }}</h3>
        </div>
        <div>
          <b-badge pill variant="success" class='badgec3'>Process</b-badge>
          <button class="btn-sm btn-outline-success btn ml-3" @click='checkList(history._id)'>Received</button>
        </div>
        <div>
          <h3>Total : {{ history.payment }}</h3>
        </div>
      </div>
      <div v-for='(product,i) in history.ProductId' :key='i'>
        <HistoryComponent :get-product='product'></HistoryComponent>
      </div>
    </div>
  </div>
  <div v-else >
    <ZonkComponent :action='nameAction'/>
  </div>
</div>
</template>

<script>
import HistoryComponent from '@/components/HistoryComponent/HistoryComponent.vue';
import axios from '@/apis/server.js'
import ZonkComponent from '@/components/HistoryComponent/ZonkComponent.vue'

export default {
  components: {
    HistoryComponent,
    ZonkComponent
  },
  data () {
    return {
      process: []
    }
  },
  methods: {
    fetchProcess () {
      this.history.forEach((el, i) => {
        if(el.confirm && !el.status) {
          this.process.push(el)
        }
      })
    },
    checkList (id) {
      axios({
        method: 'patch',
        url: `/transactions/received/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          return this.$store.dispatch('checkSignIn')
        })
        .then(() => {
          this.$awn.success('Thank you!! give rate to our app :)')
        })
        .catch(err => {
          this.$awn.waning(err.response.data.msg)
        })
    }
  },
  computed: {
    history () {
      return this.$store.state.userSignin.History
    },
    nameAction () {
      return this.$route.name
    }
  },
  created () {
    this.fetchProcess()
  }
}
</script>

<style>
</style>